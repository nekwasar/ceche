"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PremiumGateModalProps {
  toolName: string;
}

export default function PremiumGateModal({ toolName }: PremiumGateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = "/signup";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "40px",
          maxWidth: "480px",
          width: "90%",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            backgroundColor: "#9E2A2B",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "12px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Premium Feature
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "#666666",
            marginBottom: "24px",
            lineHeight: 1.6,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {toolName} requires a premium account. Sign up to unlock this feature
          and many more.
        </p>

        <div
          style={{
            backgroundColor: "#FAF7F2",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#999999",
              marginBottom: "8px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Redirecting to signup in {countdown} seconds...
          </p>
          <div
            style={{
              height: "4px",
              backgroundColor: "#E0E0E0",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#9E2A2B",
                borderRadius: "2px",
                width: `${((2 - countdown) / 2) * 100}%`,
                transition: "width 1s linear",
              }}
            />
          </div>
        </div>

        <Link
          href="/signup"
          style={{
            display: "inline-block",
            backgroundColor: "#9E2A2B",
            color: "#FFFFFF",
            padding: "14px 32px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: "16px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Create Free Account
        </Link>

        <div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "#999999",
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "underline",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
