"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ApiKeysPage() {
  const t = useTranslations("apikeys");
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [keys, setKeys] = useState<{ id: string; name: string; created_at: string; last_used_at: string | null }[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { if (!isLoading && !user) router.push("/login"); }, [user, isLoading, router]);
  useEffect(() => { if (token) fetchKeys(); }, [token]);

  const fetchKeys = async () => { try { const res = await fetch(`${API_URL}/api/v1/api-keys`, { headers: { Authorization: `Bearer ${token}` } }); if (res.ok) { const data = await res.json(); setKeys(data.keys || []); } } catch { setError("Failed to load API keys"); } };
  const createKey = async (e: React.FormEvent) => { e.preventDefault(); setIsCreating(true); setError(""); try { const res = await fetch(`${API_URL}/api/v1/api-keys`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ name: newKeyName }) }); if (res.ok) { const data = await res.json(); setNewKey(data.key); setNewKeyName(""); await fetchKeys(); } else { setError("Failed to create API key"); } } catch { setError("Failed to create API key"); } finally { setIsCreating(false); } };
  const deleteKey = async (id: string) => { try { const res = await fetch(`${API_URL}/api/v1/api-keys/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }); if (res.ok) await fetchKeys(); } catch { setError("Failed to delete API key"); } };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><p>{t("loading")}</p></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">{error}</div>}
      {newKey && (
        <div className="bg-green-500/10 text-green-600 p-4 rounded-md mb-4">
          <p className="font-medium mb-2">{t("newKey")}</p>
          <code className="block bg-background p-2 rounded text-sm break-all">{newKey}</code>
          <button onClick={() => setNewKey(null)} className="mt-2 text-sm underline">{t("dismiss")}</button>
        </div>
      )}
      <div className="border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{t("createTitle")}</h2>
        <form onSubmit={createKey} className="flex gap-4">
          <input type="text" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder={t("placeholder")} required className="flex-1 border border-border rounded-md px-3 py-2 bg-background" />
          <button type="submit" disabled={isCreating} className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium disabled:opacity-50">{isCreating ? t("creating") : t("create")}</button>
        </form>
      </div>
      <div className="border border-border rounded-lg">
        <div className="p-4 border-b border-border"><h2 className="text-xl font-semibold">{t("yourKeys")}</h2></div>
        {keys.length === 0 ? <div className="p-8 text-center text-muted-foreground">{t("noKeys")}</div> : (
          <div className="divide-y divide-border">{keys.map((key) => (
            <div key={key.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{key.name}</p>
                <p className="text-sm text-muted-foreground">{t("created")} {new Date(key.created_at).toLocaleDateString()}{key.last_used_at && <> · {t("lastUsed")} {new Date(key.last_used_at).toLocaleDateString()}</>}</p>
              </div>
              <button onClick={() => deleteKey(key.id)} className="text-destructive hover:underline text-sm">{t("delete")}</button>
            </div>
          ))}</div>
        )}
      </div>
    </div>
  );
}
