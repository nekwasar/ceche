package config

import (
	"fmt"
	"time"

	"github.com/caarlos0/env/v11"
)

type Config struct {
	// Server
	Port string `env:"PORT" envDefault:"8080"`
	Env  string `env:"ENV" envDefault:"development"`

	// Database
	DatabaseURL string `env:"DATABASE_URL" envDefault:"postgres://ceche:secret@localhost:5432/ceche?sslmode=disable"`

	// Auth — NO defaults in production; must be set explicitly
	JWTSecret     string        `env:"JWT_SECRET"`
	JWTExpiry     time.Duration `env:"JWT_EXPIRY" envDefault:"15m"`
	RefreshExpiry time.Duration `env:"REFRESH_EXPIRY" envDefault:"168h"`

	// Payments
	PaystackSecretKey string `env:"PAYSTACK_SECRET_KEY"`
	PaystackPublicKey string `env:"PAYSTACK_PUBLIC_KEY"`

	// Email
	BrevoAPIKey      string `env:"BREVO_API_KEY"`
	BrevoSenderEmail string `env:"BREVO_SENDER_EMAIL" envDefault:"noreply@ceche.net"`
	BrevoSenderName  string `env:"BREVO_SENDER_NAME" envDefault:"Ceche"`

	// CORS
	CORSOrigins string `env:"CORS_ORIGINS" envDefault:"http://localhost:3000"`

	// Encryption — NO default; must be set explicitly
	DomainEncryptionKey string `env:"DOMAIN_ENCRYPTION_KEY"`

	// Scanner
	ScannerConcurrency int `env:"SCANNER_CONCURRENCY" envDefault:"50"`

	// Rate Limiting
	RateLimitUser  int `env:"RATE_LIMIT_USER" envDefault:"100"`
	RateLimitAPIKey int `env:"RATE_LIMIT_API_KEY" envDefault:"1000"`
}

func Load() (*Config, error) {
	cfg := &Config{}
	if err := env.Parse(cfg); err != nil {
		return nil, err
	}

	// Fail fast if required secrets are not set
	if cfg.JWTSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET environment variable is required")
	}
	if cfg.DomainEncryptionKey == "" {
		return nil, fmt.Errorf("DOMAIN_ENCRYPTION_KEY environment variable is required")
	}

	return cfg, nil
}
