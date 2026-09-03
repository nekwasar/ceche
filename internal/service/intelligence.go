package service

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
)

type IntelligenceProfile struct {
	Domain          string            `json:"domain"`
	DNS             *DNSInfo          `json:"dns,omitempty"`
	WHOIS           *WHOISInfo        `json:"whois,omitempty"`
	SSL             *SSLInfo          `json:"ssl,omitempty"`
	Age             *AgeInfo          `json:"age,omitempty"`
	RDAP            *RDAPResult       `json:"rdap,omitempty"`
	Freshness       time.Time         `json:"freshness"`
}

type DNSInfo struct {
	A       []string `json:"a"`
	AAAA    []string `json:"aaaa"`
	MX      []MXRecord `json:"mx"`
	NS      []string `json:"ns"`
	TXT     []string `json:"txt"`
	CNAME   []string `json:"cname"`
}

type MXRecord struct {
	Host     string `json:"host"`
	Priority uint16 `json:"priority"`
}

type WHOISInfo struct {
	Registrar      string `json:"registrar"`
	RegistrantOrg  string `json:"registrant_org"`
	RegistrationDate string `json:"registration_date"`
	ExpiryDate     string `json:"expiry_date"`
	Nameservers    []string `json:"nameservers"`
	Status         []string `json:"status"`
	PrivacyGuard   bool   `json:"privacy_guard"`
}

type SSLInfo struct {
	Issuer      string    `json:"issuer"`
	Subject     string    `json:"subject"`
	NotBefore   time.Time `json:"not_before"`
	NotAfter    time.Time `json:"not_after"`
	DaysLeft    int       `json:"days_left"`
	Valid       bool      `json:"valid"`
	SelfSigned  bool      `json:"self_signed"`
}

type AgeInfo struct {
	RegistrationDate *time.Time `json:"registration_date,omitempty"`
	ExpiryDate       *time.Time `json:"expiry_date,omitempty"`
	DaysRegistered   int        `json:"days_registered"`
	DaysUntilExpiry  int        `json:"days_until_expiry"`
	IsExpired        bool       `json:"is_expired"`
}

type IntelligenceService struct {
	db     *pgxpool.Pool
	rdap   *RDAPClient
	client *http.Client
	cache  map[string]*cachedProfile
	cacheTTL time.Duration
}

type cachedProfile struct {
	profile   *IntelligenceProfile
	fetchedAt time.Time
}

func NewIntelligenceService(db *pgxpool.Pool) *IntelligenceService {
	return &IntelligenceService{
		db:       db,
		rdap:     NewRDAPClient(),
		client:   &http.Client{Timeout: 10 * time.Second},
		cache:    make(map[string]*cachedProfile),
		cacheTTL: 24 * time.Hour,
	}
}

func (s *IntelligenceService) GetProfile(ctx context.Context, domain string) (*IntelligenceProfile, error) {
	if cached, ok := s.cache[domain]; ok {
		if time.Since(cached.fetchedAt) < s.cacheTTL {
			return cached.profile, nil
		}
		delete(s.cache, domain)
	}

	profile := &IntelligenceProfile{
		Domain:    domain,
		Freshness: time.Now(),
	}

	var wg sync.WaitGroup

	wg.Add(1)
	go func() {
		defer wg.Done()
		dns, err := s.lookupDNS(ctx, domain)
		if err != nil {
			log.Warn().Err(err).Str("domain", domain).Msg("DNS lookup failed")
		} else {
			profile.DNS = dns
		}
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		ssl, err := s.checkSSL(domain)
		if err != nil {
			log.Warn().Err(err).Str("domain", domain).Msg("SSL check failed")
		} else {
			profile.SSL = ssl
		}
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		rdap, err := s.rdap.Check(ctx, domain)
		if err != nil {
			log.Warn().Err(err).Str("domain", domain).Msg("RDAP check failed")
		} else {
			profile.RDAP = rdap
			profile.WHOIS = s.buildWHOISFromRDAP(rdap)
			profile.Age = s.buildAgeFromRDAP(rdap)
		}
	}()

	wg.Wait()

	s.cache[domain] = &cachedProfile{profile: profile, fetchedAt: time.Now()}
	s.storeProfile(ctx, domain, profile)

	return profile, nil
}

func (s *IntelligenceService) GetSummary(ctx context.Context, domain string) (*IntelligenceProfile, error) {
	profile, err := s.GetProfile(ctx, domain)
	if err != nil {
		return nil, err
	}

	summary := &IntelligenceProfile{
		Domain:    profile.Domain,
		Freshness: profile.Freshness,
	}

	if profile.DNS != nil {
		summary.DNS = &DNSInfo{
			A:    profile.DNS.A,
			AAAA: profile.DNS.AAAA,
			NS:   profile.DNS.NS,
			MX:   profile.DNS.MX,
		}
	}

	if profile.Age != nil {
		summary.Age = profile.Age
	}

	if profile.SSL != nil {
		summary.SSL = &SSLInfo{
			Valid:     profile.SSL.Valid,
			DaysLeft:  profile.SSL.DaysLeft,
			Issuer:    profile.SSL.Issuer,
			NotAfter:  profile.SSL.NotAfter,
		}
	}

	return summary, nil
}

