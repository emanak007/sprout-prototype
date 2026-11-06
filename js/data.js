// All sample numbers for the prototype live here.
// Change figures in this file only; the screens read from window.DEMO.
// Every number is illustrative sample data, not a real customer's.

window.DEMO = {
  org: {
    name: "Sample Retail Ltd",
    month: "October 2026",
    peerGroup: "42 similar retail orgs in UK & EU",
  },

  rating: {
    scale: ["A", "B", "C", "D", "E"],
    current: "C",
    next: "B",
    fixesToNext: 2,
  },

  metrics: {
    carbonPerOutcome: 4.2, // g CO2e per resolved outcome
    peerCarbonPerOutcome: 3.1,
    costPerOutcome: 0.31, // £ per resolved outcome
    peerCostPerOutcome: 0.24,
    staleDataPct: 38, // % of records not used in 2+ years
  },

  // Top fixes on the dashboard. savingGBP is per year, co2t is tonnes CO2e per year.
  fixes: [
    {
      id: "model",
      title: 'Use a smaller model for the "Order status" topic',
      area: "Agentforce",
      note: "mostly simple lookups",
      savingGBP: 6200,
      co2t: 1.1,
      screen: "agent",
    },
    {
      id: "archive",
      title: "Archive 2.1M records untouched for 2+ years",
      area: "Data 360",
      note: "reversible for 90 days",
      savingGBP: 8900,
      co2t: 0.8,
    },
    {
      id: "flows",
      title: "Retire 14 flows with no runs in 6 months",
      area: "Automation",
      note: "",
      savingGBP: 1400,
      co2t: 0.2,
    },
  ],

  // Agentforce Builder screen with the in-flow tip.
  agent: {
    name: "Customer Service Agent",
    topics: ["Order status", "Returns & refunds", "Product questions", "Escalate to human"],
    flaggedTopic: "Order status",
    models: ["Large reasoning model", "Small fast model"],
    knowledgeSources: ["All articles (12,400)", "Order articles only (310)"],
    tip: {
      title: "Efficiency tip: this topic is over-powered",
      body:
        'Most "Order status" requests are simple lookups. In a test on last month\'s conversations, a small model with order articles only gave the same answer 97% of the time.',
      carbonBefore: 4.2,
      carbonAfter: 1.9,
      savingGBP: 6200,
      co2t: 1.1,
    },
  },

  // Report & badge screen. "after" marks months after the fixes were applied.
  trend: [
    { month: "Oct", value: 4.2, after: false },
    { month: "Nov", value: 4.0, after: false },
    { month: "Dec", value: 3.3, after: true },
    { month: "Jan", value: 3.0, after: true },
    { month: "Feb", value: 2.8, after: true },
    { month: "Mar", value: 2.6, after: true },
  ],

  badge: {
    from: "C",
    to: "B",
    name: "Agentforce Efficiency Rating",
    detail: "AI efficiency 16% better than UK retail median · SCI method · Q1 2027",
    rules: 'Specific, measured and dated. Never says "green" or "carbon neutral". Re-scored every quarter.',
  },

  trees: 1200,

  // Step 1, Notice: the monthly email to admins.
  email: {
    from: "Efficiency Rating",
    to: "Salesforce admin, Sample Retail Ltd",
    date: "1 November 2026",
    intro: "Here is your org's Efficiency Rating for October 2026.",
    cta: "See your rating",
  },

  // Step 5, Share: the public page behind "Verify this rating".
  verification: {
    status: "Valid",
    scope: "Agentforce AI efficiency only. Does not rate the company's wider footprint.",
    method: "SCI (Green Software Foundation): g CO₂e per resolved outcome",
    period: "Q1 2027 (January to March)",
    nextReview: "Re-scored every quarter",
    uses: ["PR", "Tenders and supplier questionnaires"],
  },

  // Canned answers for the Efficiency Agent. First keyword match wins.
  agentAnswers: [
    {
      keywords: ["drop", "fell", "worse", "october"],
      answer:
        "The new returns agent takes 9 actions per case on average, versus 4 for similar agents. Most come from repeated knowledge searches.",
    },
    {
      keywords: ["calculate", "sci", "method", "how"],
      answer:
        "We convert credits, storage and flow runs into kWh, multiply by your hosting region's grid carbon intensity, then divide by successful outcomes (the SCI method).",
    },
    {
      keywords: ["b", "improve", "next", "better"],
      answer:
        'Applying the top 2 fixes would move you to B. The biggest single change is the smaller model for "Order status".',
    },
  ],
  defaultAnswer:
    "In the full product I'd answer from your org's usage data. In this prototype, try asking why the score dropped or how it is calculated.",
};
