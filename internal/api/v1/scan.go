package v1

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/nekwasar/ceche/internal/scanner"
)

func handleCreateScan(db *pgxpool.Pool) http.HandlerFunc {
	type scanRequest struct {
		WordListName string   `json:"word_list_name"`
		Tlds         []string `json:"tlds"`
		Words        []string `json:"words"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

		var req scanRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		var words []string
		if len(req.Words) > 0 {
			words = req.Words
		} else if req.WordListName != "" {
			words = scanner.GetWordListByName(req.WordListName)
		} else {
			words = scanner.GetBuiltinWords()
		}

		if len(words) == 0 {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"No words provided"}}`, http.StatusBadRequest)
			return
		}

		tlds := req.Tlds
		if len(tlds) == 0 {
			tlds = []string{"com", "net", "io", "co"}
		}

		validTlds := map[string]bool{"com": true, "net": true, "io": true, "co": true}
		for _, tld := range tlds {
			if !validTlds[tld] {
				http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid TLD: only com, net, io, co allowed"}}`, http.StatusBadRequest)
				return
			}
		}

		domains := scanner.GenerateCombinations(words, tlds)
		totalDomains := len(domains) * len(tlds)

		wordListName := req.WordListName
		if wordListName == "" {
			wordListName = "custom"
		}

		var scanID string
		err := db.QueryRow(r.Context(),
			`INSERT INTO scans (user_id, word_list_name, tlds, status, total_domains)
			 VALUES ($1, $2, $3, 'pending', $4) RETURNING id`,
			userID, wordListName, tlds, totalDomains,
		).Scan(&scanID)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to create scan"}}`, http.StatusInternalServerError)
			return
		}

		s := scanner.New(db, 50)
		s.Start(r.Context(), scanID, domains, tlds)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"scan_id":    scanID,
			"total":      totalDomains,
			"status":     "pending",
			"created_at": time.Now(),
		})
	}
}

func handleGetScan(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)
		scanID := chi.URLParam(r, "id")

		var total, scanned, available int
		var status, wordListName string
		var tlds []string
		var createdAt, startedAt, completedAt interface{}
		var errorMessage *string

		err := db.QueryRow(r.Context(),
			`SELECT total_domains, scanned_domains, available_domains, status, word_list_name, tlds, created_at, started_at, completed_at, error_message
			 FROM scans WHERE id = $1 AND user_id = $2`,
			scanID, userID,
		).Scan(&total, &scanned, &available, &status, &wordListName, &tlds, &createdAt, &startedAt, &completedAt, &errorMessage)
		if err != nil {
			http.Error(w, `{"error":{"code":"NOT_FOUND","message":"Scan not found"}}`, http.StatusNotFound)
			return
		}

		var results []map[string]interface{}
		rows, err := db.Query(r.Context(),
			`SELECT domain, tld, available, price, registrar, error, checked_at
			 FROM scan_results WHERE scan_id = $1
			 ORDER BY available DESC, domain ASC
			 LIMIT 1000`,
			scanID,
		)
		if err == nil {
			defer rows.Close()
			for rows.Next() {
				var domain, tld string
				var available bool
				var price *float64
				var registrar, errorStr *string
				var checkedAt interface{}
				if err := rows.Scan(&domain, &tld, &available, &price, &registrar, &errorStr, &checkedAt); err != nil {
					continue
				}
				results = append(results, map[string]interface{}{
					"domain":     domain,
					"tld":        tld,
					"available":  available,
					"price":      price,
					"registrar":  registrar,
					"error":      errorStr,
					"checked_at": checkedAt,
				})
			}
		}

		if results == nil {
			results = []map[string]interface{}{}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"scan_id":         scanID,
			"total":           total,
			"scanned":         scanned,
			"available":       available,
			"status":          status,
			"word_list_name":  wordListName,
			"tlds":            tlds,
			"results":         results,
			"error_message":   errorMessage,
			"created_at":      createdAt,
			"started_at":      startedAt,
			"completed_at":    completedAt,
		})
	}
}

func handleGetUserScans(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

		rows, err := db.Query(r.Context(),
			`SELECT id, word_list_name, tlds, status, total_domains, scanned_domains, available_domains, created_at, completed_at
			 FROM scans WHERE user_id = $1
			 ORDER BY created_at DESC LIMIT 20`,
			userID,
		)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to fetch scans"}}`, http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var scans []map[string]interface{}
		for rows.Next() {
			var id, wordListName, status string
			var tlds []string
			var total, scanned, available int
			var createdAt, completedAt interface{}
			if err := rows.Scan(&id, &wordListName, &tlds, &status, &total, &scanned, &available, &createdAt, &completedAt); err != nil {
				continue
			}
			scans = append(scans, map[string]interface{}{
				"id":               id,
				"word_list_name":   wordListName,
				"tlds":             tlds,
				"status":           status,
				"total_domains":    total,
				"scanned_domains":  scanned,
				"available_domains": available,
				"created_at":       createdAt,
				"completed_at":     completedAt,
			})
		}

		if scans == nil {
			scans = []map[string]interface{}{}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"scans": scans,
		})
	}
}

