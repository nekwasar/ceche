package v1

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"

	"github.com/nekwasar/ceche/internal/config"
)

type Claims struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

func generateToken(cfg *config.Config, userID, email, role string) (string, error) {
	claims := Claims{
		UserID: userID,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(cfg.JWTExpiry)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(cfg.JWTSecret))
}

func generateRefreshToken(cfg *config.Config, userID, email, role string) (string, error) {
	claims := Claims{
		UserID: userID,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(cfg.RefreshExpiry)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(cfg.JWTSecret))
}

func AuthMiddleware(db *pgxpool.Pool, cfg *config.Config) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, `{"error":{"code":"UNAUTHORIZED","message":"Missing authorization header"}}`, http.StatusUnauthorized)
				return
			}

			tokenString := authHeader
			if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
				tokenString = authHeader[7:]
			}

			claims := &Claims{}
			token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
				return []byte(cfg.JWTSecret), nil
			})

			if err != nil || !token.Valid {
				http.Error(w, `{"error":{"code":"UNAUTHORIZED","message":"Invalid token"}}`, http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), "user_id", claims.UserID)
			ctx = context.WithValue(ctx, "email", claims.Email)
			ctx = context.WithValue(ctx, "role", claims.Role)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func handleRegister(db *pgxpool.Pool, cfg *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Email    string `json:"email"`
			Password string `json:"password"`
			Name     string `json:"name"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		if req.Email == "" || req.Password == "" {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Email and password required"}}`, http.StatusBadRequest)
			return
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 12)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to hash password"}}`, http.StatusInternalServerError)
			return
		}

		var userID string
		err = db.QueryRow(r.Context(),
			`INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id`,
			req.Email, string(hash), req.Name,
		).Scan(&userID)
		if err != nil {
			http.Error(w, `{"error":{"code":"CONFLICT","message":"Email already exists"}}`, http.StatusConflict)
			return
		}

		token, err := generateToken(cfg, userID, req.Email, "user")
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to generate token"}}`, http.StatusInternalServerError)
			return
		}

		refreshToken, err := generateRefreshToken(cfg, userID, req.Email, "user")
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to generate refresh token"}}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"user_id":       userID,
			"token":         token,
			"refresh_token": refreshToken,
		})
	}
}

func handleLogin(db *pgxpool.Pool, cfg *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		var userID, passwordHash, role string
		err := db.QueryRow(r.Context(),
			`SELECT id, password_hash, role FROM users WHERE email = $1`,
			req.Email,
		).Scan(&userID, &passwordHash, &role)
		if err != nil {
			http.Error(w, `{"error":{"code":"UNAUTHORIZED","message":"Invalid credentials"}}`, http.StatusUnauthorized)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password)); err != nil {
			http.Error(w, `{"error":{"code":"UNAUTHORIZED","message":"Invalid credentials"}}`, http.StatusUnauthorized)
			return
		}

		token, err := generateToken(cfg, userID, req.Email, role)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to generate token"}}`, http.StatusInternalServerError)
			return
		}

		refreshToken, err := generateRefreshToken(cfg, userID, req.Email, role)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to generate refresh token"}}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"user_id":       userID,
			"token":         token,
			"refresh_token": refreshToken,
		})
	}
}

func handleRefresh(db *pgxpool.Pool, cfg *config.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			RefreshToken string `json:"refresh_token"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		claims := &Claims{}
		token, err := jwt.ParseWithClaims(req.RefreshToken, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(cfg.JWTSecret), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, `{"error":{"code":"UNAUTHORIZED","message":"Invalid refresh token"}}`, http.StatusUnauthorized)
			return
		}

		newToken, err := generateToken(cfg, claims.UserID, claims.Email, claims.Role)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to generate token"}}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"token": newToken,
		})
	}
}

func handleGetUser(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

		var email, name, role, plan string
		err := db.QueryRow(r.Context(),
			`SELECT email, name, role, subscription_tier FROM users WHERE id = $1`,
			userID,
		).Scan(&email, &name, &role, &plan)
		if err != nil {
			http.Error(w, `{"error":{"code":"NOT_FOUND","message":"User not found"}}`, http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"id":    userID,
			"email": email,
			"name":  name,
			"role":  role,
			"plan":  plan,
		})
	}
}

func handleUpdateUser(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

		var req struct {
			Name string `json:"name"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		_, err := db.Exec(r.Context(),
			`UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2`,
			req.Name, userID,
		)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to update user"}}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "User updated successfully",
		})
	}
}

func handleCreateAPIKey(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

		var req struct {
			Name string `json:"name"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		apiKey := "ck_" + generateRandomString(32)
		keyHash := hashAPIKey(apiKey)

		var keyID string
		err := db.QueryRow(r.Context(),
			`INSERT INTO api_keys (user_id, name, key_hash) VALUES ($1, $2, $3) RETURNING id`,
			userID, req.Name, keyHash,
		).Scan(&keyID)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to create API key"}}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"id":   keyID,
			"key":  apiKey,
			"name": req.Name,
		})
	}
}

func handleDeleteAPIKey(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)
		keyID := chi.URLParam(r, "id")

		_, err := db.Exec(r.Context(),
			`DELETE FROM api_keys WHERE id = $1 AND user_id = $2`,
			keyID, userID,
		)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to delete API key"}}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "API key deleted successfully",
		})
	}
}

func handleListAPIKeys(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

		rows, err := db.Query(r.Context(),
			`SELECT id, name, created_at, last_used_at FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC`,
			userID,
		)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to list API keys"}}`, http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var keys []map[string]interface{}
		for rows.Next() {
			var id, name string
			var createdAt time.Time
			var lastUsedAt *time.Time
			if err := rows.Scan(&id, &name, &createdAt, &lastUsedAt); err != nil {
				continue
			}
			keys = append(keys, map[string]interface{}{
				"id":           id,
				"name":         name,
				"created_at":   createdAt,
				"last_used_at": lastUsedAt,
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"keys": keys,
		})
	}
}

func generateRandomString(length int) string {
	bytes := make([]byte, length/2)
	rand.Read(bytes)
	return hex.EncodeToString(bytes)[:length]
}

func hashAPIKey(key string) string {
	h, _ := bcrypt.GenerateFromPassword([]byte(key), 8)
	return string(h)
}