func (s *IntelligenceService) lookupDNS(ctx context.Context, domain string) (*DNSInfo, error) {
	info := &DNSInfo{
		A:    []string{},
		AAAA: []string{},
		NS:   []string{},
		TXT:  []string{},
		CNAME: []string{},
		MX:   []MXRecord{},
	}

	resolver := net.DefaultResolver
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	addrs, err := resolver.LookupHost(ctx, domain)
	if err != nil {
		log.Warn().Err(err).Str("domain", domain).Msg("DNS LookupHost failed")
	} else {
		for _, addr := range addrs {
			if strings.Contains(addr, ":") {
				info.AAAA = append(info.AAAA, addr)
			} else {
				info.A = append(info.A, addr)
			}
		}
	}

	nsRecords, err := resolver.LookupNS(ctx, domain)
	if err != nil {
		log.Warn().Err(err).Str("domain", domain).Msg("DNS LookupNS failed")
	} else {
		for _, ns := range nsRecords {
			info.NS = append(info.NS, ns.Host)
		}
	}

	mxRecords, err := resolver.LookupMX(ctx, domain)
	if err != nil {
		log.Warn().Err(err).Str("domain", domain).Msg("DNS LookupMX failed")
	} else {
		for _, mx := range mxRecords {
			info.MX = append(info.MX, MXRecord{
				Host:     mx.Host,
				Priority: mx.Pref,
			})
		}
	}

	txtRecords, err := resolver.LookupTXT(ctx, domain)
	if err == nil {
		info.TXT = txtRecords
	}

	cnameRecords, err := resolver.LookupCNAME(ctx, domain)
	if err == nil {
		info.CNAME = append(info.CNAME, cnameRecords)
	}

	return info, nil
}

func (s *IntelligenceService) checkSSL(domain string) (*SSLInfo, error) {
	conn, err := tls.DialWithDialer(
		&net.Dialer{Timeout: 5*time.Second},
		"tcp",
		domain+":443",
		&tls.Config{InsecureSkipVerify: true},
	)
	if err != nil {
		return nil, fmt.Errorf("SSL connection failed: %w", err)
	}
	defer conn.Close()

	certs := conn.ConnectionState().PeerCertificates
	if len(certs) == 0 {
		return nil, fmt.Errorf("no SSL certificates found")
	}

	cert := certs[0]
	now := time.Now()
	daysLeft := int(time.Until(cert.NotAfter).Hours() / 24)

	issuer := ""
	if len(cert.Issuer.Organization) > 0 {
		issuer = cert.Issuer.Organization[0]
	} else if cert.Issuer.CommonName != "" {
		issuer = cert.Issuer.CommonName
	}

	subject := ""
	if len(cert.Subject.Organization) > 0 {
		subject = cert.Subject.Organization[0]
	} else if cert.Subject.CommonName != "" {
		subject = cert.Subject.CommonName
	}

	return &SSLInfo{
		Issuer:     issuer,
		Subject:    subject,
		NotBefore:  cert.NotBefore,
		NotAfter:   cert.NotAfter,
		DaysLeft:   max(0, daysLeft),
		Valid:      now.After(cert.NotBefore) && now.Before(cert.NotAfter),
		SelfSigned: cert.Issuer.CommonName == cert.Subject.CommonName,
	}, nil
}

func (s *IntelligenceService) buildWHOISFromRDAP(rdap *RDAPResult) *WHOISInfo {
	whois := &WHOISInfo{
		Registrar:     rdap.Registrar,
		ExpiryDate:    rdap.Expiry,
		Nameservers:   rdap.Nameservers,
		Status:        rdap.Status,
		PrivacyGuard:  false,
	}

	for _, status := range rdap.Status {
		if strings.Contains(status, "redacted") || strings.Contains(status, "privacy") {
			whois.PrivacyGuard = true
			break
		}
	}

	return whois
}

func (s *IntelligenceService) buildAgeFromRDAP(rdap *RDAPResult) *AgeInfo {
	age := &AgeInfo{
		IsExpired:       false,
		DaysRegistered:  0,
		DaysUntilExpiry: 0,
	}

	now := time.Now()

	if rdap.Expiry != "" {
		expiry, err := time.Parse("2006-01-02T15:04:05Z", rdap.Expiry)
		if err == nil {
			age.ExpiryDate = &expiry
			age.DaysUntilExpiry = int(time.Until(expiry).Hours() / 24)
			age.IsExpired = now.After(expiry)
		}
	}

	return age
}

func (s *IntelligenceService) storeProfile(ctx context.Context, domain string, profile *IntelligenceProfile) {
	encrypted, hash, err := EncryptDomain(domain)
	if err != nil {
		log.Warn().Err(err).Msg("failed to encrypt domain for storage")
		return
	}

	data, err := json.Marshal(profile)
	if err != nil {
		log.Warn().Err(err).Msg("failed to marshal intelligence profile")
		return
	}

	_, err = s.db.Exec(ctx,
		`INSERT INTO intelligence_profiles (domain_hash, domain_encrypted, data_json, updated_at)
		 VALUES ($1, $2, $3, NOW())
		 ON CONFLICT (domain_hash) DO UPDATE SET data_json = $3, updated_at = NOW()`,
		hash, encrypted, data,
	)
	if err != nil {
		log.Warn().Err(err).Msg("failed to store intelligence profile")
	}
}
