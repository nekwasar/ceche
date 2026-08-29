"use client";

import { useAuth } from "@/lib/auth-context";

export default function AppraisePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Domain Appraiser</h1>
      <p className="text-muted-foreground mb-8">
        Welcome back, {user?.name || "User"}. Enter a domain name to get an instant appraisal score.
      </p>
      <div className="border border-border rounded-lg p-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter domain (e.g., example.com)"
            className="flex-1 border border-border rounded-md px-4 py-2 bg-background"
          />
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium">
            Appraise
          </button>
        </div>
      </div>
    </div>
  );
}
