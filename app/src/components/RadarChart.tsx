"use client";

import React, { useRef, useCallback } from "react";
import { RADAR_COMPETENCIES, QuadrantKey } from "@/lib/archetypes";

interface RadarChartProps {
  scores: Record<string, number>;
  onScoreChange?: (id: string, value: number) => void;
  size?: number;
}

const QUADRANT_COLORS: Record<QuadrantKey, { fill: string; dot: string }> = {
  execution:   { fill: "rgba(255,107,74,0.10)",  dot: "#FF6B4A" },
  insight:     { fill: "rgba(255,200,87,0.10)",  dot: "#FFC857" },
  strategy:    { fill: "rgba(0,201,177,0.10)",   dot: "#00C9B1" },
  influencing: { fill: "rgba(147,112,219,0.10)", dot: "#9370DB" },
};

const MAX_SCORE = 5;
const MIN_SCORE = 1;
const N = 12;
const LEVELS = 5;

function polarToXY(angleDeg: number, r: number, cx: number, cy: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function RadarChart({ scores, onScoreChange, size = 480 }: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const interactive = !!onScoreChange;

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.36;
  const labelR = maxR + 32;
  const angleStep = 360 / N;

  function scoreToR(score: number) {
    return ((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * maxR;
  }

  // Hit-test: given SVG coords, return { competencyId, score }
  const hitTest = useCallback((svgX: number, svgY: number) => {
    const dx = svgX - cx;
    const dy = svgY - cy;
    // Angle from center (0 = top, clockwise)
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    // Find nearest axis
    const rawIdx = angle / angleStep;
    const idx = Math.round(rawIdx) % N;
    // Distance → score
    const dist = Math.sqrt(dx * dx + dy * dy);
    const raw = (dist / maxR) * (MAX_SCORE - MIN_SCORE) + MIN_SCORE;
    const score = Math.max(MIN_SCORE, Math.min(MAX_SCORE, Math.round(raw)));
    return { competency: RADAR_COMPETENCIES[idx], score };
  }, [cx, cy, maxR, angleStep]);

  // Convert client coords → SVG coords
  const clientToSVG = useCallback((clientX: number, clientY: number) => {
    const el = svgRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }, [size]);

  function applyInteraction(clientX: number, clientY: number) {
    if (!onScoreChange) return;
    const { x, y } = clientToSVG(clientX, clientY);
    const { competency, score } = hitTest(x, y);
    onScoreChange(competency.id, score);
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    dragging.current = true;
    applyInteraction(e.clientX, e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !dragging.current) return;
    applyInteraction(e.clientX, e.clientY);
  };
  const onMouseUp = () => { dragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!interactive) return;
    dragging.current = true;
    const t = e.touches[0];
    applyInteraction(t.clientX, t.clientY);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!interactive || !dragging.current) return;
    e.preventDefault();
    const t = e.touches[0];
    applyInteraction(t.clientX, t.clientY);
  };
  const onTouchEnd = () => { dragging.current = false; };

  // Precompute shape
  const shapePoints = RADAR_COMPETENCIES.map((c, i) => {
    const score = scores[c.id] ?? MIN_SCORE;
    return polarToXY(i * angleStep, scoreToR(score), cx, cy);
  });
  const shapeD = shapePoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + "Z";

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block", maxWidth: size, touchAction: interactive ? "none" : "auto" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={interactive ? "cursor-crosshair" : ""}
    >
      {/* Invisible full hit area */}
      {interactive && <rect x={0} y={0} width={size} height={size} fill="transparent" />}

      {/* Quadrant sectors */}
      {([
        { q: "execution"   as QuadrantKey, start: 9,  end: 11 },
        { q: "insight"     as QuadrantKey, start: 0,  end: 2  },
        { q: "strategy"    as QuadrantKey, start: 3,  end: 5  },
        { q: "influencing" as QuadrantKey, start: 6,  end: 8  },
      ]).map(({ q, start, end }) => {
        const outerPts = Array.from({ length: end - start + 1 }, (_, k) =>
          polarToXY((start + k) * angleStep, maxR, cx, cy)
        );
        const d = `M${cx},${cy} ` + outerPts.map(p => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + "Z";
        return <path key={q} d={d} fill={QUADRANT_COLORS[q].fill} />;
      })}

      {/* Grid rings */}
      {Array.from({ length: LEVELS }, (_, i) => {
        const level = i + 1;
        const r = (level / LEVELS) * maxR;
        const pts = Array.from({ length: N }, (_, j) => polarToXY(j * angleStep, r, cx, cy));
        const d = pts.map((p, j) => `${j === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + "Z";
        return (
          <path key={level} d={d} fill="none"
            stroke={level === LEVELS ? "#333" : "#252525"}
            strokeWidth={level === LEVELS ? 1.5 : 0.75}
            strokeDasharray={level === LEVELS ? undefined : "3,3"}
          />
        );
      })}

      {/* Axis lines */}
      {RADAR_COMPETENCIES.map((_, i) => {
        const outer = polarToXY(i * angleStep, maxR, cx, cy);
        return <line key={i} x1={cx} y1={cy} x2={outer.x.toFixed(2)} y2={outer.y.toFixed(2)} stroke="#252525" strokeWidth={0.75} />;
      })}

      {/* Ring labels */}
      {([{ level: 1, label: "NEEDS FOCUS" }, { level: 3, label: "ON TRACK" }, { level: 5, label: "OUTPERFORM" }]).map(({ level, label }) => {
        const r = (level / LEVELS) * maxR;
        return (
          <text key={label} x={cx} y={cy - r + 9} textAnchor="middle" fontSize={7.5} fill="#555555" fontFamily="sans-serif" letterSpacing="0.6" fontWeight="500">
            {label}
          </text>
        );
      })}

      {/* Filled shape */}
      <path d={shapeD} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} strokeLinejoin="round" />

      {/* Dots */}
      {RADAR_COMPETENCIES.map((c, i) => {
        const score = scores[c.id] ?? MIN_SCORE;
        const pos = polarToXY(i * angleStep, scoreToR(score), cx, cy);
        const color = QUADRANT_COLORS[c.quadrant].dot;
        return (
          <circle key={c.id} cx={pos.x.toFixed(2)} cy={pos.y.toFixed(2)} r={interactive ? 6 : 5}
            fill={color} stroke="white" strokeWidth={1.5}
            style={{ pointerEvents: "none" }}
          />
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
          if (test.length > 14 && cur) { lines.push(cur); cur = w; } else cur = test;
        }
        if (cur) lines.push(cur);
        const color = QUADRANT_COLORS[c.quadrant].dot;
        return (
          <text key={c.id} textAnchor={anchor} fontSize={10} fontFamily="sans-serif" fontWeight="500" fill={color} style={{ pointerEvents: "none" }}>
            {lines.map((line, li) => (
              <tspan key={li} x={pos.x.toFixed(2)} y={(pos.y + li * 13 - ((lines.length - 1) * 6)).toFixed(2)}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}

      {/* Interactive hint ring (only when interactive and all at min) */}
      {interactive && Object.values(scores).every(s => s <= 1) && (
        <text x={cx} y={cy + maxR + 20} textAnchor="middle" fontSize={10} fill="#555555" fontFamily="sans-serif">
          Click or drag on the chart to plot yourself
        </text>
      )}
    </svg>
  );
}
