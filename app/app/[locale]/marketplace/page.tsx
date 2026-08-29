"use client";

import { useAuth } from "@/lib/auth-context";

export default function MarketplacePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
      <p className="text-muted-foreground mb-8">
        Welcome back, {user?.name || "User"}. Browse premium domains available for purchase.
      </p>
      <div className="border border-border rounded-lg p-6">
        <p className="text-muted-foreground">Marketplace coming soon.</p>
      </div>
    </div>
  );
}
