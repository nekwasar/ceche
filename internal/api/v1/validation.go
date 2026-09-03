package v1

import (
	"net/http"
	"regexp"
)

var domainRegex = regexp.MustCompile(`^[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$`)

const maxBodySize = 1 << 20 // 1MB

func limitBody(r *http.Request) *http.Request {
	r.Body = http.MaxBytesReader(nil, r.Body, maxBodySize)
	return r
}
