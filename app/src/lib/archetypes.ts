export type Competency = {
  id: string;
  label: string;
  quadrant: "execution" | "insight" | "strategy" | "influencing";
  angle: number;
};

export type QuadrantKey = "execution" | "insight" | "strategy" | "influencing";

export const RADAR_COMPETENCIES: Competency[] = [
  { id: "fluency_with_data",      label: "Fluency with Data",           quadrant: "insight",     angle: 0   },
  { id: "voice_of_customer",      label: "Voice of the Customer",       quadrant: "insight",     angle: 30  },
  { id: "ux_design",              label: "User Experience Design",      quadrant: "insight",     angle: 60  },
  { id: "business_outcome",       label: "Business Outcome Ownership",  quadrant: "strategy",    angle: 90  },
  { id: "product_vision",         label: "Product Vision & Roadmapping",quadrant: "strategy",    angle: 120 },
  { id: "strategic_impact",       label: "Strategic Impact",            quadrant: "strategy",    angle: 150 },
  { id: "stakeholder_management", label: "Stakeholder Management",      quadrant: "influencing", angle: 180 },
  { id: "team_leadership",        label: "Team Leadership",             quadrant: "influencing", angle: 210 },
  { id: "managing_up",            label: "Managing Up",                 quadrant: "influencing", angle: 240 },
  { id: "feature_specification",  label: "Feature Specification",       quadrant: "execution",   angle: 270 },
  { id: "product_delivery",       label: "Product Delivery",            quadrant: "execution",   angle: 300 },
  { id: "quality_assurance",      label: "Quality Assurance",           quadrant: "execution",   angle: 330 },
];

export const QUADRANT_LABELS: Record<QuadrantKey, { label: string; color: string; bg: string }> = {
  execution:   { label: "Product Execution",   color: "#FF6B4A", bg: "rgba(255,107,74,0.12)"  },
  insight:     { label: "Customer Insight",    color: "#FFC857", bg: "rgba(255,200,87,0.12)"  },
  strategy:    { label: "Product Strategy",    color: "#00C9B1", bg: "rgba(0,201,177,0.12)"   },
  influencing: { label: "Influencing People",  color: "#9370DB", bg: "rgba(147,112,219,0.12)" },
};

export type CompanyRec = {
  name: string;
  why: string;
};

