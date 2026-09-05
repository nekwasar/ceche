package appraisal

import (
	"fmt"
	"testing"
)

func TestSegmentation(t *testing.T) {
	domains := []string{"chetanna", "gojominitia", "backto2000s", "nekwasar", "kisslol", "business", "car", "ai", "x"}
	for _, d := range domains {
		candidates := generateCandidates(d)
		if len(candidates) > 0 {
			fmt.Printf("%s: %v\n", d, candidates[0])
		} else {
			fmt.Printf("%s: unsegmented\n", d)
		}
	}
}
