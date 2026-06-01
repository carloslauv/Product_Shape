"use client";

import React, { useState } from "react";
import RadarChart from "./RadarChart";
import {
  Archetype, QUADRANT_LABELS, QuadrantKey,
  getQuadrantScores, scoreToLevel, RADAR_COMPETENCIES, encodeScores,
} from "@/lib/archetypes";

interface ResultsViewProps {
  scores: Record<string, number>;
  archetype: Archetype;
  onReset: () => void;
  context: "landing" | "current_pm" | "crack_pm";
}

const Q_COLORS: Record<QuadrantKey, string> = {
  execution:   "#FF6B4A",
  insight:     "#FFC857",
  strategy:    "#00C9B1",
  influencing: "#9370DB",
};

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const pct = ((score - 1) / 4) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-[var(--fg)]">{label}</span>
        <span className="text-xs font-sans text-[var(--fg-subtle)]">{scoreToLevel(score)}</span>
      </div>
      <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--border)] my-8" />;
}

function SectionLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-[10px] font-sans font-semibold tracking-widest uppercase mb-4" style={{ color: color ?? "var(--fg-subtle)" }}>
      {children}
    </p>
  );
}

function QuestionList({ questions, accent }: { questions: string[]; accent: string }) {
  return (
    <ol className="space-y-4">
      {questions.map((q, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex-shrink-0 w-6 h-6 rounded-full border text-xs font-sans font-semibold flex items-center justify-center" style={{ borderColor: accent, color: accent }}>
            {i + 1}
          </span>
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed pt-0.5">{q}</p>
        </li>
      ))}
    </ol>
  );
}

export default function ResultsView({ scores, archetype, onReset, context }: ResultsViewProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [copied, setCopied] = useState(false);

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

  function handleShare() {
    const encoded = encodeScores(scores);
    const url = `${window.location.origin}/shared?s=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Archetype hero */}
      <div className="mb-8">
        <SectionLabel>Your PM Archetype</SectionLabel>
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{archetype.emoji}</span>
          <div>
            <h2 className="text-3xl font-bold text-[var(--fg)] leading-tight">{archetype.name}</h2>
            <p className="text-[var(--fg-muted)] italic mt-1 text-sm">"{archetype.tagline}"</p>
          </div>
        </div>
        <p className="text-base text-[var(--fg-muted)] leading-relaxed mb-4">{archetype.description}</p>
        <div className="flex flex-wrap gap-2">
          {archetype.roles.map((r) => (
            <span key={r} className="text-xs font-sans font-medium px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--fg-muted)]">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Share button */}
      <button
        onClick={handleShare}
        className="w-full mb-8 py-3 rounded-xl border border-[var(--border)] text-sm font-sans font-semibold text-[var(--fg-muted)] hover:border-[var(--fg-subtle)] hover:text-[var(--fg)] transition-all flex items-center justify-center gap-2"
      >
        {copied ? "✓ Link copied!" : "↗ Share these results"}
      </button>

      <Divider />

      {/* Full-width radar */}
      <div className="mb-8">
        <SectionLabel>Your Shape</SectionLabel>
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] p-6">
          <RadarChart scores={scores} size={520} />
        </div>
      </div>

      <Divider />

      {/* Quadrant scores */}
      <div className="mb-8">
        <SectionLabel>Quadrant Breakdown</SectionLabel>
        <div className="space-y-5 mb-8">
          {(Object.keys(quadrantScores) as QuadrantKey[]).map((q) => (
            <ScoreBar key={q} label={QUADRANT_LABELS[q].label} score={quadrantScores[q]} color={Q_COLORS[q]} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
            <SectionLabel color={Q_COLORS.strategy}>Your Spikes</SectionLabel>
            {topThree.map((c) => (
              <div key={c.id} className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: Q_COLORS[c.quadrant] }} />
                <span className="text-sm text-[var(--fg)]">{c.label}</span>
              </div>
            ))}
          </div>
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4">
            <SectionLabel color={Q_COLORS.execution}>Focus Areas</SectionLabel>
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

      {/* Strengths & growth */}
      <div className="mb-8">
        <SectionLabel>What This Means</SectionLabel>
        <p className="text-base text-[var(--fg-muted)] leading-relaxed mb-5">{archetype.strengths_detail}</p>
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-5">
          <SectionLabel color={Q_COLORS.insight}>Growth Areas</SectionLabel>
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{archetype.growth_areas}</p>
        </div>
      </div>

      <Divider />

      {/* Career advice */}
      <div className="mb-8">
        <SectionLabel>Career Advice</SectionLabel>
        <p className="text-base text-[var(--fg-muted)] leading-relaxed">{advice}</p>
      </div>

      <Divider />

      {/* 10 company recommendations */}
      <div className="mb-8">
        <SectionLabel>Where You'd Thrive</SectionLabel>
        <p className="text-sm text-[var(--fg-subtle)] mb-5">10 companies that match your profile — and why.</p>
        <div className="space-y-3">
          {archetype.company_recs.map((c, i) => (
            <div key={c.name} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-4 flex gap-4">
              <span className="flex-shrink-0 text-[10px] font-sans font-semibold text-[var(--fg-subtle)] w-5 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-bold text-[var(--fg)] text-sm">{c.name}</p>
                <p className="text-xs text-[var(--fg-muted)] mt-0.5 leading-relaxed">{c.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Spike questions */}
      <div className="mb-8">
        <SectionLabel color={Q_COLORS.strategy}>Interview — Play to Your Strengths</SectionLabel>
        <p className="text-sm text-[var(--fg-subtle)] mb-5">Questions where you should shine. Prepare a crisp, specific story for each.</p>
        <QuestionList questions={archetype.interview_spike_questions} accent={Q_COLORS.strategy} />
      </div>

      <Divider />

      {/* Weakness questions */}
      <div className="mb-8">
        <SectionLabel color={Q_COLORS.execution}>Interview — Cover Your Gaps</SectionLabel>
        <p className="text-sm text-[var(--fg-subtle)] mb-5">
          These target your weaker areas — interviewers will probe here. Prepare honest, growth-oriented answers.
        </p>
        <QuestionList questions={archetype.interview_weakness_questions} accent={Q_COLORS.execution} />
      </div>

      <Divider />

      {/* Landing questions */}
      <div className="mb-8">
        <SectionLabel color={Q_COLORS.insight}>Interview — Land the Job</SectionLabel>
        <p className="text-sm text-[var(--fg-subtle)] mb-5">Must-prepare for any PM role, regardless of archetype.</p>
        <QuestionList questions={archetype.interview_landing_questions} accent={Q_COLORS.insight} />
      </div>

      <Divider />

      {/* Email capture */}
      <div className="mb-8">
        <SectionLabel>Get Your Full Report</SectionLabel>
        <p className="text-base text-[var(--fg-muted)] mb-5">
          Receive a PDF with your shape, full breakdown, and interview prep guide — yours to keep and revisit.
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
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm text-[var(--fg)] placeholder-[var(--fg-subtle)] focus:outline-none focus:border-[var(--fg-subtle)] font-sans"
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
        {emailError && <p className="text-[#FF6B4A] text-xs mt-2 font-sans">{emailError}</p>}
      </div>

      <div className="text-center pb-16">
        <button onClick={onReset} className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg-muted)] font-sans transition-colors">
          ← Start over
        </button>
      </div>
    </div>
  );
}