export type Archetype = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: QuadrantKey[];
  weaknesses: QuadrantKey[];
  roles: string[];
  company_recs: CompanyRec[];
  strengths_detail: string;
  growth_areas: string;
  interview_spike_questions: string[];
  interview_landing_questions: string[];
  interview_weakness_questions: string[];
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
    roles: ["Technical PM", "Platform PM", "Infrastructure PM", "API PM"],
    company_recs: [
      { name: "Stripe",    why: "Deep technical product culture — specs and API quality are table stakes here." },
      { name: "Twilio",    why: "Developer-facing platform where execution precision directly drives revenue." },
      { name: "Figma",     why: "Performance and delivery quality are core to the product experience." },
      { name: "Linear",    why: "A small team that ships extremely high-quality software — builders thrive." },
      { name: "Vercel",    why: "Infrastructure-adjacent product where technical fluency is essential." },
      { name: "Cloudflare",why: "Platform complexity demands PMs who can write airtight specs." },
      { name: "GitHub",    why: "Developer tooling where understanding the build process is non-negotiable." },
      { name: "PlanetScale",why: "Technical product targeting engineers — your instincts are a huge asset." },
      { name: "Retool",    why: "Internal tooling space where builders who ship reliably stand out." },
      { name: "Datadog",   why: "Observability tooling with demanding engineering partners and fast release cycles." },
    ],
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
    interview_weakness_questions: [
      "How do you ensure the features you ship are tied to measurable business outcomes?",
      "Tell me about a time you had to make a strategic product bet — how did you evaluate it?",
      "How do you build a product roadmap that aligns with company strategy, not just engineering priorities?",
      "How do you use customer research to influence what you decide to build?",
      "Walk me through how you'd identify a new market opportunity for an existing product.",
      "How do you communicate to leadership why a long-term investment is worth delaying a near-term feature?",
    ],
    career_advice:
      "Lead with your execution superpower — it's rare and valued. In job searches, demonstrate impact with metrics (shipped X, reduced Y by Z%). To level up, attach yourself to a strategic initiative and own the outcome end-to-end.",
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
    roles: ["Consumer PM", "Growth PM", "Design PM", "UX PM"],
    company_recs: [
      { name: "Airbnb",    why: "Design-obsessed culture where customer empathy is the core product differentiator." },
      { name: "Spotify",   why: "Consumer product built on deep understanding of listener behavior and taste." },
      { name: "Notion",    why: "UX-led product where the experience IS the moat — perfect for innovators." },
      { name: "Duolingo",  why: "Behavioral science meets consumer delight — your customer instincts shine here." },
      { name: "Figma",     why: "Tool built for creatives by people who deeply understand creative workflows." },
      { name: "Headspace", why: "Consumer wellness product where emotional design and insight drive retention." },
      { name: "Canva",     why: "Democratizing design — customer research shapes every major product decision." },
      { name: "Superhuman",why: "Obsessive focus on user experience and delight — the bar is extremely high." },
      { name: "Loom",      why: "Async video product where understanding workflow friction is the key insight." },
      { name: "Miro",      why: "Collaboration tool where understanding team dynamics drives product evolution." },
    ],
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
    interview_weakness_questions: [
      "How do you align a skeptical engineering or sales team around a customer insight you believe in?",
      "Tell me about a time you had to influence a decision without direct authority.",
      "How do you manage up when your manager is pushing for a feature you disagree with?",
      "How do you build trust with a cross-functional team that's new to you?",
      "Describe how you'd navigate a stakeholder who keeps shifting requirements.",
      "How do you get leadership buy-in for a research-driven initiative with uncertain ROI?",
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
    roles: ["Growth PM", "Data PM", "Ads PM", "Marketplace PM"],
    company_recs: [
      { name: "Meta",      why: "Experiment-at-scale culture where data fluency is table stakes for every PM." },
      { name: "Google",    why: "Metrics-driven product org where scientific rigor is baked into the process." },
      { name: "LinkedIn",  why: "Feed, search, and growth teams all run dense experimentation programs." },
      { name: "Uber",      why: "Marketplace dynamics require constant data-driven calibration — ideal for you." },
      { name: "Airbnb",    why: "Growth and pricing teams run sophisticated experiments across a two-sided market." },
      { name: "DoorDash",  why: "Dense experimentation across marketplace, logistics, and consumer — data PMs thrive." },
      { name: "Amplitude", why: "Analytics product company — working here is a masterclass in metrics thinking." },
      { name: "HubSpot",   why: "Growth and activation loops backed by rigorous funnel analysis." },
      { name: "Duolingo",  why: "Behavioral science meets A/B testing at scale — a scientist's dream." },
      { name: "Booking.com",why: "Famous for running thousands of experiments simultaneously — ideal environment." },
    ],
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
    interview_weakness_questions: [
      "How do you handle a situation where you need to ship quickly but your experiment hasn't reached significance?",
      "Tell me about a time you had to write detailed specs or manage a complex delivery — what was your process?",
      "How do you ensure quality across edge cases when you're moving fast?",
      "How do you work effectively with design when the design problem is ambiguous?",
      "Describe a feature you shipped where the primary driver was customer empathy, not data.",
      "How do you manage delivery timelines when engineering estimates keep slipping?",
    ],
    career_advice:
      "Data fluency is increasingly non-negotiable for senior PMs. Use it to build credibility fast. When job hunting, show specific impact with numbers. To grow, develop your storytelling — data tells the what, you need to tell the why.",
    pm_crack_advice:
      "If you're coming from analytics or data science, transitioning to PM is very achievable. Demonstrate product sense, not just analysis. Practice product design questions and show you care about the user — not just the metric.",
  },
  {
    id: "innovator_strategist",
    name: "The Product Innovator",
    emoji: "♟️",
    tagline: "Visionary at the whiteboard",
    description:
      "You see the chessboard clearly. You're at your best when defining product vision, crafting roadmaps that align the org, and owning business outcomes. You understand markets, competition, and where to place bets.",
    strengths: ["strategy"],
    weaknesses: ["execution"],
    roles: ["Senior PM", "Principal PM", "Group PM", "CPO-track"],
    company_recs: [
      { name: "Figma",       why: "Product vision and platform strategy are at the center of their growth." },
      { name: "Notion",      why: "Long-term bets on platform and ecosystem require bold strategic thinking." },
      { name: "Shopify",     why: "Multi-sided commerce platform where roadmap decisions have enormous strategic leverage." },
      { name: "Salesforce",  why: "Enterprise suite where platform strategy and business outcome ownership are paramount." },
      { name: "Atlassian",   why: "Product-led growth model requiring long-horizon strategic thinking." },
      { name: "HubSpot",     why: "Growth through product requires visionary PMs who own business outcomes." },
      { name: "OpenAI",      why: "Defining an entirely new product category — the highest-stakes strategic challenge." },
      { name: "Anthropic",   why: "Product strategy at the frontier of AI — rare opportunity for true innovators." },
      { name: "Rippling",    why: "Platform ambition to own the entire workforce layer requires deep strategic vision." },
      { name: "Segment",     why: "Data infrastructure with a platform strategy that shapes an entire ecosystem." },
    ],
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
    interview_weakness_questions: [
      "How do you ensure your strategic vision gets translated into well-executed features?",
      "Tell me about a time a product you owned had quality or delivery issues — what did you do?",
      "How do you write specs that give engineers enough clarity to move fast without you?",
      "How do you manage scope when your grand vision runs into engineering capacity constraints?",
      "Describe a situation where you had to get into the details to unblock a team.",
      "How do you balance thinking about the future while keeping the current product healthy?",
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
    roles: ["Platform PM", "Enterprise PM", "Partnerships PM", "Internal Tools PM"],
    company_recs: [
      { name: "Salesforce",  why: "Complex enterprise org with many stakeholders — operators thrive in this environment." },
      { name: "Microsoft",   why: "Massive cross-functional programs where alignment is as important as product vision." },
      { name: "ServiceNow",  why: "Enterprise workflow product with sophisticated buyer relationships." },
      { name: "SAP",         why: "Enterprise complexity at scale — your stakeholder management skills are essential." },
      { name: "Google",      why: "Internal platform and infra teams where influencing without authority is daily work." },
      { name: "Stripe",      why: "Partnerships and platform teams require exceptional cross-functional operators." },
      { name: "Workday",     why: "HR enterprise product where change management and stakeholder alignment are core." },
      { name: "Palantir",    why: "Customer-embedded delivery model that demands elite operator skills." },
      { name: "Twilio",      why: "Platform org with complex partner and developer ecosystem relationships." },
      { name: "Zendesk",     why: "Enterprise CX platform where cross-functional alignment drives product success." },
    ],
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
    interview_weakness_questions: [
      "How do you ensure your roadmap decisions are grounded in real customer pain, not just stakeholder requests?",
      "Tell me about a time you used data to challenge an assumption you had about users.",
      "How do you build a habit of customer research into a fast-moving product cycle?",
      "Walk me through how you'd discover unmet user needs in a market you're new to.",
      "How do you distinguish between what customers say they want and what they actually need?",
      "Describe a product decision you made based primarily on qualitative insight rather than stakeholder input.",
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
    roles: ["Growth PM", "Monetization PM", "Activation PM", "Retention PM"],
    company_recs: [
      { name: "Duolingo",  why: "Growth loops and behavioral science are central to their product strategy." },
      { name: "Dropbox",   why: "Famous for growth hacking — the referral loop is a case study in the field." },
      { name: "HubSpot",   why: "Product-led growth playbook is deeply embedded in how they build and sell." },
      { name: "Loom",      why: "Viral growth mechanics built into the core product experience." },
      { name: "Figma",     why: "Collaboration drives organic growth — growth PMs own this flywheel." },
      { name: "Miro",      why: "Bottom-up enterprise growth model requiring sophisticated activation thinking." },
      { name: "Calendly",  why: "Viral loop baked into the product — every meeting invite is a growth moment." },
      { name: "Amplitude", why: "Analytics-native company where growth thinking is part of the DNA." },
      { name: "Intercom",  why: "Customer messaging product where activation and retention are the core metrics." },
      { name: "Zapier",    why: "PLG motion with deep experimentation on onboarding and activation." },
    ],
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
    interview_weakness_questions: [
      "How do you get stakeholder and leadership buy-in for a growth initiative that requires significant eng investment?",
      "Tell me about a time you had to lead a team through a difficult, low-morale period.",
      "How do you navigate conflict between the growth team's priorities and the core product team's roadmap?",
      "How do you manage up when your experiments aren't showing results yet?",
      "Describe how you build alignment across sales, marketing, and product on a go-to-market motion.",
      "How do you develop junior team members who are more execution-focused than analytically minded?",
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
      "You have strong scores across all four quadrants. You're the PM who can wear many hats, adapt to context, and operate effectively across the full spectrum. You're likely ready — or almost ready — for senior or director-level roles.",
    strengths: ["execution", "insight", "strategy", "influencing"],
    weaknesses: [],
    roles: ["Senior PM", "Group PM", "Director of Product", "VP of Product"],
    company_recs: [
      { name: "Stripe",    why: "Demands PMs who can execute AND set strategy — balance is rewarded at every level." },
      { name: "Figma",     why: "Small team with big scope — product leaders own outcomes across all dimensions." },
      { name: "Linear",    why: "High-craft environment where you need both vision and execution in the same person." },
      { name: "Notion",    why: "Platform ambition where product leaders shape company direction directly." },
      { name: "OpenAI",    why: "Frontier territory requiring PMs who can navigate strategy, execution, and influence simultaneously." },
      { name: "Shopify",   why: "Massive scope — merchant success, platform, and commerce strategy all at once." },
      { name: "Rippling",  why: "Fast-paced, full-stack product org where balanced leaders rise quickly." },
      { name: "Anthropic", why: "High-stakes product decisions requiring strategic AND execution credibility." },
      { name: "Ramp",      why: "Finance product growing fast where well-rounded PMs can own large surface areas." },
      { name: "Vercel",    why: "Developer platform where insight, strategy, and execution all matter equally." },
    ],
    strengths_detail:
      "Your balance is rare. You can write a spec AND present a vision. You understand users AND align stakeholders. Teams trust you and leadership respects you.",
    growth_areas:
      "At this level, your job is to raise the ceiling — find your spike and build a distinct point of view. Great product leaders aren't just balanced; they're exceptionally strong somewhere and solid everywhere else.",
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
    interview_weakness_questions: [
      "What's the one quadrant you feel least confident in, and what are you doing about it?",
      "Tell me about a situation where being well-rounded wasn't enough — where you needed to go deep.",
      "How do you identify and sharpen your distinctive point of view as a PM leader?",
      "Describe a time you had to make a very hard call with limited data and limited time.",
      "How do you avoid becoming a generalist who's too broad to be truly impactful?",
      "What does 'product leadership' mean to you beyond managing individual contributors?",
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
    execution: [], insight: [], strategy: [], influencing: [],
  };
  RADAR_COMPETENCIES.forEach((c) => {
    if (scores[c.id] !== undefined) quadrants[c.quadrant].push(scores[c.id]);
  });
  return {
    execution:   avg(quadrants.execution),
    insight:     avg(quadrants.insight),
    strategy:    avg(quadrants.strategy),
    influencing: avg(quadrants.influencing),
  };
}

function avg(arr: number[]): number {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function matchArchetype(scores: Record<string, number>): Archetype {
  const quadrantScores = getQuadrantScores(scores);
  const allHigh = Object.values(quadrantScores).every((s) => s >= 3.8);
  if (allHigh) return ARCHETYPES.find((a) => a.id === "product_leader")!;

  const sorted = Object.entries(quadrantScores).sort((a, b) => b[1] - a[1]) as [QuadrantKey, number][];
  const topQuadrant = sorted[0][0];
  const secondQuadrant = sorted[1][0];

  if (scores["fluency_with_data"] >= 4 && (scores["business_outcome"] >= 4 || scores["strategic_impact"] >= 4)) {
    return ARCHETYPES.find((a) => a.id === "growth_pm")!;
  }

  if (
    (topQuadrant === "insight" && secondQuadrant === "strategy") ||
    (topQuadrant === "strategy" && secondQuadrant === "insight")
  ) {
    if (scores["fluency_with_data"] >= 4) return ARCHETYPES.find((a) => a.id === "scientist")!;
  }

  const archetypeMap: Partial<Record<QuadrantKey, string>> = {
    execution:   "builder",
    insight:     "innovator",
    strategy:    "innovator_strategist",
    influencing: "operator",
  };
  return ARCHETYPES.find((a) => a.id === archetypeMap[topQuadrant])!;
}

// Encode/decode scores for shareable URLs
export function encodeScores(scores: Record<string, number>): string {
  const ordered = RADAR_COMPETENCIES.map((c) => scores[c.id] ?? 1);
  return btoa(ordered.join(","));
}

export function decodeScores(encoded: string): Record<string, number> {
  try {
    const values = atob(encoded).split(",").map(Number);
    return Object.fromEntries(RADAR_COMPETENCIES.map((c, i) => [c.id, values[i] ?? 1]));
  } catch {
    return Object.fromEntries(RADAR_COMPETENCIES.map((c) => [c.id, 1]));
  }
}
