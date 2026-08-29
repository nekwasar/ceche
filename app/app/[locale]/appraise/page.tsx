"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface ScoreMetrics {
  domain: string;
  score: number;
  metrics: {
    length: number;
    length_score: number;
    tld: string;
    tld_score: number;
    brand_score: number;
    read_score: number;
    dictionary: boolean;
    dictionary_bonus: number;
    phonetic_score: number;
    total: number;
  };
}

interface Appraisal {
  id: string;
  domain: string;
  score: number;
  metrics: ScoreMetrics;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  if (score >= 40) return "text-orange-600";
  return "text-red-600";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Poor";
}

export default function AppraisePage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<ScoreMetrics | null>(null);
  const [history, setHistory] = useState<Appraisal[]>([]);
  const [isAppraising, setIsAppraising] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (token) {
      fetchHistory();
    }
  }, [token]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/appraisals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.appraisals || []);
      }
    } catch {
      // ignore
    }
  };

  const handleAppraise = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setIsAppraising(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/appraise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ domain }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error?.message || "Appraisal failed");
        return;
      }

      const data: ScoreMetrics = await res.json();
      setResult(data);
      await fetchHistory();
    } catch {
      setError("Failed to connect to server");
    } finally {
      setIsAppraising(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Domain Appraiser</h1>
      <p className="text-muted-foreground mb-8">
        Enter a domain name to get an instant appraisal score based on length, TLD, brandability, and readability.
      </p>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="border border-border rounded-lg p-6 mb-8">
        <form onSubmit={handleAppraise} className="flex gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain (e.g., example.com)"
            required
            className="flex-1 border border-border rounded-md px-4 py-2 bg-background"
          />
          <button
            type="submit"
            disabled={isAppraising}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium disabled:opacity-50"
          >
            {isAppraising ? "Appraising..." : "Appraise"}
          </button>
        </form>
      </div>

      {result && (
        <div className="border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{result.domain}</h2>
              <p className="text-muted-foreground">Appraisal Result</p>
            </div>
            <div className="text-right">
              <p className={`text-5xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </p>
              <p className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                {getScoreLabel(result.score)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Score Breakdown</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Length ({result.metrics.metrics.length} chars)</span>
                    <span>{result.metrics.metrics.length_score}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${result.metrics.metrics.length_score}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>TLD ({result.metrics.metrics.tld})</span>
                    <span>{result.metrics.metrics.tld_score}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${result.metrics.metrics.tld_score}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Brandability</span>
                    <span>{result.metrics.metrics.brand_score}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${result.metrics.metrics.brand_score}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Readability</span>
                    <span>{result.metrics.metrics.read_score}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${result.metrics.metrics.read_score}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Phonetic</span>
                    <span>{result.metrics.metrics.phonetic_score}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${result.metrics.metrics.phonetic_score}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Domain Name</span>
                  <span className="font-medium">{result.metrics.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TLD</span>
                  <span className="font-medium">{result.metrics.metrics.tld}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Length</span>
                  <span className="font-medium">{result.metrics.metrics.length} characters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dictionary Word</span>
                  <span className="font-medium">{result.metrics.metrics.dictionary ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">What This Means</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                {result.score >= 80 && (
                  <p>This is a premium domain with excellent brandability, short length, and a high-value TLD. It would be highly sought after in the marketplace.</p>
                )}
                {result.score >= 60 && result.score < 80 && (
                  <p>This is a solid domain with good characteristics. It has reasonable length and brandability, making it suitable for a business or project.</p>
                )}
                {result.score >= 40 && result.score < 60 && (
                  <p>This is an average domain. It may work for specific use cases but lacks the premium characteristics of shorter, more brandable names.</p>
                )}
                {result.score < 40 && (
                  <p>This domain has lower market value due to length, TLD, or brandability factors. Consider shorter alternatives for better results.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-semibold">Recent Appraisals</h2>
        </div>
        {history.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No appraisals yet. Enter a domain above to get started.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer"
                onClick={() => {
                  setDomain(item.domain);
                  setResult(item);
                }}
              >
                <div>
                  <p className="font-medium">{item.domain}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                    {item.score}
                  </p>
                  <p className={`text-xs ${getScoreColor(item.score)}`}>
                    {getScoreLabel(item.score)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
