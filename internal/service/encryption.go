package service

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"io"
	"os"
)

type DomainEncryptor struct {
	key []byte
}

func NewDomainEncryptor() (*DomainEncryptor, error) {
	keyB64 := os.Getenv("DOMAIN_ENCRYPTION_KEY")
	if keyB64 == "" {
		return nil, fmt.Errorf("DOMAIN_ENCRYPTION_KEY environment variable is required")
	}
	key, err := base64.StdEncoding.DecodeString(keyB64)
	if err != nil {
		return nil, fmt.Errorf("invalid DOMAIN_ENCRYPTION_KEY: must be base64 encoded")
	}
	if len(key) != 32 {
		return nil, fmt.Errorf("invalid DOMAIN_ENCRYPTION_KEY: must be 32 bytes (256 bits)")
	}
	return &DomainEncryptor{key: key}, nil
}

func (e *DomainEncryptor) Hash(domain string) string {
	h := sha256.Sum256([]byte(domain))
	return hex.EncodeToString(h[:])
}

func (e *DomainEncryptor) Encrypt(domain string) (string, error) {
	block, err := aes.NewCipher(e.key)
	if err != nil {
		return "", fmt.Errorf("failed to create cipher: %w", err)
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("failed to create GCM: %w", err)
	}

	nonce := make([]byte, aesGCM.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", fmt.Errorf("failed to generate nonce: %w", err)
	}

	ciphertext := aesGCM.Seal(nonce, nonce, []byte(domain), nil)
	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

func (e *DomainEncryptor) Decrypt(encrypted string) (string, error) {
	ciphertext, err := base64.StdEncoding.DecodeString(encrypted)
	if err != nil {
		return "", fmt.Errorf("failed to decode base64: %w", err)
	}

	block, err := aes.NewCipher(e.key)
	if err != nil {
		return "", fmt.Errorf("failed to create cipher: %w", err)
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("failed to create GCM: %w", err)
	}

	nonceSize := aesGCM.NonceSize()
	if len(ciphertext) < nonceSize {
		return "", fmt.Errorf("ciphertext too short")
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
	plaintext, err := aesGCM.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", fmt.Errorf("failed to decrypt: %w", err)
	}

	return string(plaintext), nil
}

var globalEncryptor *DomainEncryptor

func InitDomainEncryption() error {
	var err error
	globalEncryptor, err = NewDomainEncryptor()
	return err
}

func GetDomainEncryptor() *DomainEncryptor {
	return globalEncryptor
}

func EncryptDomain(domain string) (encrypted string, hash string, err error) {
	if globalEncryptor == nil {
		return "", "", fmt.Errorf("domain encryptor not initialized")
	}
	encrypted, err = globalEncryptor.Encrypt(domain)
	if err != nil {
		return "", "", err
	}
	hash = globalEncryptor.Hash(domain)
	return encrypted, hash, nil
}

func DecryptDomain(encrypted string) (string, error) {
	if globalEncryptor == nil {
		return "", fmt.Errorf("domain encryptor not initialized")
	}
	return globalEncryptor.Decrypt(encrypted)
}
