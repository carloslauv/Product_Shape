import { NextRequest, NextResponse } from "next/server";
import { ARCHETYPES, RADAR_COMPETENCIES, getQuadrantScores, scoreToLevel, QUADRANT_LABELS, QuadrantKey } from "@/lib/archetypes";

export async function POST(req: NextRequest) {
  try {
    const { email, scores, archetypeId, context } = await req.json();

    if (!email || !scores || !archetypeId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const archetype = ARCHETYPES.find((a) => a.id === archetypeId);
    if (!archetype) {
      return NextResponse.json({ error: "Invalid archetype" }, { status: 400 });
    }

    const quadrantScores = getQuadrantScores(scores);

    const sortedCompetencies = [...RADAR_COMPETENCIES].sort(
      (a, b) => (scores[b.id] || 1) - (scores[a.id] || 1)
    );
    const topThree = sortedCompetencies.slice(0, 3).map((c) => c.label);
    const bottomThree = sortedCompetencies.slice(-3).map((c) => c.label);

    const advice =
      context === "crack_pm" ? archetype.pm_crack_advice : archetype.career_advice;

    const spikeQuestions = archetype.interview_spike_questions
      .map((q, i) => `<li style="margin-bottom:8px">${i + 1}. ${q}</li>`)
      .join("");

    const landingQuestions = archetype.interview_landing_questions
      .map((q, i) => `<li style="margin-bottom:8px">${i + 1}. ${q}</li>`)
      .join("");

    const quadrantRows = (Object.keys(quadrantScores) as QuadrantKey[])
      .map((q) => {
        const score = quadrantScores[q];
        const pct = Math.round(((score - 1) / 2) * 100);
        return `<tr>
          <td style="padding:6px 0;font-size:13px;color:#374151;width:200px">${QUADRANT_LABELS[q].label}</td>
          <td style="padding:6px 0">
            <div style="background:#f3f4f6;border-radius:4px;height:8px;width:200px">
              <div style="background:${QUADRANT_LABELS[q].color};border-radius:4px;height:8px;width:${pct * 2}px"></div>
            </div>
          </td>
          <td style="padding:6px 0 6px 12px;font-size:12px;color:#9ca3af">${scoreToLevel(score)}</td>
        </tr>`;
      })
      .join("");

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:600px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:40px 40px 32px">
    <div style="font-size:12px;color:#a5b4fc;margin-bottom:8px;letter-spacing:0.5px">YOUR PM ARCHETYPE</div>
    <div style="font-size:36px;margin-bottom:8px">${archetype.emoji}</div>
    <h1 style="color:white;margin:0 0 8px;font-size:28px;font-weight:800">${archetype.name}</h1>
    <p style="color:#c7d2fe;margin:0;font-style:italic">"${archetype.tagline}"</p>
  </div>

  <div style="padding:32px 40px">

    <!-- Description -->
    <p style="color:#4b5563;line-height:1.7;margin:0 0 24px">${archetype.description}</p>

    <!-- Roles -->
    <div style="margin-bottom:32px">
      <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.5px;margin-bottom:10px">BEST-FIT ROLES</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${archetype.roles.map((r) => `<span style="background:#ede9fe;color:#5b21b6;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500">${r}</span>`).join("")}
      </div>
    </div>

    <!-- Quadrant scores -->
    <div style="margin-bottom:32px">
      <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.5px;margin-bottom:16px">QUADRANT BREAKDOWN</div>
      <table style="border-collapse:collapse;width:100%">${quadrantRows}</table>
    </div>

    <!-- Strengths / Focus -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px">
      <div style="background:#f0fdf4;border-radius:12px;padding:16px">
        <div style="font-size:11px;font-weight:700;color:#15803d;margin-bottom:8px">🚀 YOUR SPIKES</div>
        ${topThree.map((t) => `<div style="font-size:13px;color:#374151;margin-bottom:4px">• ${t}</div>`).join("")}
      </div>
      <div style="background:#fef2f2;border-radius:12px;padding:16px">
        <div style="font-size:11px;font-weight:700;color:#dc2626;margin-bottom:8px">🎯 FOCUS AREAS</div>
        ${bottomThree.map((t) => `<div style="font-size:13px;color:#374151;margin-bottom:4px">• ${t}</div>`).join("")}
      </div>
    </div>

    <!-- Career advice -->
    <div style="background:#eef2ff;border-radius:12px;padding:20px;margin-bottom:32px">
      <div style="font-size:11px;font-weight:700;color:#4338ca;margin-bottom:8px">🎯 CAREER ADVICE</div>
      <p style="color:#4338ca;font-size:14px;line-height:1.6;margin:0">${advice}</p>
    </div>

    <!-- Growth areas -->
    <div style="background:#fffbeb;border-radius:12px;padding:20px;margin-bottom:32px">
      <div style="font-size:11px;font-weight:700;color:#92400e;margin-bottom:8px">💡 GROWTH AREAS</div>
      <p style="color:#78350f;font-size:14px;line-height:1.6;margin:0">${archetype.growth_areas}</p>
    </div>

    <!-- Interview spike questions -->
    <div style="margin-bottom:32px">
      <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.5px;margin-bottom:16px">🎤 INTERVIEW QUESTIONS FOR YOUR SPIKE</div>
      <p style="font-size:12px;color:#9ca3af;margin:0 0 12px">Questions that play to your strengths — prepare compelling stories for each.</p>
      <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.7">${spikeQuestions}</ol>
    </div>

    <!-- Landing questions -->
    <div style="margin-bottom:32px">
      <div style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.5px;margin-bottom:16px">🏆 QUESTIONS TO LAND THE JOB</div>
      <p style="font-size:12px;color:#9ca3af;margin:0 0 12px">Must-prepare questions for any PM role.</p>
      <ol style="margin:0;padding-left:20px;color:#374151;font-size:14px;line-height:1.7">${landingQuestions}</ol>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #f3f4f6;padding-top:24px;text-align:center">
      <p style="color:#9ca3af;font-size:12px;margin:0">Framework by <a href="https://www.ravi-mehta.com/product-manager-roles/" style="color:#6366f1">Ravi Mehta</a> · Built with ❤️ for PMs everywhere</p>
    </div>

  </div>
</div>
</body>
</html>`;

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.log("No RESEND_API_KEY — email would be sent to:", email, "archetype:", archetypeId);
      return NextResponse.json({ ok: true, note: "Email logging only (no API key configured)" });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Product Shape <noreply@productshape.app>",
        to: [email],
        subject: `Your PM Shape: ${archetype.name} ${archetype.emoji}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
