"use client";

import React, { useState } from "react";
import RadarChart from "./RadarChart";
import {
  Archetype,
  QUADRANT_LABELS,
  QuadrantKey,
  getQuadrantScores,
  scoreToLevel,
  RADAR_COMPETENCIES,
} from "@/lib/archetypes";

interface ResultsViewProps {
  scores: Record<string, number>;
  archetype: Archetype;
  onReset: () => void;
  context: "landing" | "current_pm" | "crack_pm";
}

const Q_COLORS: Record<QuadrantKey, string> = {
  execution: "#C1633A",
  insight: "#C49A3C",
  strategy: "#2A6B6B",
  influencing: "#3A5F8A",
};

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const pct = ((score - 1) / 4) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-[var(--fg)]">{label}</span>
        <span className="text-xs font-sans text-[var(--fg-subtle)]">{scoreToLevel(score)}</span>
      </div>
      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--border)] my-8" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-sans font-semibold tracking-widest text-[var(--fg-subtle)] uppercase mb-4">
      {children}
    </p>
  );
}

export default function ResultsView({ scores, archetype, onReset, context }: ResultsViewProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");

  const quadrantScores = getQuadrantScores(scores);

  const sorted = [...RADAR_COMPETENCIES].sort((a, b) => (scores[b.id] ?? 1) - (scores[a.id] ?? 1));
  const topThree = sorted.slice(0, 3);
  const bottomThree = sorted.slice(-3).reverse();

  const advice = context === "crack_pm" ? archetype.pm_crack_advice : archetype.career_advice;

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    setEmailError("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, scores, archetypeId: archetype.id, context }),
      });
      if (res.ok) setEmailSent(true);
      else setEmailError("Something went wrong. Try again.");
    } catch {
      setEmailError("Network error. Try again.");
    }
    setSending(false);
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Archetype hero */}
      <div className="mb-8">
        <p className="text-[10px] font-sans font-semibold tracking-widest text-[var(--fg-subtle)] uppercase mb-3">Your PM Archetype</p>
        <div className="flex items-start gap-4">
          <span className="text-5xl">{archetype.emoji}</span>
          <div>
            <h2 className="text-3xl font-bold text-[var(--fg)] leading-tight">{archetype.name}</h2>
            <p className="text-[var(--fg-muted)] italic mt-1">"{archetype.tagline}"</p>
          </div>
        </div>
        <p className="mt-4 text-base text-[var(--fg-muted)] leading-relaxed">{archetype.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {archetype.roles.map((r) => (
            <span key={r} className="text-xs font-sans font-medium px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--fg-muted)] bg-[var(--bg-card)]">
              {r}
            </span>
          ))}
        </div>
      </div>

      <Divider />

      {/* Full-width radar chart */}
      <div className="mb-8">
        <SectionTitle>Your Shape</SectionTitle>
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-6">
          <RadarChart scores={scores} size={520} />
        </div>
      </div>

      <Divider />

      {/* Quadrant scores */}
      <div className="mb-8">
        <SectionTitle>Quadrant Breakdown</SectionTitle>
        <div className="space-y-5">
          {(Object.keys(quadrantScores) as QuadrantKey[]).map((q) => (
            <ScoreBar key={q} label={QUADRANT_LABELS[q].label} score={quadrantScores[q]} color={Q_COLORS[q]} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
            <p className="text-[10px] font-sans font-semibold tracking-widest text-[#2A6B6B] uppercase mb-3">Your Spikes</p>
            {topThree.map((c) => (
              <div key={c.id} className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: Q_COLORS[c.quadrant] }} />
                <span className="text-sm text-[var(--fg)]">{c.label}</span>
              </div>
            ))}
          </div>
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
            <p className="text-[10px] font-sans font-semibold tracking-widest text-[#C1633A] uppercase mb-3">Focus Areas</p>
            {bottomThree.map((c) => (
              <div key={c.id} className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--border)]" />
                <span className="text-sm text-[var(--fg)]">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* What this means */}
      <div className="mb-8">
        <SectionTitle>What This Means</SectionTitle>
        <p className="text-base text-[var(--fg-muted)] leading-relaxed mb-5">{archetype.strengths_detail}</p>
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-5">
          <p className="text-[10px] font-sans font-semibold tracking-widest text-[#C49A3C] uppercase mb-2">Growth Areas</p>
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{archetype.growth_areas}</p>
        </div>
      </div>

      <Divider />

      {/* Career advice */}
      <div className="mb-8">
        <SectionTitle>Career Advice</SectionTitle>
        <p className="text-base text-[var(--fg-muted)] leading-relaxed mb-4">{advice}</p>
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-5">
          <p className="text-[10px] font-sans font-semibold tracking-widest text-[var(--fg-subtle)] uppercase mb-2">Best-fit companies</p>
          <p className="text-sm text-[var(--fg-muted)]">{archetype.companies}</p>
        </div>
      </div>

      <Divider />

      {/* Spike questions */}
      <div className="mb-8">
        <SectionTitle>Interview Questions — Your Spike</SectionTitle>
        <p className="text-sm text-[var(--fg-subtle)] mb-5">Questions that play to your strengths. Prepare a sharp story for each.</p>
        <ol className="space-y-4">
          {archetype.interview_spike_questions.map((q, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border)] text-xs font-sans font-semibold text-[var(--fg-subtle)] flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-[var(--fg)] leading-relaxed pt-0.5">{q}</p>
            </li>
          ))}
        </ol>
      </div>

      <Divider />

      {/* Landing questions */}
      <div className="mb-8">
        <SectionTitle>Interview Questions — Land the Job</SectionTitle>
        <p className="text-sm text-[var(--fg-subtle)] mb-5">Must-prepare for any PM role. Nail these and you are in.</p>
        <ol className="space-y-4">
          {archetype.interview_landing_questions.map((q, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border)] text-xs font-sans font-semibold text-[var(--fg-subtle)] flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-[var(--fg)] leading-relaxed pt-0.5">{q}</p>
            </li>
          ))}
        </ol>
      </div>

      <Divider />

      {/* Email capture */}
      <div className="mb-8">
        <SectionTitle>Get Your Full Report</SectionTitle>
        <p className="text-base text-[var(--fg-muted)] mb-5">
          Receive a PDF with your shape, archetype breakdown, and full interview prep guide — yours to keep and revisit.
        </p>
        {emailSent ? (
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-5 text-center">
            <p className="text-sm font-semibold text-[var(--fg)]">✓ Check your inbox — report is on its way.</p>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--fg)] placeholder-[var(--fg-subtle)] focus:outline-none focus:border-[var(--fg-muted)] font-sans"
            />
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-3 bg-[var(--fg)] text-[var(--bg)] rounded-xl text-sm font-semibold font-sans hover:opacity-80 disabled:opacity-40 transition-opacity"
            >
              {sending ? "Sending…" : "Send"}
            </button>
          </form>
        )}
        {emailError && <p className="text-[#C1633A] text-xs mt-2 font-sans">{emailError}</p>}
      </div>

      {/* Reset */}
      <div className="text-center pb-16">
        <button onClick={onReset} className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg-muted)] font-sans transition-colors">
          ← Start over
        </button>
      </div>
    </div>
  );
}
