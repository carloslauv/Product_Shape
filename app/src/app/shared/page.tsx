"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ResultsView from "@/components/ResultsView";
import { decodeScores, matchArchetype } from "@/lib/archetypes";

function SharedResults() {
  const params = useSearchParams();
  const encoded = params.get("s") ?? "";
  const scores = decodeScores(encoded);
  const archetype = matchArchetype(scores);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[var(--fg)] flex items-center justify-center">
              <span className="text-[var(--bg)] text-[9px] font-bold font-sans">PM</span>
            </div>
            <span className="font-bold text-[var(--fg)] text-sm">Product Shape</span>
          </div>
          <span className="text-xs text-[var(--fg-subtle)] font-sans">Shared results</span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 mb-8">
          <p className="text-xs font-sans text-[var(--fg-subtle)] mb-1">Someone shared their Product Shape with you</p>
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
            These are read-only results.{" "}
            <a href="/" className="underline hover:text-[var(--fg)] transition-colors">
              Take the assessment yourself →
            </a>
          </p>
        </div>

        <ResultsView
          scores={scores}
          archetype={archetype}
          onReset={() => window.location.href = "/"}
          context="current_pm"
        />
      </div>
    </main>
  );
}

export default function SharedPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <p className="text-[var(--fg-subtle)] font-sans text-sm">Loading…</p>
      </main>
    }>
      <SharedResults />
    </Suspense>
  );
}
