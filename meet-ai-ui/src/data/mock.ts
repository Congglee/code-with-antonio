export type MockUser = {
  name: string;
  email: string;
  image?: string | null;
};

export type MockAgent = {
  id: string;
  name: string;
  instructions: string;
  meetingCount: number;
};

export type MeetingStatus =
  | "upcoming"
  | "active"
  | "processing"
  | "completed"
  | "cancelled";

export type MockMeeting = {
  id: string;
  name: string;
  status: MeetingStatus;
  startedAt?: Date | null;
  duration?: number | null; // seconds
  recordingUrl?: string | null;
  agent: {
    id: string;
    name: string;
  };
  summary?: string;
};

export type MockProduct = {
  id: string;
  name: string;
  description?: string | null;
  prices: Array<{
    amountType: "fixed";
    priceAmount: number; // cents
    recurringInterval: "month" | "year";
  }>;
  benefits: Array<{ description: string }>;
  metadata: {
    variant?: "default" | "highlighted";
    badge?: string | null;
  };
};

export const mockUser: MockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  image: null,
};

export const mockAgents: MockAgent[] = [
  {
    id: "agent_1",
    name: "Meeting Assistant",
    instructions: "Summarize key points and action items.",
    meetingCount: 12,
  },
  {
    id: "agent_2",
    name: "Sales Coach",
    instructions: "Help with objection handling and next steps.",
    meetingCount: 4,
  },
  {
    id: "agent_3",
    name: "Math Tutor",
    instructions: "Explain concepts clearly and step-by-step.",
    meetingCount: 1,
  },
];

const baseSummary = `# Summary

## Key Points
- Discussed the project milestones.
- Reviewed blockers and owners.

## Action Items
1. Finalize UI copy.
2. Prepare next sprint board.
`;

export const mockMeetings: MockMeeting[] = [
  {
    id: "meeting_1",
    name: "Weekly Sync",
    status: "completed",
    startedAt: new Date(),
    duration: 1380,
    recordingUrl: null,
    agent: { id: "agent_1", name: "Meeting Assistant" },
    summary: baseSummary,
  },
  {
    id: "meeting_2",
    name: "Customer Call",
    status: "upcoming",
    startedAt: null,
    duration: null,
    recordingUrl: null,
    agent: { id: "agent_2", name: "Sales Coach" },
  },
  {
    id: "meeting_3",
    name: "Product Review",
    status: "processing",
    startedAt: new Date(),
    duration: 540,
    recordingUrl: null,
    agent: { id: "agent_1", name: "Meeting Assistant" },
  },
];

export const mockProducts: MockProduct[] = [
  {
    id: "prod_free",
    name: "Free",
    description: "Get started with basic features.",
    prices: [{ amountType: "fixed", priceAmount: 0, recurringInterval: "month" }],
    benefits: [
      { description: "Up to 3 agents" },
      { description: "Up to 10 meetings" },
      { description: "Basic summaries" },
    ],
    metadata: { variant: "default", badge: null },
  },
  {
    id: "prod_pro",
    name: "Pro",
    description: "Best for individuals and small teams.",
    prices: [
      { amountType: "fixed", priceAmount: 1900, recurringInterval: "month" },
    ],
    benefits: [
      { description: "Unlimited agents" },
      { description: "Unlimited meetings" },
      { description: "Advanced summaries" },
      { description: "Priority support" },
    ],
    metadata: { variant: "highlighted", badge: "Most popular" },
  },
  {
    id: "prod_team",
    name: "Team",
    description: "Collaboration and admin controls.",
    prices: [
      { amountType: "fixed", priceAmount: 4900, recurringInterval: "month" },
    ],
    benefits: [
      { description: "Team workspaces" },
      { description: "Role-based access" },
      { description: "Team analytics" },
    ],
    metadata: { variant: "default", badge: null },
  },
];

export const mockFreeUsage = {
  agentCount: 2,
  meetingCount: 5,
};