func handleGetWordLists(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

		lists := []map[string]interface{}{
			{"name": "builtin", "word_count": len(scanner.GetBuiltinWords()), "source": "system"},
			{"name": "tech", "word_count": len(scanner.GetWordListByName("tech")), "source": "system"},
			{"name": "business", "word_count": len(scanner.GetWordListByName("business")), "source": "system"},
			{"name": "creative", "word_count": len(scanner.GetWordListByName("creative")), "source": "system"},
		}

		rows, err := db.Query(r.Context(),
			`SELECT id, name, word_count, source, created_at
			 FROM word_lists WHERE user_id = $1
			 ORDER BY created_at DESC`,
			userID,
		)
		if err == nil {
			defer rows.Close()
			for rows.Next() {
				var id, name, source string
				var wordCount int
				var createdAt interface{}
				if err := rows.Scan(&id, &name, &wordCount, &source, &createdAt); err != nil {
					continue
				}
				lists = append(lists, map[string]interface{}{
					"id":         id,
					"name":       name,
					"word_count": wordCount,
					"source":     source,
					"created_at": createdAt,
				})
			}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"word_lists": lists,
		})
	}
}

func handleCreateWordList(db *pgxpool.Pool) http.HandlerFunc {
	type wordListRequest struct {
		Name  string   `json:"name"`
		Words []string `json:"words"`
	}

	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)

		var req wordListRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		if req.Name == "" {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Name is required"}}`, http.StatusBadRequest)
			return
		}

		if len(req.Words) == 0 {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Words array is required"}}`, http.StatusBadRequest)
			return
		}

		var listID string
		err := db.QueryRow(r.Context(),
			`INSERT INTO word_lists (user_id, name, words, word_count, source)
			 VALUES ($1, $2, $3, $4, 'custom') RETURNING id`,
			userID, req.Name, req.Words, len(req.Words),
		).Scan(&listID)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to create word list"}}`, http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"id":         listID,
			"name":       req.Name,
			"word_count": len(req.Words),
			"source":     "custom",
		})
	}
}

func handleDeleteWordList(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)
		listID := chi.URLParam(r, "id")

		result, err := db.Exec(r.Context(),
			`DELETE FROM word_lists WHERE id = $1 AND user_id = $2 AND source = 'custom'`,
			listID, userID,
		)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to delete word list"}}`, http.StatusInternalServerError)
			return
		}

		rowsAffected := result.RowsAffected()
		if rowsAffected == 0 {
			http.Error(w, `{"error":{"code":"NOT_FOUND","message":"Word list not found"}}`, http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Word list deleted",
		})
	}
}

func handleExportScanResults(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("user_id").(string)
		scanID := chi.URLParam(r, "id")

		var exists bool
		err := db.QueryRow(r.Context(),
			`SELECT EXISTS(SELECT 1 FROM scans WHERE id = $1 AND user_id = $2)`,
			scanID, userID,
		).Scan(&exists)
		if err != nil || !exists {
			http.Error(w, `{"error":{"code":"NOT_FOUND","message":"Scan not found"}}`, http.StatusNotFound)
			return
		}

		rows, err := db.Query(r.Context(),
			`SELECT domain, tld, available, price, error
			 FROM scan_results WHERE scan_id = $1
			 ORDER BY available DESC, domain ASC`,
			scanID,
		)
		if err != nil {
			http.Error(w, `{"error":{"code":"INTERNAL_ERROR","message":"Failed to fetch results"}}`, http.StatusInternalServerError)
			return
		}
	defer rows.Close()

	w.Header().Set("Content-Type", "text/csv")
	w.Header().Set("Content-Disposition", "attachment; filename=scan_results.csv")

	w.Write([]byte("domain,tld,available,price,error\n"))
	for rows.Next() {
		var domain, tld string
		var available bool
		var price *float64
		var errorStr *string
		if err := rows.Scan(&domain, &tld, &available, &price, &errorStr); err != nil {
			continue
		}
		priceStr := ""
		if price != nil {
			priceStr = string(rune(*price))
		}
		errorVal := ""
		if errorStr != nil {
			errorVal = *errorStr
		}
		w.Write([]byte(domain + "." + tld + "," + tld + "," + boolToCSV(available) + "," + priceStr + "," + errorVal + "\n"))
	}
	}
}

func boolToCSV(b bool) string {
	if b {
		return "true"
	}
	return "false"
}
