export type Competency = {
  id: string;
  label: string;
  quadrant: "execution" | "insight" | "strategy" | "influencing";
  angle: number; // degrees, for radar chart positioning
};

export type QuadrantKey = "execution" | "insight" | "strategy" | "influencing";

export const COMPETENCIES: Competency[] = [
  // Product Execution (top-left quadrant)
  { id: "quality_assurance", label: "Quality Assurance", quadrant: "execution", angle: 60 },
  { id: "product_delivery", label: "Product Delivery", quadrant: "execution", angle: 90 },
  { id: "feature_specification", label: "Feature Specification", quadrant: "execution", angle: 120 },
  // Influencing People (bottom-left quadrant)
  { id: "managing_up", label: "Managing Up", quadrant: "influencing", angle: 150 },
  { id: "team_leadership", label: "Team Leadership", quadrant: "influencing", angle: 210 },
  { id: "stakeholder_management", label: "Stakeholder Management", quadrant: "influencing", angle: 240 },
  // Product Strategy (bottom-right quadrant)
  { id: "strategic_impact", label: "Strategic Impact", quadrant: "strategy", angle: 270 },
  { id: "product_vision", label: "Product Vision & Roadmapping", quadrant: "strategy", angle: 300 },
  { id: "business_outcome", label: "Business Outcome Ownership", quadrant: "strategy", angle: 330 },
  // Customer Insight (top-right quadrant)
  { id: "ux_design", label: "User Experience Design", quadrant: "insight", angle: 0 },
  { id: "voice_of_customer", label: "Voice of the Customer", quadrant: "insight", angle: 30 },
  { id: "fluency_with_data", label: "Fluency with Data", quadrant: "insight", angle: 60 },
];

// Reordered for clean radar chart: clockwise from top
export const RADAR_COMPETENCIES: Competency[] = [
  { id: "fluency_with_data", label: "Fluency with Data", quadrant: "insight", angle: 0 },
  { id: "voice_of_customer", label: "Voice of the Customer", quadrant: "insight", angle: 30 },
  { id: "ux_design", label: "User Experience Design", quadrant: "insight", angle: 60 },
  { id: "business_outcome", label: "Business Outcome Ownership", quadrant: "strategy", angle: 90 },
  { id: "product_vision", label: "Product Vision & Roadmapping", quadrant: "strategy", angle: 120 },
  { id: "strategic_impact", label: "Strategic Impact", quadrant: "strategy", angle: 150 },
  { id: "stakeholder_management", label: "Stakeholder Management", quadrant: "influencing", angle: 180 },
  { id: "team_leadership", label: "Team Leadership", quadrant: "influencing", angle: 210 },
  { id: "managing_up", label: "Managing Up", quadrant: "influencing", angle: 240 },
  { id: "feature_specification", label: "Feature Specification", quadrant: "execution", angle: 270 },
  { id: "product_delivery", label: "Product Delivery", quadrant: "execution", angle: 300 },
  { id: "quality_assurance", label: "Quality Assurance", quadrant: "execution", angle: 330 },
];

export const QUADRANT_LABELS: Record<QuadrantKey, { label: string; color: string; bg: string }> = {
  execution: { label: "Product Execution", color: "#F97316", bg: "rgba(249,115,22,0.15)" },
  insight: { label: "Customer Insight", color: "#EAB308", bg: "rgba(234,179,8,0.15)" },
  strategy: { label: "Product Strategy", color: "#06B6D4", bg: "rgba(6,182,212,0.15)" },
  influencing: { label: "Influencing People", color: "#3B82F6", bg: "rgba(59,130,246,0.15)" },
};

export type Archetype = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: QuadrantKey[];
  weaknesses: QuadrantKey[];
  topCompetencies: string[];
  roles: string[];
  companies: string;
  strengths_detail: string;
  growth_areas: string;
  interview_spike_questions: string[];
  interview_landing_questions: string[];
  career_advice: string;
  pm_crack_advice: string;
};

