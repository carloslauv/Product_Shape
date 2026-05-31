"use client";

import React, { useState, useCallback } from "react";
import RadarChart from "@/components/RadarChart";
import AssessmentStep from "@/components/AssessmentStep";
import ResultsView from "@/components/ResultsView";
import { RADAR_COMPETENCIES, matchArchetype } from "@/lib/archetypes";

type Step = "intro" | "assess" | "results";
type Context = "landing" | "current_pm" | "crack_pm";

const DEFAULT_SCORES = Object.fromEntries(RADAR_COMPETENCIES.map((c) => [c.id, 1]));

// Static preview scores for the intro page radar
const PREVIEW_SCORES: Record<string, number> = {
  fluency_with_data: 3,
  voice_of_customer: 2,
  ux_design: 2,
  business_outcome: 2,
  product_vision: 3,
  strategic_impact: 2,
  stakeholder_management: 1,
  team_leadership: 2,
  managing_up: 1,
  feature_specification: 3,
  product_delivery: 2,
  quality_assurance: 3,
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
  const progress = Math.round((completedCount / totalCount) * 100);

  const archetype = matchArchetype(scores);

  function reset() {
    setScores(DEFAULT_SCORES);
    setStep("intro");
  }

  if (step === "results") {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">PM</span>
              </div>
              <span className="font-bold text-gray-800 text-sm">Product Shape</span>
            </div>
            <span className="text-xs text-gray-400">Framework by Ravi Mehta</span>
          </div>
          <ResultsView scores={scores} archetype={archetype} onReset={reset} context={context} />
        </div>
      </main>
    );
  }

  if (step === "assess") {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setStep("intro")} className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
              ← Back
            </button>
            <span className="text-xs text-gray-400">Framework by Ravi Mehta</span>
          </div>

          <div className="sticky top-4 z-10 mb-6">
            <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <RadarChart scores={scores} onScoreChange={handleScoreChange} size={160} interactive={false} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-gray-600">Progress</span>
                    <span className="text-xs text-gray-400">{completedCount}/{totalCount} rated</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Use the buttons below to rate each competency</p>
                  {completedCount === totalCount && (
                    <button
                      onClick={() => setStep("results")}
                      className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors"
                    >
                      See My Shape →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-2">Rate Your Competencies</h2>
          <p className="text-sm text-gray-500 mb-6">
            Be honest — this is most useful when you are candid about where you are today.
          </p>

          <AssessmentStep scores={scores} onChange={handleScoreChange} />

          <div className="mt-6 pb-8">
            <button
              onClick={() => setStep("results")}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              See My Product Shape →
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">
              You can adjust ratings anytime — results update instantly
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">PM</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">Product Shape</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-3 leading-tight">
            What is Your<br />
            <span className="text-indigo-600">Product Shape?</span>
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Assess yourself on the 12 PM competencies, discover your archetype, and get a personalized roadmap to land your next role.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Framework by{" "}
            <a href="https://www.ravi-mehta.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
              Ravi Mehta
            </a>
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <RadarChart scores={PREVIEW_SCORES} interactive={false} size={300} />
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3 text-center">I want advice for:</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: "current_pm" as Context, label: "Landing a new PM role", sub: "You are already a PM looking to level up or switch" },
              { id: "landing" as Context, label: "Grow as a PM", sub: "You want to understand your strengths and improve" },
              { id: "crack_pm" as Context, label: "Breaking into Product", sub: "You are transitioning into PM from another field" },
            ].map(({ id, label, sub }) => (
              <button
                key={id}
                onClick={() => setContext(id)}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all ${
                  context === id
                    ? "border-indigo-500 bg-indigo-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      context === id ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{label}</p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStep("assess")}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-base hover:bg-indigo-700 transition-colors shadow-md"
        >
          Start Assessment →
        </button>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "🎯", title: "Rate yourself", desc: "12 competencies, 3 levels each" },
            { icon: "📊", title: "See your shape", desc: "Radar chart shows your profile" },
            { icon: "🗺️", title: "Get your roadmap", desc: "Archetype + interview prep" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="font-semibold text-gray-800 text-xs">{title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Takes about 3 minutes · Free · No login required
        </p>
      </div>
    </main>
  );
}
