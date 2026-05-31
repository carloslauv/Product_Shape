"use client";

import React from "react";
import { RADAR_COMPETENCIES, QUADRANT_LABELS, QuadrantKey } from "@/lib/archetypes";

interface RadarChartProps {
  scores: Record<string, number>;
  onScoreChange?: (id: string, value: number) => void;
  size?: number;
  interactive?: boolean;
}

const LEVELS = 3;
const CENTER_OFFSET = 0.15; // inner dead zone

function polarToXY(angle: number, radius: number, cx: number, cy: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export default function RadarChart({ scores, onScoreChange, size = 420, interactive = true }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const n = RADAR_COMPETENCIES.length;
  const angleStep = 360 / n;

  function getRadius(score: number): number {
    const normalized = (score - 1) / 2; // 1-3 → 0-1
    return CENTER_OFFSET * maxRadius + normalized * maxRadius * (1 - CENTER_OFFSET);
  }

  // Build filled polygon points from scores
  const polygonPoints = RADAR_COMPETENCIES.map((c, i) => {
    const score = scores[c.id] || 1;
    const r = getRadius(score);
    const angle = i * angleStep;
    return polarToXY(angle, r, cx, cy);
  });

  // Grid rings
  const rings = [1, 2, 3];

  // Quadrant background sectors
  const quadrantColors: Record<QuadrantKey, string> = {
    insight: "rgba(234,179,8,0.08)",
    strategy: "rgba(6,182,212,0.08)",
    influencing: "rgba(59,130,246,0.08)",
    execution: "rgba(249,115,22,0.08)",
  };

  function getSectorPath(startIdx: number, endIdx: number, inner: number, outer: number) {
    const pts = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const angle = i * angleStep;
      pts.push(polarToXY(angle, outer, cx, cy));
    }
    for (let i = endIdx; i >= startIdx; i--) {
      const angle = i * angleStep;
      pts.push(polarToXY(angle, inner, cx, cy));
    }
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
  }

  function handleDotClick(id: string, currentScore: number) {
    if (!onScoreChange) return;
    const next = currentScore >= 3 ? 1 : currentScore + 1;
    onScoreChange(id, next);
  }

  const labelOffset = 28;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Quadrant backgrounds */}
        {[
          { quadrant: "insight" as QuadrantKey, start: 0, end: 2 },
          { quadrant: "strategy" as QuadrantKey, start: 3, end: 5 },
          { quadrant: "influencing" as QuadrantKey, start: 6, end: 8 },
          { quadrant: "execution" as QuadrantKey, start: 9, end: 11 },
        ].map(({ quadrant, start, end }) => (
          <path
            key={quadrant}
            d={getSectorPath(start, end, 0, maxRadius)}
            fill={quadrantColors[quadrant]}
            stroke="none"
          />
        ))}

        {/* Grid rings */}
        {rings.map((level) => {
          const r = getRadius(level);
          const pts = Array.from({ length: n }, (_, i) => {
            const angle = i * angleStep;
            return polarToXY(angle, r, cx, cy);
          });
          const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";
          return (
            <path
              key={level}
              d={d}
              fill="none"
              stroke={level === 3 ? "#d1d5db" : "#e5e7eb"}
              strokeWidth={level === 3 ? 1.5 : 1}
              strokeDasharray={level === 3 ? "none" : "4,3"}
            />
          );
        })}

        {/* Axis lines */}
        {RADAR_COMPETENCIES.map((_, i) => {
          const angle = i * angleStep;
          const outer = polarToXY(angle, maxRadius, cx, cy);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          );
        })}

        {/* Level labels inside chart */}
        {[
          { level: 1, text: "NEEDS FOCUS" },
          { level: 2, text: "ON TRACK" },
          { level: 3, text: "OUTPERFORM" },
        ].map(({ level, text }) => (
          <text
            key={text}
            x={cx}
            y={cy - getRadius(level) + (level === 1 ? 12 : level === 2 ? 10 : 8)}
            textAnchor="middle"
            fontSize={level === 3 ? 8 : 7}
            fill="#9ca3af"
            fontWeight="500"
            letterSpacing="0.5"
          >
            {text}
          </text>
        ))}

        {/* Filled shape */}
        <path
          d={polygonPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z"}
          fill="rgba(99,102,241,0.2)"
          stroke="#6366f1"
          strokeWidth={2}
        />

        {/* Dots */}
        {RADAR_COMPETENCIES.map((c, i) => {
          const score = scores[c.id] || 1;
          const r = getRadius(score);
          const angle = i * angleStep;
          const pos = polarToXY(angle, r, cx, cy);
          const quadColor = QUADRANT_LABELS[c.quadrant].color;
          return (
            <circle
              key={c.id}
              cx={pos.x}
              cy={pos.y}
              r={interactive ? 7 : 5}
              fill={quadColor}
              stroke="white"
              strokeWidth={2}
              className={interactive ? "cursor-pointer" : ""}
              onClick={() => handleDotClick(c.id, score)}
            />
          );
        })}

        {/* Labels */}
        {RADAR_COMPETENCIES.map((c, i) => {
          const angle = i * angleStep;
          const pos = polarToXY(angle, maxRadius + labelOffset, cx, cy);
          const rad = ((angle - 90) * Math.PI) / 180;
          const isLeft = Math.cos(rad) < -0.1;
          const isRight = Math.cos(rad) > 0.1;
          const anchor = isLeft ? "end" : isRight ? "start" : "middle";
          const words = c.label.split(" ");
          const lines: string[] = [];
          let current = "";
          words.forEach((w) => {
            if ((current + " " + w).length > 16) {
              if (current) lines.push(current);
              current = w;
            } else {
              current = current ? current + " " + w : w;
            }
          });
          if (current) lines.push(current);

          return (
            <text
              key={c.id}
              x={pos.x}
              y={pos.y - ((lines.length - 1) * 8) / 2}
              textAnchor={anchor}
              fontSize={9.5}
              fontWeight="600"
              fill="#374151"
            >
              {lines.map((line, li) => (
                <tspan key={li} x={pos.x} dy={li === 0 ? 0 : 11}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })}

        {/* Quadrant labels */}
        {[
          { quadrant: "insight" as QuadrantKey, angle: 30, radiusFactor: 0.55 },
          { quadrant: "strategy" as QuadrantKey, angle: 120, radiusFactor: 0.55 },
          { quadrant: "influencing" as QuadrantKey, angle: 210, radiusFactor: 0.55 },
          { quadrant: "execution" as QuadrantKey, angle: 300, radiusFactor: 0.55 },
        ].map(({ quadrant, angle, radiusFactor }) => {
          const pos = polarToXY(angle, maxRadius * radiusFactor, cx, cy);
          const info = QUADRANT_LABELS[quadrant];
          return (
            <text
              key={quadrant}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              fontSize={8}
              fontWeight="700"
              fill={info.color}
              opacity={0.7}
              letterSpacing="0.8"
            >
              {info.label.toUpperCase()}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
