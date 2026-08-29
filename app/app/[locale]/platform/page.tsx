"use client";

import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome back, {user?.name || "User"}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Plan</h3>
          <p className="text-2xl font-bold text-primary capitalize">{user?.plan || "free"}</p>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">API Keys</h3>
          <a href="/platform/api-keys" className="text-primary hover:underline">
            Manage keys →
          </a>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <a href="/platform/appraise" className="block text-primary hover:underline">
              Appraise a domain →
            </a>
            <a href="/platform/scan" className="block text-primary hover:underline">
              Start a scan →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
