export default function PreviewPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>

      {/* B — Editorial Mono */}
      <div style={{ flex: 1, background: "#FFFFFF", padding: "40px 32px", borderRight: "1px solid #E5E5E5" }}>
        <p style={{ fontSize: 10, letterSpacing: 3, color: "#999", fontWeight: 600, marginBottom: 24 }}>OPTION B — EDITORIAL MONO</p>

        <p style={{ fontSize: 10, letterSpacing: 2, color: "#999", fontWeight: 600, marginBottom: 8 }}>PRODUCT MANAGER COMPETENCY MAP</p>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: "#111", lineHeight: 1.1, marginBottom: 16 }}>
          What&apos;s Your<br />Shape?
        </h1>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 32, maxWidth: 340 }}>
          Rate yourself on the 12 PM competencies from <em>Needs Focus</em> to <em>Outperform</em>.
        </p>

        {/* Mini radar mock */}
        <div style={{ background: "#FAFAFA", border: "1px solid #E8E8E8", borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <svg width="100%" viewBox="0 0 300 300">
            {/* Rings */}
            {[60, 90, 120].map(r => (
              <circle key={r} cx={150} cy={150} r={r} fill="none" stroke="#E8E8E8" strokeWidth={r === 120 ? 1.5 : 0.75} strokeDasharray={r === 120 ? undefined : "3,3"} />
            ))}
            {/* Shape */}
            <polygon points="150,60 210,90 230,150 210,210 150,230 90,210 70,150 90,90" fill="rgba(232,160,32,0.12)" stroke="#E8A020" strokeWidth={2} />
            {/* Dots */}
            {[[150,60],[210,90],[230,150],[210,210],[150,230],[90,210],[70,150],[90,90]].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r={5} fill="#E8A020" stroke="white" strokeWidth={1.5} />
            ))}
            {/* Labels */}
            <text x={150} y={42} textAnchor="middle" fontSize={9} fill="#999" fontWeight={600}>Fluency with Data</text>
            <text x={232} y={90} textAnchor="start" fontSize={9} fill="#999" fontWeight={600}>Voice</text>
            <text x={244} y={154} textAnchor="start" fontSize={9} fill="#999" fontWeight={600}>UX</text>
            <text x={232} y={218} textAnchor="start" fontSize={9} fill="#999" fontWeight={600}>Business</text>
            <text x={150} y={248} textAnchor="middle" fontSize={9} fill="#999" fontWeight={600}>Vision</text>
            <text x={68} y={218} textAnchor="end" fontSize={9} fill="#999" fontWeight={600}>Strategy</text>
            <text x={56} y={154} textAnchor="end" fontSize={9} fill="#999" fontWeight={600}>Team</text>
            <text x={68} y={90} textAnchor="end" fontSize={9} fill="#999" fontWeight={600}>Managing</text>
          </svg>
        </div>

        {/* Sample competency card */}
        <div style={{ background: "#FAFAFA", border: "1px solid #E8E8E8", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <p style={{ fontWeight: 700, color: "#111", fontSize: 15, margin: 0 }}>Feature Specification</p>
              <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Gather requirements and define functionality.</p>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#E8A020" }}>3</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: n === 3 ? "none" : "1px solid #E8E8E8",
                background: n === 3 ? "#E8A020" : "white",
                color: n === 3 ? "white" : "#999",
                cursor: "pointer"
              }}>{n}</button>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 9, color: "#CCC", letterSpacing: 1 }}>NEEDS FOCUS</span>
            <span style={{ fontSize: 9, color: "#CCC", letterSpacing: 1 }}>ON TRACK</span>
            <span style={{ fontSize: 9, color: "#CCC", letterSpacing: 1 }}>OUTPERFORM</span>
          </div>
        </div>

        {/* Palette swatches */}
        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 10, letterSpacing: 2, color: "#999", marginBottom: 12 }}>PALETTE</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[["#111111","Text"], ["#555555","Muted"], ["#999999","Subtle"], ["#E8E8E8","Border"], ["#FAFAFA","Card"], ["#E8A020","Accent"]].map(([c, l]) => (
              <div key={c} style={{ textAlign: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: c, border: "1px solid #E8E8E8", marginBottom: 4 }} />
                <p style={{ fontSize: 9, color: "#999", margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C — Dark Premium */}
      <div style={{ flex: 1, background: "#0D0D0D", padding: "40px 32px" }}>
        <p style={{ fontSize: 10, letterSpacing: 3, color: "#555", fontWeight: 600, marginBottom: 24 }}>OPTION C — DARK PREMIUM</p>

        <p style={{ fontSize: 10, letterSpacing: 2, color: "#555", fontWeight: 600, marginBottom: 8 }}>PRODUCT MANAGER COMPETENCY MAP</p>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: "#F5F5F5", lineHeight: 1.1, marginBottom: 16 }}>
          What&apos;s Your<br />Shape?
        </h1>
        <p style={{ fontSize: 15, color: "#888", lineHeight: 1.7, marginBottom: 32, maxWidth: 340 }}>
          Rate yourself on the 12 PM competencies from <em style={{ color: "#aaa" }}>Needs Focus</em> to <em style={{ color: "#aaa" }}>Outperform</em>.
        </p>

        {/* Mini radar mock */}
        <div style={{ background: "#161616", border: "1px solid #222", borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <svg width="100%" viewBox="0 0 300 300">
            {[60, 90, 120].map(r => (
              <circle key={r} cx={150} cy={150} r={r} fill="none" stroke="#222" strokeWidth={r === 120 ? 1.5 : 0.75} strokeDasharray={r === 120 ? undefined : "3,3"} />
            ))}
            {/* Quadrant fills */}
            <path d="M150,150 L150,30 L220,85 Z" fill="rgba(255,107,74,0.08)" />
            <path d="M150,150 L220,85 L270,150 Z" fill="rgba(255,107,74,0.08)" />
            <path d="M150,150 L270,150 L220,215 Z" fill="rgba(0,201,177,0.08)" />
            <path d="M150,150 L220,215 L150,270 Z" fill="rgba(0,201,177,0.08)" />
            <path d="M150,150 L150,270 L80,215 Z" fill="rgba(147,112,219,0.08)" />
            <path d="M150,150 L80,215 L30,150 Z" fill="rgba(147,112,219,0.08)" />
            <path d="M150,150 L30,150 L80,85 Z" fill="rgba(255,200,87,0.08)" />
            <path d="M150,150 L80,85 L150,30 Z" fill="rgba(255,200,87,0.08)" />
            {/* Shape */}
            <polygon points="150,55 214,88 235,150 214,212 150,235 86,212 65,150 86,88" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} />
            {/* Dots */}
            {[["#FF6B4A",150,55],["#FF6B4A",214,88],["#00C9B1",235,150],["#00C9B1",214,212],["#9370DB",150,235],["#9370DB",86,212],["#FFC857",65,150],["#FFC857",86,88]].map(([c,x,y], i) => (
              <circle key={i} cx={x as number} cy={y as number} r={5} fill={c as string} stroke="#0D0D0D" strokeWidth={1.5} />
            ))}
            <text x={150} y={38} textAnchor="middle" fontSize={9} fill="#555" fontWeight={600}>Fluency with Data</text>
            <text x={226} y={88} textAnchor="start" fontSize={9} fill="#555" fontWeight={600}>Voice</text>
            <text x={248} y={154} textAnchor="start" fontSize={9} fill="#555" fontWeight={600}>UX</text>
            <text x={226} y={220} textAnchor="start" fontSize={9} fill="#555" fontWeight={600}>Business</text>
            <text x={150} y={252} textAnchor="middle" fontSize={9} fill="#555" fontWeight={600}>Vision</text>
            <text x={74} y={220} textAnchor="end" fontSize={9} fill="#555" fontWeight={600}>Strategy</text>
            <text x={52} y={154} textAnchor="end" fontSize={9} fill="#555" fontWeight={600}>Team</text>
            <text x={74} y={88} textAnchor="end" fontSize={9} fill="#555" fontWeight={600}>Managing</text>
          </svg>
        </div>

        {/* Sample competency card */}
        <div style={{ background: "#161616", border: "1px solid #222", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <p style={{ fontWeight: 700, color: "#F5F5F5", fontSize: 15, margin: 0 }}>Feature Specification</p>
              <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>Gather requirements and define functionality.</p>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#FF6B4A" }}>3</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} style={{
                flex: 1, padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: n === 3 ? "none" : "1px solid #222",
                background: n === 3 ? "#FF6B4A" : "#1A1A1A",
                color: n === 3 ? "white" : "#555",
                cursor: "pointer"
              }}>{n}</button>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 9, color: "#333", letterSpacing: 1 }}>NEEDS FOCUS</span>
            <span style={{ fontSize: 9, color: "#333", letterSpacing: 1 }}>ON TRACK</span>
            <span style={{ fontSize: 9, color: "#333", letterSpacing: 1 }}>OUTPERFORM</span>
          </div>
        </div>

        {/* Palette */}
        <div style={{ marginTop: 24 }}>
          <p style={{ fontSize: 10, letterSpacing: 2, color: "#555", marginBottom: 12 }}>PALETTE</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[["#F5F5F5","Text"],["#888888","Muted"],["#555555","Subtle"],["#222222","Border"],["#161616","Card"],["#FF6B4A","Exec"],["#00C9B1","Strategy"],["#9370DB","Influencing"],["#FFC857","Insight"]].map(([c,l]) => (
              <div key={c} style={{ textAlign: "center" }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: c, border: "1px solid #333", marginBottom: 4 }} />
                <p style={{ fontSize: 8, color: "#555", margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
