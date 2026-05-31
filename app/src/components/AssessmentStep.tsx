"use client";

import React from "react";
import { RADAR_COMPETENCIES, QUADRANT_LABELS, QuadrantKey } from "@/lib/archetypes";

interface AssessmentStepProps {
  scores: Record<string, number>;
  onChange: (id: string, value: number) => void;
}

const LEVEL_LABELS = ["", "Needs Focus", "On Track", "Outperform"];
const LEVEL_DESCRIPTIONS = [
  "",
  "This is an area where you have limited experience or need significant development.",
  "You're competent here — you do this reliably, but there's still room to grow.",
  "This is a clear strength — you consistently exceed expectations here.",
];

const LEVEL_COLORS = ["", "bg-red-100 text-red-700 border-red-200", "bg-yellow-100 text-yellow-700 border-yellow-200", "bg-green-100 text-green-700 border-green-200"];

const QUADRANT_ORDER: QuadrantKey[] = ["execution", "insight", "strategy", "influencing"];

export default function AssessmentStep({ scores, onChange }: AssessmentStepProps) {
  const grouped = QUADRANT_ORDER.reduce((acc, q) => {
    acc[q] = RADAR_COMPETENCIES.filter((c) => c.quadrant === q);
    return acc;
  }, {} as Record<QuadrantKey, typeof RADAR_COMPETENCIES>);

  return (
    <div className="space-y-8">
      {QUADRANT_ORDER.map((quadrant) => {
        const info = QUADRANT_LABELS[quadrant];
        const competencies = grouped[quadrant];
        return (
          <div key={quadrant} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: info.bg }}>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
              <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase">{info.label}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {competencies.map((c) => {
                const score = scores[c.id] || 1;
                return (
                  <div key={c.id} className="px-6 py-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{c.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{LEVEL_DESCRIPTIONS[score]}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${LEVEL_COLORS[score]}`}>
                        {LEVEL_LABELS[score]}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((level) => (
                        <button
                          key={level}
                          onClick={() => onChange(c.id, level)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-150 ${
                            score === level
                              ? level === 1
                                ? "bg-red-500 border-red-500 text-white shadow-sm"
                                : level === 2
                                ? "bg-yellow-400 border-yellow-400 text-white shadow-sm"
                                : "bg-green-500 border-green-500 text-white shadow-sm"
                              : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {LEVEL_LABELS[level]}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
