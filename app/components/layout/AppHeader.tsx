"use client";

import { useAuth } from "@/lib/auth-context";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-bold text-primary">Ceche</a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm hover:text-primary">Home</a>
            <a href="/appraise" className="text-sm hover:text-primary">Appraise</a>
            <a href="/scan" className="text-sm hover:text-primary">Scanner</a>
            <a href="/marketplace" className="text-sm hover:text-primary">Marketplace</a>
            <a href="/api-keys" className="text-sm hover:text-primary">API Keys</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <button
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="text-sm hover:text-primary"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
