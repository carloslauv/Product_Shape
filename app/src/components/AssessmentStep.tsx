"use client";

import React from "react";
import { RADAR_COMPETENCIES, QuadrantKey } from "@/lib/archetypes";

interface AssessmentStepProps {
  scores: Record<string, number>;
  onChange: (id: string, value: number) => void;
}

const QUADRANT_INFO: Record<QuadrantKey, { label: string; color: string; border: string }> = {
  execution:   { label: "Product Execution",   color: "#FF6B4A", border: "" },
  insight:     { label: "Customer Insight",     color: "#FFC857", border: "" },
  strategy:    { label: "Product Strategy",     color: "#00C9B1", border: "" },
  influencing: { label: "Influencing People",   color: "#9370DB", border: "" },
};

const COMPETENCY_DESCRIPTIONS: Record<string, string> = {
  feature_specification:   "Gather requirements and define functionality in a clear, actionable spec the team can build from.",
  product_delivery:        "Work with engineering & design to iteratively and quickly ship functionality against defined goals.",
  quality_assurance:       "Identify, prioritize and resolve quality issues across devices, countries and use cases.",
  fluency_with_data:       "Turn data into actionable insight; chase the causal 'why' behind the metric, not just the report.",
  voice_of_customer:       "Deeply understand customer needs and pain points through qualitative and quantitative research.",
  ux_design:               "Shape intuitive, delightful user experiences that solve real problems elegantly.",
  business_outcome:        "Own the business results your product drives — revenue, retention, growth, efficiency.",
  product_vision:          "Define a compelling north star and translate it into a roadmap the team believes in.",
  strategic_impact:        "Connect product decisions to company strategy and create durable competitive advantage.",
  stakeholder_management:  "Align and communicate effectively with cross-functional partners, executives, and customers.",
  team_leadership:         "Inspire, coach, and unblock your team to do their best work.",
  managing_up:             "Proactively inform, influence, and build trust with leadership.",
};

const QUADRANT_ORDER: QuadrantKey[] = ["execution", "insight", "strategy", "influencing"];

export default function AssessmentStep({ scores, onChange }: AssessmentStepProps) {
  const grouped = QUADRANT_ORDER.reduce((acc, q) => {
    acc[q] = RADAR_COMPETENCIES.filter((c) => c.quadrant === q);
    return acc;
  }, {} as Record<QuadrantKey, typeof RADAR_COMPETENCIES>);

  return (
    <div className="space-y-10">
      {QUADRANT_ORDER.map((quadrant) => {
        const info = QUADRANT_INFO[quadrant];
        const competencies = grouped[quadrant];
        return (
          <div key={quadrant}>
            {/* Quadrant header */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-px flex-1" style={{ backgroundColor: info.color, opacity: 0.4 }} />
              <span className="text-xs font-semibold tracking-widest font-sans" style={{ color: info.color }}>
                {info.label.toUpperCase()}
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: info.color, opacity: 0.4 }} />
            </div>

            <div className="space-y-6">
              {competencies.map((c) => {
                const score = scores[c.id] ?? 1;
                return (
                  <div key={c.id} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-5">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-bold text-[var(--fg)] text-base">{c.label}</p>
                        <p className="text-sm text-[var(--fg-muted)] mt-0.5 leading-relaxed">
                          {COMPETENCY_DESCRIPTIONS[c.id]}
                        </p>
                      </div>
                      <span className="text-2xl font-bold flex-shrink-0" style={{ color: info.color }}>
                        {score}
                      </span>
                    </div>

                    {/* 1–5 buttons */}
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((level) => {
                        const active = score === level;
                        return (
                          <button
                            key={level}
                            onClick={() => onChange(c.id, level)}
                            className={`flex-1 py-3 rounded-lg text-sm font-semibold font-sans transition-all duration-100 border ${
                              active
                                ? "border-transparent text-white"
                                : "bg-transparent border-[var(--border)] text-[var(--fg-subtle)] hover:border-[var(--fg-subtle)]"
                            }`}
                            style={active ? { backgroundColor: info.color, borderColor: info.color } : {}}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-1.5 px-0.5">
                      <span className="text-[10px] font-sans font-medium text-[var(--fg-subtle)] tracking-wider">NEEDS FOCUS</span>
                      <span className="text-[10px] font-sans font-medium text-[var(--fg-subtle)] tracking-wider">ON TRACK</span>
                      <span className="text-[10px] font-sans font-medium text-[var(--fg-subtle)] tracking-wider">OUTPERFORM</span>
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
