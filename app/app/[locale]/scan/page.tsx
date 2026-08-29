"use client";

import { useAuth } from "@/lib/auth-context";

export default function ScanPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Domain Scanner</h1>
      <p className="text-muted-foreground mb-8">
        Welcome back, {user?.name || "User"}. Find available domains matching your criteria.
      </p>
      <div className="border border-border rounded-lg p-6">
        <p className="text-muted-foreground">Scanner interface coming soon.</p>
      </div>
    </div>
  );
}