export const ARCHETYPES: Archetype[] = [
  {
    id: "builder",
    name: "The Builder",
    emoji: "🔨",
    tagline: "Ship fast, ship right",
    description:
      "You excel at turning ideas into working products. Your strength lies in Product Execution — you write tight specs, manage delivery like a pro, and obsess over quality. Often comes from an engineering or technical background.",
    strengths: ["execution"],
    weaknesses: ["strategy"],
    topCompetencies: ["feature_specification", "product_delivery", "quality_assurance"],
    roles: ["Technical PM", "Platform PM", "Infrastructure PM", "API PM"],
    companies: "Stripe, Twilio, AWS, Figma",
    strengths_detail:
      "You translate complex requirements into precise specs. Developers love working with you because you understand tradeoffs, unblock them fast, and rarely change scope mid-sprint.",
    growth_areas:
      "Work on connecting execution to business outcomes. Practice articulating the 'why' behind features — not just the 'what' and 'how'. Spend more time with customers and data.",
    interview_spike_questions: [
      "Tell me about a time you had to push back on a feature request and why.",
      "How do you write a spec for a feature with ambiguous requirements?",
      "Describe your process for managing technical debt against new features.",
      "How do you work with engineers to estimate complexity and timelines?",
      "Tell me about a launch that went wrong — what happened and what did you fix?",
    ],
    interview_landing_questions: [
      "How do you prioritize your roadmap when everything is urgent?",
      "Walk me through how you'd improve [company's core product].",
      "How do you measure success for a feature after launch?",
      "Describe a product decision you made with incomplete data.",
      "How do you balance short-term delivery pressure with long-term product health?",
    ],
    career_advice:
      "Lead with your execution superpower — it's rare and valued. In job searches, demonstrate impact with metrics (shipped X, reduced Y). To level up, attach yourself to a strategic initiative and own the outcome end-to-end.",
    pm_crack_advice:
      "If you have an engineering background, this is your natural path into PM. Nail product sense interviews by learning the product design framework. Practice the 'why' layer on top of your technical instincts.",
  },
  {
    id: "innovator",
    name: "The Innovator",
    emoji: "💡",
    tagline: "Customer-first, always",
    description:
      "You have an extraordinary ability to understand customers — their pain, their joy, their unspoken needs. You're strong in UX thinking, qualitative research, and translating human insight into product direction.",
    strengths: ["insight"],
    weaknesses: ["influencing"],
    topCompetencies: ["ux_design", "voice_of_customer", "fluency_with_data"],
    roles: ["Consumer PM", "Growth PM", "Design PM", "UX PM"],
    companies: "Airbnb, Spotify, Instagram, Notion",
    strengths_detail:
      "You run killer user interviews, synthesize patterns others miss, and design experiences that feel magical. Your products are loved because you actually understand the person using them.",
    growth_areas:
      "Get more comfortable with stakeholder dynamics and executive communication. Practice translating customer insight into business cases with hard numbers.",
    interview_spike_questions: [
      "How do you conduct user research on a tight timeline?",
      "Tell me about a time customer insight changed your roadmap direction.",
      "How do you balance quantitative data with qualitative feedback?",
      "Describe a product improvement driven entirely by user research.",
      "How do you evangelize customer insights to skeptical stakeholders?",
    ],
    interview_landing_questions: [
      "How would you redesign [product] for a new user segment?",
      "What's a product you love and why? How would you improve it?",
      "How do you decide which user feedback to act on vs. ignore?",
      "Walk me through how you'd define the target user for a new product.",
      "How do you know when a product has nailed the job-to-be-done?",
    ],
    career_advice:
      "Your empathy for users is a superpower — especially at consumer companies. Showcase case studies of insights → decisions → outcomes. To level up, pair your qualitative strength with stronger data analysis skills.",
    pm_crack_advice:
      "If you're coming from UX, research, or design, you're already ahead on customer insight. Bridge into PM by demonstrating business judgment. Show you can prioritize, ship, and measure — not just understand.",
  },
  {
    id: "scientist",
    name: "The Scientist",
    emoji: "🔬",
    tagline: "In data we trust",
    description:
      "You are fluent in data. You run A/B tests before anyone asks, you know your funnel metrics by heart, and you make decisions with statistical confidence. Often found in growth, ads, or marketplace teams.",
    strengths: ["insight", "strategy"],
    weaknesses: ["execution"],
    topCompetencies: ["fluency_with_data", "business_outcome", "strategic_impact"],
    roles: ["Growth PM", "Data PM", "Ads PM", "Marketplace PM"],
    companies: "Meta, Google, LinkedIn, Uber",
    strengths_detail:
      "You connect product decisions to metrics and outcomes. You can design an experiment, interpret results, and translate them into roadmap decisions with confidence.",
    growth_areas:
      "Don't let perfect data be the enemy of good decisions. Work on execution rigor — specs, quality, delivery timelines. And develop your qualitative muscle to catch what data misses.",
    interview_spike_questions: [
      "How do you design an A/B test for a complex product change?",
      "Walk me through how you'd investigate a sudden drop in a key metric.",
      "How do you decide when you have 'enough' data to make a decision?",
      "Tell me about a time data proved your intuition wrong.",
      "How do you build a metrics framework for a new product area?",
    ],
    interview_landing_questions: [
      "What metrics would you use to measure success for [product]?",
      "How do you prioritize experiments when resources are limited?",
      "How do you communicate data-driven decisions to non-technical stakeholders?",
      "Describe a product strategy you developed based on data analysis.",
      "How do you balance optimizing existing metrics vs. identifying new ones?",
    ],
    career_advice:
      "Data fluency is increasingly non-negotiable for senior PMs. Use it to build credibility fast. When job hunting, show specific impact with numbers. To grow, develop your storytelling — data tells the what, you need to tell the why.",
    pm_crack_advice:
      "If you're coming from analytics or data science, transitioning to PM is very achievable. Demonstrate product sense, not just analysis. Practice product design questions and show you care about the user — not just the metric.",
  },
  {
    id: "strategist",
    name: "The Strategist",
    emoji: "♟️",
    tagline: "Visionary at the whiteboard",
    description:
      "You see the chessboard clearly. You're at your best when defining product vision, crafting roadmaps that align the org, and owning business outcomes. You understand markets, competition, and where to place bets.",
    strengths: ["strategy"],
    weaknesses: ["execution"],
    topCompetencies: ["product_vision", "strategic_impact", "business_outcome"],
    roles: ["Senior PM", "Principal PM", "Group PM", "CPO-track"],
    companies: "McKinsey-to-PM, Bain, strategy-heavy tech orgs",
    strengths_detail:
      "You can articulate a 3-year product vision, build a compelling narrative, and rally an org around a strategy. You understand competitive dynamics and market positioning at a level most PMs don't.",
    growth_areas:
      "Ground strategy in execution reality. Work closer with engineers to understand what's actually feasible. Develop a habit of measuring outcomes, not just setting direction.",
    interview_spike_questions: [
      "How do you build a product roadmap when the strategy is ambiguous?",
      "Tell me about a time you influenced the company's product direction.",
      "How do you evaluate build vs. buy vs. partner decisions?",
      "Describe how you'd enter a new market with a product.",
      "How do you balance short-term revenue goals with long-term vision?",
    ],
    interview_landing_questions: [
      "What's your take on [company]'s biggest strategic opportunity right now?",
      "How do you align a roadmap with business strategy?",
      "How do you make the case for a long-term investment with uncertain ROI?",
      "Walk me through how you'd evaluate a new product opportunity.",
      "How do you handle strategic disagreements with leadership?",
    ],
    career_advice:
      "Your strategic thinking is a fast-track to senior roles. Lead with vision in interviews, but show you can get things done. The strongest PMs pair strategic thinking with execution credibility — build that story.",
    pm_crack_advice:
      "If you're coming from consulting or business school, strategy is your entry point. You'll need to prove you understand technology deeply enough and that you can ship — not just present decks. Get hands-on with a product quickly.",
  },
  {
    id: "operator",
    name: "The Operator",
    emoji: "⚙️",
    tagline: "The glue that holds it together",
    description:
      "You are the master of cross-functional work. You align stakeholders, manage up brilliantly, and lead teams without authority. You're the PM everyone wants on their most complex, politically-charged projects.",
    strengths: ["influencing"],
    weaknesses: ["insight"],
    topCompetencies: ["stakeholder_management", "managing_up", "team_leadership"],
    roles: ["Platform PM", "Enterprise PM", "Partnerships PM", "Internal Tools PM"],
    companies: "Salesforce, SAP, large enterprise orgs, Google internal",
    strengths_detail:
      "You navigate org complexity like a pro. You know how to get alignment across engineering, design, sales, and legal. You make hard things happen through people.",
    growth_areas:
      "Invest in customer insight and data fluency. Make sure the products you're shipping are grounded in real user needs — not just internal stakeholder demands.",
    interview_spike_questions: [
      "How do you align stakeholders who have conflicting priorities?",
      "Tell me about a time you had to influence without authority.",
      "How do you manage up when your manager disagrees with your direction?",
      "Describe a situation where you had to navigate significant org politics.",
      "How do you keep a cross-functional team motivated through a long project?",
    ],
    interview_landing_questions: [
      "How do you build trust with a new engineering team?",
      "How do you handle a stakeholder who keeps changing requirements?",
      "Describe how you'd drive alignment on a contentious roadmap decision.",
      "How do you communicate product decisions to the executive team?",
      "What's your approach to running effective cross-functional meetings?",
    ],
    career_advice:
      "Your ability to operate in complex environments is rare. You're often the PM who saves multi-year initiatives. To grow to leadership, deepen your strategic and customer insight muscles — you need all four quadrants at director+.",
    pm_crack_advice:
      "If you're from project management, operations, or consulting, Operator is your archetype. Reframe your experience in terms of product outcomes, not process. Show you can set product direction — not just execute someone else's.",
  },
  {
    id: "growth_pm",
    name: "The Growth PM",
    emoji: "📈",
    tagline: "North Star or bust",
    description:
      "You live for the growth loop. You obsess over activation, retention, monetization, and referral. You're data-driven, experiment-happy, and always thinking about how to move the needle on the metrics that matter most.",
    strengths: ["insight", "strategy"],
    weaknesses: ["influencing"],
    topCompetencies: ["fluency_with_data", "business_outcome", "voice_of_customer"],
    roles: ["Growth PM", "Monetization PM", "Activation PM", "Retention PM"],
    companies: "Duolingo, Dropbox, HubSpot, Loom, early-stage startups",
    strengths_detail:
      "You understand the full funnel and can identify the highest-leverage intervention at each stage. You combine quantitative rigor with product intuition to find growth opportunities others miss.",
    growth_areas:
      "Don't become so metric-focused you lose sight of the user experience. Invest in qualitative insight — sometimes the best growth lever isn't in the dashboard. Also build your influence skills to secure resources for growth initiatives.",
    interview_spike_questions: [
      "Walk me through a growth experiment you ran from hypothesis to results.",
      "How do you identify the most important growth lever for a product?",
      "What's your framework for improving activation rate?",
      "Tell me about a time a growth experiment failed and what you learned.",
      "How do you define and measure a product's North Star Metric?",
    ],
    interview_landing_questions: [
      "How would you grow [company's product] by 2x in 12 months?",
      "What's the difference between a vanity metric and a meaningful one?",
      "How do you balance growth with user experience?",
      "How do you prioritize growth vs. core product improvements?",
      "How would you build a growth team from scratch?",
    ],
    career_advice:
      "Growth PM is one of the most impactful and visible PM roles. Show clear before/after metrics in your portfolio. To land senior growth roles, demonstrate you can think beyond tactics — you need to own a growth strategy end-to-end.",
    pm_crack_advice:
      "If you're coming from marketing or analytics, Growth PM is the most natural transition. Get comfortable with product instrumentation, SQL basics, and experiment design. Your business thinking is already an asset.",
  },
  {
    id: "product_leader",
    name: "The Product Leader",
    emoji: "🎯",
    tagline: "Balanced, elevated, systemic",
    description:
      "You have strong scores across all four quadrants. You're the PM who can wear many hats, adapt to context, and operate effectively across the full spectrum. You're likely ready — or almost ready — for senior/director-level roles.",
    strengths: ["execution", "insight", "strategy", "influencing"],
    weaknesses: [],
    topCompetencies: ["product_vision", "strategic_impact", "team_leadership"],
    roles: ["Senior PM", "Group PM", "Director of Product", "VP of Product"],
    companies: "Any — you're the Swiss Army knife PM",
    strengths_detail:
      "Your balance is rare. You can write a spec AND present a vision. You understand users AND align stakeholders. Teams trust you and leadership respects you.",
    growth_areas:
      "At this level, your job is to raise the ceiling — find your spike and build a distinct point of view. Great product leaders aren't balanced; they're exceptionally strong somewhere and solid everywhere else.",
    interview_spike_questions: [
      "How do you build and develop a team of PMs?",
      "How do you set product strategy when the business direction is unclear?",
      "Tell me about a time you changed a product direction based on new information.",
      "How do you balance multiple competing roadmaps across teams?",
      "How do you evaluate PM performance and growth?",
    ],
    interview_landing_questions: [
      "What's your philosophy on product management?",
      "How do you make the organization more customer-centric?",
      "How do you decide when to kill a product or feature?",
      "How have you grown and mentored other PMs?",
      "Describe your approach to building a product culture.",
    ],
    career_advice:
      "You're in a strong position. Focus on identifying your unique differentiation — what's your spike? The best leaders are known for something specific. Also invest in developing other PMs, as that's the unlock for director+ roles.",
    pm_crack_advice:
      "If you score high across the board as a PM candidate, lead with versatility and learning velocity. Show you can ramp quickly, contribute immediately, and grow. Highlight your most impactful project with clear outcomes.",
  },
];

