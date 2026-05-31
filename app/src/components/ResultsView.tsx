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

const LEVEL_BAR_COLORS = ["", "bg-red-400", "bg-yellow-400", "bg-green-500"];

function QuadrantBar({ label, score, color }: { label: string; score: number; color: string }) {
  const pct = ((score - 1) / 2) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-gray-600">{label}</span>
        <span className="text-xs text-gray-400">{scoreToLevel(score)}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function ResultsView({ scores, archetype, onReset, context }: ResultsViewProps) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("archetype");

  const quadrantScores = getQuadrantScores(scores);

  const sortedCompetencies = [...RADAR_COMPETENCIES].sort(
    (a, b) => (scores[b.id] || 1) - (scores[a.id] || 1)
  );
  const topThree = sortedCompetencies.slice(0, 3);
  const bottomThree = sortedCompetencies.slice(-3).reverse();

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
      if (res.ok) {
        setEmailSent(true);
      } else {
        setEmailError("Something went wrong. Try again.");
      }
    } catch {
      setEmailError("Network error. Try again.");
    }
    setSending(false);
  }

  const sectionClass = "rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden mb-4";
  const sectionHeaderClass =
    "w-full px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors";

  function Section({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) {
    const open = expandedSection === id;
    return (
      <div className={sectionClass}>
        <button className={sectionHeaderClass} onClick={() => setExpandedSection(open ? null : id)}>
          <span className="font-bold text-gray-800">{title}</span>
          <span className="text-gray-400 text-lg">{open ? "−" : "+"}</span>
        </button>
        {open && <div className="px-6 pb-6">{children}</div>}
      </div>
    );
  }

  const advice =
    context === "landing"
      ? archetype.career_advice
      : context === "crack_pm"
      ? archetype.pm_crack_advice
      : archetype.career_advice;

  return (
    <div className="space-y-6">
      {/* Hero archetype card */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{archetype.emoji}</div>
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-1">Your PM Archetype</p>
            <h2 className="text-2xl font-bold">{archetype.name}</h2>
            <p className="text-indigo-100 text-sm mt-1 italic">"{archetype.tagline}"</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-indigo-100 leading-relaxed">{archetype.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {archetype.roles.map((r) => (
            <span key={r} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Radar chart */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 flex flex-col items-center">
        <h3 className="font-bold text-gray-800 mb-2 text-sm">Your Shape</h3>
        <RadarChart scores={scores} interactive={false} size={360} />
      </div>

      {/* Quadrant scores */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4 text-sm">Quadrant Breakdown</h3>
        <div className="space-y-4">
          {(Object.keys(quadrantScores) as QuadrantKey[]).map((q) => (
            <QuadrantBar
              key={q}
              label={QUADRANT_LABELS[q].label}
              score={quadrantScores[q]}
              color={QUADRANT_LABELS[q].color}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-xs font-bold text-green-600 mb-2">🚀 Your Spikes</p>
            {topThree.map((c) => (
              <div key={c.id} className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: QUADRANT_LABELS[c.quadrant].color }} />
                <span className="text-xs text-gray-700">{c.label}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold text-red-500 mb-2">🎯 Focus Areas</p>
            {bottomThree.map((c) => (
              <div key={c.id} className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="text-xs text-gray-700">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable sections */}
      <Section id="archetype" title="💡 What This Means For You">
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{archetype.strengths_detail}</p>
        <div className="bg-amber-50 rounded-xl p-4">
          <p className="text-xs font-bold text-amber-700 mb-1">Growth Areas</p>
          <p className="text-sm text-amber-800 leading-relaxed">{archetype.growth_areas}</p>
        </div>
      </Section>

      <Section id="career" title="🎯 Career Advice">
        <p className="text-sm text-gray-600 leading-relaxed">{advice}</p>
        <div className="mt-3 bg-indigo-50 rounded-xl p-4">
          <p className="text-xs font-bold text-indigo-700 mb-1">Best-fit companies / orgs</p>
          <p className="text-sm text-indigo-800">{archetype.companies}</p>
        </div>
      </Section>

      <Section id="spike_prep" title="🎤 Interview Questions for Your Spike">
        <p className="text-xs text-gray-400 mb-3">
          These play to your strengths — prepare compelling stories for each.
        </p>
        <ol className="space-y-3">
          {archetype.interview_spike_questions.map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{q}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="land_job" title="🏆 Questions to Land the Job">
        <p className="text-xs text-gray-400 mb-3">
          These are the must-prepare questions for any PM role — nail these and you're in.
        </p>
        <ol className="space-y-3">
          {archetype.interview_landing_questions.map((q, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{q}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Email capture */}
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-6">
        <h3 className="font-bold text-indigo-900 mb-1">📬 Get Your Full Report</h3>
        <p className="text-sm text-indigo-700 mb-4">
          We'll send you a PDF with your shape, archetype breakdown, and personalized interview prep guide.
        </p>
        {emailSent ? (
          <div className="bg-green-100 rounded-xl p-4 text-center">
            <p className="text-green-700 font-semibold text-sm">✅ Check your inbox! Report is on its way.</p>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-indigo-200 bg-white text-sm focus:outline-none focus:border-indigo-400"
            />
            <button
              type="submit"
              disabled={sending}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60 transition-colors"
            >
              {sending ? "Sending…" : "Send"}
            </button>
          </form>
        )}
        {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
      </div>

      {/* Reset */}
      <div className="text-center pb-8">
        <button
          onClick={onReset}
          className="text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
