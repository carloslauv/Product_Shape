"use client";

import React, { useState, useCallback } from "react";
import RadarChart from "@/components/RadarChart";
import AssessmentStep from "@/components/AssessmentStep";
import ResultsView from "@/components/ResultsView";
import { RADAR_COMPETENCIES, matchArchetype } from "@/lib/archetypes";

type Step = "intro" | "assess" | "results";
type Context = "landing" | "current_pm" | "crack_pm";

const DEFAULT_SCORES = Object.fromEntries(RADAR_COMPETENCIES.map((c) => [c.id, 1]));

const PREVIEW_SCORES: Record<string, number> = {
  fluency_with_data: 5,
  voice_of_customer: 4,
  ux_design: 3,
  business_outcome: 3,
  product_vision: 4,
  strategic_impact: 3,
  stakeholder_management: 2,
  team_leadership: 3,
  managing_up: 2,
  feature_specification: 4,
  product_delivery: 3,
  quality_assurance: 5,
};

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [context, setContext] = useState<Context>("current_pm");
  const [scores, setScores] = useState<Record<string, number>>(DEFAULT_SCORES);

  const handleScoreChange = useCallback((id: string, value: number) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  }, []);

  const completedCount = Object.values(scores).filter((s) => s > 1).length;
  const totalCount = RADAR_COMPETENCIES.length;
  const pct = Math.round((completedCount / totalCount) * 100);
  const archetype = matchArchetype(scores);

  function reset() {
    setScores(DEFAULT_SCORES);
    setStep("intro");
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────
  if (step === "results") {
    return (
      <main className="min-h-screen bg-[var(--bg)] px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <button onClick={() => setStep("assess")} className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg-muted)] font-sans transition-colors">
              ← Back
            </button>
            <span className="text-xs text-[var(--fg-subtle)] font-sans">Framework by Ravi Mehta</span>
          </div>
          <ResultsView scores={scores} archetype={archetype} onReset={reset} context={context} />
        </div>
      </main>
    );
  }

  // ── ASSESS ───────────────────────────────────────────────────────────────
  if (step === "assess") {
    return (
      <main className="min-h-screen bg-[var(--bg)]">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Nav */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setStep("intro")} className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg-muted)] font-sans transition-colors">
              ← Back
            </button>
            <span className="text-xs text-[var(--fg-subtle)] font-sans">Framework by Ravi Mehta</span>
          </div>

          {/* Live radar — full width */}
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-sans font-semibold tracking-widest text-[var(--fg-subtle)] uppercase">Your Shape</p>
              <span className="text-xs font-sans text-[var(--fg-subtle)]">{completedCount}/{totalCount} rated</span>
            </div>
            <RadarChart scores={scores} size={520} />
            {/* Progress bar */}
            <div className="mt-5">
              <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--fg)] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>

          {/* CTA if done */}
          {completedCount === totalCount && (
            <button
              onClick={() => setStep("results")}
              className="w-full mb-8 py-4 bg-[var(--fg)] text-[var(--bg)] rounded-xl font-semibold font-sans text-sm hover:opacity-80 transition-opacity"
            >
              See My Shape →
            </button>
          )}

          {/* Assessment */}
          <h2 className="text-xl font-bold text-[var(--fg)] mb-1">Rate Your Competencies</h2>
          <p className="text-sm text-[var(--fg-muted)] mb-8 leading-relaxed">
            Be honest — this is most useful when you are candid about where you stand today.
          </p>

          <AssessmentStep scores={scores} onChange={handleScoreChange} />

          <div className="mt-10 pb-12">
            <button
              onClick={() => setStep("results")}
              className="w-full py-4 bg-[var(--fg)] text-[var(--bg)] rounded-xl font-bold font-sans text-sm hover:opacity-80 transition-opacity"
            >
              See My Product Shape →
            </button>
            <p className="text-center text-xs text-[var(--fg-subtle)] font-sans mt-3">
              Results update live as you rate — you can adjust anytime
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <p className="text-[10px] font-sans font-semibold tracking-widest text-[var(--fg-subtle)] uppercase mb-5">
          Product Manager Competency Map
        </p>

        <h1 className="text-5xl font-bold text-[var(--fg)] mb-6 leading-tight">
          What's Your<br />Shape?
        </h1>

        <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-3 max-w-lg">
          Rate yourself on the 12 PM competencies from <em>Needs Focus</em> to <em>Outperform</em>.
          Your shape reveals your archetype, your spikes to lean into, and the gaps to manage —
          framed for landing your next PM role.
        </p>

        <p className="text-xs text-[var(--fg-subtle)] font-sans mb-10">
          Framework & archetypes by{" "}
          <a href="https://www.ravi-mehta.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--fg-muted)]">
            Ravi Mehta
          </a>. Unofficial interactive companion.
        </p>

        {/* Big preview radar */}
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-6 mb-10">
          <RadarChart scores={PREVIEW_SCORES} size={540} />
        </div>

        {/* Context selector */}
        <div className="mb-8">
          <p className="text-[10px] font-sans font-semibold tracking-widest text-[var(--fg-subtle)] uppercase mb-4">I want advice for</p>
          <div className="space-y-2">
            {[
              { id: "current_pm" as Context, label: "Landing a new PM role", sub: "Already a PM, looking to level up or switch" },
              { id: "landing" as Context,    label: "Growing as a PM",       sub: "Understand your strengths and build a plan" },
              { id: "crack_pm" as Context,   label: "Breaking into Product", sub: "Transitioning into PM from another field" },
            ].map(({ id, label, sub }) => (
              <button
                key={id}
                onClick={() => setContext(id)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all font-sans ${
                  context === id
                    ? "border-[var(--fg)] bg-[var(--bg-card)]"
                    : "border-[var(--border)] bg-transparent hover:border-[var(--fg-subtle)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors ${context === id ? "bg-[var(--fg)] border-[var(--fg)]" : "border-[var(--border)]"}`} />
                  <div>
                    <p className="font-semibold text-[var(--fg)] text-sm">{label}</p>
                    <p className="text-xs text-[var(--fg-subtle)] mt-0.5">{sub}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStep("assess")}
          className="w-full py-4 bg-[var(--fg)] text-[var(--bg)] rounded-xl font-bold font-sans text-base hover:opacity-80 transition-opacity"
        >
          Start Assessment →
        </button>

        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { n: "01", title: "Rate yourself", desc: "12 competencies, 1–5 scale" },
            { n: "02", title: "See your shape", desc: "Live radar updates as you go" },
            { n: "03", title: "Get your roadmap", desc: "Archetype + interview prep" },
          ].map(({ n, title, desc }) => (
            <div key={n} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
              <p className="text-[10px] font-sans text-[var(--fg-subtle)] mb-2">{n}</p>
              <p className="font-semibold text-[var(--fg)] text-sm">{title}</p>
              <p className="text-xs text-[var(--fg-subtle)] mt-0.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[var(--fg-subtle)] font-sans mt-8 pb-8">
          3 minutes · Free · No login required
        </p>
      </div>
    </main>
  );
}
