'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const TLD_OPTIONS = [{ id: 'com', label: '.com', price: '$9.99' }, { id: 'net', label: '.net', price: '$7.99' }, { id: 'io', label: '.io', price: '$12.99' }, { id: 'co', label: '.co', price: '$8.99' }];
const WORD_LISTS = [{ name: 'builtin', label: 'Common Words', count: 150 }, { name: 'tech', label: 'Technology', count: 80 }, { name: 'business', label: 'Business', count: 90 }, { name: 'creative', label: 'Creative', count: 70 }];

interface ScanResult { domain: string; tld: string; available: boolean; price?: number; error?: string; }
interface Scan { id: string; word_list_name: string; tlds: string[]; status: string; total_domains: number; scanned_domains: number; available_domains: number; created_at: string; completed_at?: string; }

export default function ScanPage() {
  const t = useTranslations("scanPage");
  const router = useRouter();
  const { token } = useAuth();
  const [selectedWordList, setSelectedWordList] = useState('builtin');
  const [selectedTlds, setSelectedTlds] = useState<string[]>(['com', 'net']);
  const [customWords, setCustomWords] = useState('');
  const [useCustomWords, setUseCustomWords] = useState(false);
  const [scans, setScans] = useState<Scan[]>([]);
  const [currentScan, setCurrentScan] = useState<Scan | null>(null);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(true);
  const [sortBy, setSortBy] = useState<'domain' | 'price'>('domain');

  useEffect(() => { fetchScans(); }, []);

  const fetchScans = async () => { try { const r = await fetch(`${API_URL}/api/v1/scans`, { headers: { Authorization: `Bearer ${token}` } }); if (r.ok) { const d = await r.json(); setScans(d.scans || []); } } catch {} };

  const handleStartScan = async () => {
    setLoading(true); setProgress(0); setShowResults(false);
    try {
      const body: any = { tlds: selectedTlds };
      if (useCustomWords && customWords.trim()) { body.words = customWords.split('\n').map(w => w.trim()).filter(w => w); } else { body.word_list_name = selectedWordList; }
      const r = await fetch(`${API_URL}/api/v1/scans`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
      if (!r.ok) throw new Error('Failed');
      const d = await r.json();
      setCurrentScan({ id: d.scan_id, word_list_name: selectedWordList, tlds: selectedTlds, status: 'running', total_domains: d.total, scanned_domains: 0, available_domains: 0, created_at: new Date().toISOString() });
      pollScanProgress(d.scan_id);
    } catch { setLoading(false); }
  };

  const pollScanProgress = async (scanId: string) => {
    const poll = setInterval(async () => {
      try {
        const r = await fetch(`/api/v1/scans/${scanId}`, { headers: { Authorization: `Bearer ${token}` } });
        if (r.ok) { const d = await r.json(); setCurrentScan(d); setResults(d.results || []); const p = d.total_domains > 0 ? (d.scanned_domains / d.total_domains) * 100 : 0; setProgress(p); if (d.status === 'completed' || d.status === 'failed') { clearInterval(poll); setLoading(false); setShowResults(true); fetchScans(); } }
      } catch {}
    }, 1000);
    return () => clearInterval(poll);
  };

  const handleExportCSV = async () => {
    if (!currentScan) return;
    try { const r = await fetch(`/api/v1/scans/${currentScan.id}/export`, { headers: { Authorization: `Bearer ${token}` } }); if (r.ok) { const b = await r.blob(); const u = window.URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `scan_${currentScan.id}.csv`; document.body.appendChild(a); a.click(); document.body.removeChild(a); window.URL.revokeObjectURL(u); } } catch {}
  };

  const toggleTld = (tld: string) => { setSelectedTlds(prev => prev.includes(tld) ? prev.filter(t => t !== tld) : [...prev, tld]); };
  const filteredResults = results.filter(r => !filterAvailable || r.available).sort((a, b) => sortBy === 'price' ? (a.price || 0) - (b.price || 0) : a.domain.localeCompare(b.domain));

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8"><h1 className="text-3xl font-bold text-[#1A1A1A]">{t("title")}</h1><p className="mt-2 text-gray-600">{t("desc")}</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">{t("config")}</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("wordList")}</label>
                  <div className="space-y-2">
                    {WORD_LISTS.map(list => (<label key={list.name} className="flex items-center"><input type="radio" name="wordlist" value={list.name} checked={selectedWordList === list.name && !useCustomWords} onChange={() => { setSelectedWordList(list.name); setUseCustomWords(false); }} className="h-4 w-4 text-[#9E2A2B]" /><span className="ml-2 text-sm text-gray-700">{list.label} ({list.count} words)</span></label>))}
                    <label className="flex items-center"><input type="radio" name="wordlist" checked={useCustomWords} onChange={() => setUseCustomWords(true)} className="h-4 w-4 text-[#9E2A2B]" /><span className="ml-2 text-sm text-gray-700">{t("customWords")}</span></label>
                  </div>
                  {useCustomWords && <textarea value={customWords} onChange={(e) => setCustomWords(e.target.value)} placeholder={t("customPlaceholder")} className="mt-3 w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9E2A2B] text-sm" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("tlds")}</label>
                  <div className="grid grid-cols-2 gap-2">{TLD_OPTIONS.map(tld => (<label key={tld.id} className="flex items-center"><input type="checkbox" checked={selectedTlds.includes(tld.id)} onChange={() => toggleTld(tld.id)} className="h-4 w-4 text-[#9E2A2B] rounded" /><span className="ml-2 text-sm text-gray-700">{tld.label} ({tld.price})</span></label>))}</div>
                </div>
                <button onClick={handleStartScan} disabled={loading || selectedTlds.length === 0} className="w-full bg-[#9E2A2B] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#8A2425] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{loading ? t("scanning") : t("startScan")}</button>
              </div>
            </div>
            {currentScan && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-[#1A1A1A] mb-3">{t("progress")}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">{t("status")}</span><span className={`font-medium ${currentScan.status === 'completed' ? 'text-green-600' : currentScan.status === 'failed' ? 'text-red-600' : 'text-[#F4A261]'}`}>{currentScan.status}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">{t("progressLabel")}</span><span className="font-medium text-[#1A1A1A]">{currentScan.scanned_domains} / {currentScan.total_domains}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-600">{t("available")}</span><span className="font-medium text-green-600">{currentScan.available_domains}</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-[#9E2A2B] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            {showResults && results.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                  <h2 className="text-lg font-semibold text-[#1A1A1A]">{t("results", { count: filteredResults.length })}</h2>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center"><input type="checkbox" checked={filterAvailable} onChange={(e) => setFilterAvailable(e.target.checked)} className="h-4 w-4 text-[#9E2A2B] rounded" /><span className="ml-2 text-sm text-gray-700">{t("availableOnly")}</span></label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'domain' | 'price')} className="text-sm border border-gray-300 rounded-md px-3 py-1"><option value="domain">{t("sortByDomain")}</option><option value="price">{t("sortByPrice")}</option></select>
                    <button onClick={handleExportCSV} className="bg-[#F4A261] text-[#1A1A1A] px-3 py-1 rounded-md text-sm font-medium">{t("exportCsv")}</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50"><tr>{[t("domain"), t("statusHeader"), t("price"), t("actions")].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">{filteredResults.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1A1A1A]">{r.domain}.{r.tld}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{r.available ? <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">{t("availableBadge")}</span> : r.error ? <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">{t("errorBadge")}</span> : <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">{t("takenBadge")}</span>}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.available && r.price ? `$${r.price.toFixed(2)}` : '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{r.available && <a href={`/appraise?domain=${r.domain}.${r.tld}`} className="text-[#9E2A2B] hover:text-[#8A2425]">{t("appraise")}</a>}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            )}
            {!showResults && !loading && <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"><h3 className="text-lg font-medium text-gray-900 mb-2">{t("noResults")}</h3><p className="text-gray-500">{t("noResultsDesc")}</p></div>}
            {scans.length > 0 && !loading && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-[#1A1A1A] mb-4">{t("recentScans")}</h3>
                <div className="space-y-3">{scans.slice(0, 5).map(scan => (
                  <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => { setCurrentScan(scan); setResults([]); setShowResults(true); pollScanProgress(scan.id); }}>
                    <div><span className="text-sm font-medium text-[#1A1A1A]">{scan.word_list_name} {t("scan")}</span><span className="text-xs text-gray-500 ml-2">{scan.tlds.join(', ')}</span></div>
                    <div className="flex items-center gap-4"><span className="text-xs text-gray-500">{scan.scanned_domains}/{scan.total_domains}</span><span className={`px-2 py-1 text-xs rounded-full ${scan.status === 'completed' ? 'bg-green-100 text-green-800' : scan.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{scan.status}</span></div>
                  </div>
                ))}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