export function scoreToLevel(score: number): string {
  if (score <= 1.5) return "Needs Focus";
  if (score <= 3.5) return "On Track";
  return "Outperform";
}

export function getQuadrantScores(scores: Record<string, number>): Record<QuadrantKey, number> {
  const quadrants: Record<QuadrantKey, number[]> = {
    execution: [],
    insight: [],
    strategy: [],
    influencing: [],
  };

  RADAR_COMPETENCIES.forEach((c) => {
    if (scores[c.id] !== undefined) {
      quadrants[c.quadrant].push(scores[c.id]);
    }
  });

  return {
    execution: avg(quadrants.execution),
    insight: avg(quadrants.insight),
    strategy: avg(quadrants.strategy),
    influencing: avg(quadrants.influencing),
  };
}

function avg(arr: number[]): number {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function matchArchetype(scores: Record<string, number>): Archetype {
  const quadrantScores = getQuadrantScores(scores);

  // Check if broadly balanced at high level → Product Leader (on 1-5 scale, 3.8+ is high)
  const allHigh = Object.values(quadrantScores).every((s) => s >= 3.8);
  if (allHigh) return ARCHETYPES.find((a) => a.id === "product_leader")!;

  // Find dominant quadrant(s)
  const sorted = Object.entries(quadrantScores).sort((a, b) => b[1] - a[1]) as [QuadrantKey, number][];
  const topQuadrant = sorted[0][0];
  const secondQuadrant = sorted[1][0];

  // Growth PM: data + strategy spike (on 1-5 scale, 4+ is a spike)
  if (
    scores["fluency_with_data"] >= 4 &&
    (scores["business_outcome"] >= 4 || scores["strategic_impact"] >= 4)
  ) {
    return ARCHETYPES.find((a) => a.id === "growth_pm")!;
  }

  // Match by top quadrant
  const archetypeMap: Partial<Record<QuadrantKey, string>> = {
    execution: "builder",
    insight: "innovator",
    strategy: "strategist",
    influencing: "operator",
  };

  // If top two quadrants are insight + strategy → scientist leaning
  if (
    (topQuadrant === "insight" && secondQuadrant === "strategy") ||
    (topQuadrant === "strategy" && secondQuadrant === "insight")
  ) {
    if (scores["fluency_with_data"] >= 4) {
      return ARCHETYPES.find((a) => a.id === "scientist")!;
    }
  }

  return ARCHETYPES.find((a) => a.id === archetypeMap[topQuadrant])!;
}
