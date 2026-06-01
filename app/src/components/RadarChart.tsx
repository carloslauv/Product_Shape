"use client";

import React from "react";
import { RADAR_COMPETENCIES, QuadrantKey } from "@/lib/archetypes";

interface RadarChartProps {
  scores: Record<string, number>;
  size?: number;
}

const QUADRANT_COLORS: Record<QuadrantKey, { fill: string; dot: string }> = {
  execution: { fill: "rgba(193,99,58,0.12)", dot: "#C1633A" },
  insight:   { fill: "rgba(196,154,60,0.12)", dot: "#C49A3C" },
  strategy:  { fill: "rgba(42,107,107,0.12)", dot: "#2A6B6B" },
  influencing:{ fill: "rgba(58,95,138,0.12)", dot: "#3A5F8A" },
};

const MAX_SCORE = 5;
const MIN_SCORE = 1;
const N = 12;
const LEVELS = 5;

function polarToXY(angleDeg: number, r: number, cx: number, cy: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function RadarChart({ scores, size = 480 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.36;
  const labelR = maxR + 32;
  const angleStep = 360 / N;

  function scoreToR(score: number) {
    return ((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * maxR;
  }

  // Ring points for each level
  function ringPoints(level: number) {
    const r = (level / LEVELS) * maxR;
    return Array.from({ length: N }, (_, i) => polarToXY(i * angleStep, r, cx, cy));
  }

  // User shape
  const shapePoints = RADAR_COMPETENCIES.map((c, i) => {
    const score = scores[c.id] ?? MIN_SCORE;
    return polarToXY(i * angleStep, scoreToR(score), cx, cy);
  });

  const shapeD = shapePoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + "Z";

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block", maxWidth: size }}
    >
      {/* Quadrant sector backgrounds */}
      {([
        { q: "execution" as QuadrantKey,   start: 9, end: 11 },
        { q: "insight" as QuadrantKey,     start: 0, end: 2  },
        { q: "strategy" as QuadrantKey,    start: 3, end: 5  },
        { q: "influencing" as QuadrantKey, start: 6, end: 8  },
      ]).map(({ q, start, end }) => {
        const outerPts = Array.from({ length: end - start + 1 }, (_, k) =>
          polarToXY((start + k) * angleStep, maxR, cx, cy)
        );
        const d =
          `M${cx},${cy} ` +
          outerPts.map((p, i) => `${i === 0 ? "L" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") +
          "Z";
        return <path key={q} d={d} fill={QUADRANT_COLORS[q].fill} />;
      })}

      {/* Grid rings */}
      {Array.from({ length: LEVELS }, (_, i) => {
        const level = i + 1;
        const pts = ringPoints(level);
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + "Z";
        const isOuter = level === LEVELS;
        return (
          <path
            key={level}
            d={d}
            fill="none"
            stroke={isOuter ? "#C8BFB2" : "#DDD7CE"}
            strokeWidth={isOuter ? 1.5 : 0.75}
            strokeDasharray={isOuter ? "none" : "3,3"}
          />
        );
      })}

      {/* Axis lines */}
      {RADAR_COMPETENCIES.map((_, i) => {
        const outer = polarToXY(i * angleStep, maxR, cx, cy);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={outer.x.toFixed(2)} y2={outer.y.toFixed(2)}
            stroke="#DDD7CE"
            strokeWidth={0.75}
          />
        );
      })}

      {/* Ring level labels (on top axis) */}
      {[
        { level: 1, label: "NEEDS FOCUS" },
        { level: 3, label: "ON TRACK" },
        { level: 5, label: "OUTPERFORM" },
      ].map(({ level, label }) => {
        const r = (level / LEVELS) * maxR;
        return (
          <text key={label} x={cx} y={cy - r + 9} textAnchor="middle" fontSize={7.5} fill="#A89B8C" fontFamily="sans-serif" letterSpacing="0.6" fontWeight="500">
            {label}
          </text>
        );
      })}

      {/* Filled user shape */}
      <path d={shapeD} fill="rgba(28,24,20,0.08)" stroke="#1C1814" strokeWidth={1.5} strokeLinejoin="round" />

      {/* Dots */}
      {RADAR_COMPETENCIES.map((c, i) => {
        const score = scores[c.id] ?? MIN_SCORE;
        const pos = polarToXY(i * angleStep, scoreToR(score), cx, cy);
        const color = QUADRANT_COLORS[c.quadrant].dot;
        return (
          <circle key={c.id} cx={pos.x.toFixed(2)} cy={pos.y.toFixed(2)} r={5} fill={color} stroke="white" strokeWidth={1.5} />
        );
      })}

      {/* Labels */}
      {RADAR_COMPETENCIES.map((c, i) => {
        const angle = i * angleStep;
        const pos = polarToXY(angle, labelR, cx, cy);
        const rad = ((angle - 90) * Math.PI) / 180;
        const cosA = Math.cos(rad);
        const anchor = cosA < -0.15 ? "end" : cosA > 0.15 ? "start" : "middle";

        const words = c.label.split(" ");
        const lines: string[] = [];
        let cur = "";
        for (const w of words) {
          const test = cur ? `${cur} ${w}` : w;
          if (test.length > 14 && cur) { lines.push(cur); cur = w; }
          else cur = test;
        }
        if (cur) lines.push(cur);

        const color = QUADRANT_COLORS[c.quadrant].dot;

        return (
          <text key={c.id} textAnchor={anchor} fontSize={10} fontFamily="sans-serif" fontWeight="500" fill={color}>
            {lines.map((line, li) => (
              <tspan key={li} x={pos.x.toFixed(2)} y={(pos.y + li * 13 - ((lines.length - 1) * 6)).toFixed(2)}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}
