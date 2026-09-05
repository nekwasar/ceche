package v1

import (
	"encoding/json"
	"net/http"
	"os"
	"strings"

	"github.com/nekwasar/ceche/internal/appraisal"
)

// handleRunTool runs a specific tool by name.
func handleRunTool() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Domain string `json:"domain"`
			Tool   string `json:"tool"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		req.Domain = strings.TrimSpace(strings.ToLower(req.Domain))
		if req.Domain == "" {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Domain is required"}}`, http.StatusBadRequest)
			return
		}

		if req.Tool == "" {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Tool name is required"}}`, http.StatusBadRequest)
			return
		}

		orch := appraisal.NewOrchestrator()
		tool := orch.GetTool(req.Tool)
		if tool == nil {
			http.Error(w, `{"error":{"code":"NOT_FOUND","message":"Tool not found"}}`, http.StatusNotFound)
			return
		}

		ctx := &appraisal.ToolContext{
			Domain:  req.Domain,
			SLD:     req.Domain,
			TLD:     "",
			Results: make(map[string]appraisal.ToolResult),
		}

		if idx := strings.LastIndex(req.Domain, "."); idx != -1 {
			ctx.TLD = req.Domain[idx+1:]
			ctx.SLD = req.Domain[:idx]
		}

		result := tool.Execute(req.Domain, ctx)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(result)
	}
}

// handleToolAppraise runs the full appraisal pipeline.
func handleToolAppraise() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			Domain string `json:"domain"`
			Tools  []string `json:"tools"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Invalid request body"}}`, http.StatusBadRequest)
			return
		}

		req.Domain = strings.TrimSpace(strings.ToLower(req.Domain))
		if req.Domain == "" {
			http.Error(w, `{"error":{"code":"VALIDATION_ERROR","message":"Domain is required"}}`, http.StatusBadRequest)
			return
		}

		orch := appraisal.NewOrchestrator()
		metrics := orch.Run(req.Domain)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(metrics)
	}
}

// handleListTools returns all available tool names.
func handleListTools() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		orch := appraisal.NewOrchestrator()
		tools := orch.ListTools()

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"tools": tools,
			"count": len(tools),
		})
	}
}

// handleGetToolSchema returns the tool schemas.
func handleGetToolSchema() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		schemaPath := "internal/appraisal/schema/tools.json"
		data, err := os.ReadFile(schemaPath)
		if err != nil {
			// Try alternate path
			schemaPath = "schema/tools.json"
			data, err = os.ReadFile(schemaPath)
			if err != nil {
				http.Error(w, `{"error":{"code":"NOT_FOUND","message":"Schema file not found"}}`, http.StatusNotFound)
				return
			}
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(data)
	}
}
