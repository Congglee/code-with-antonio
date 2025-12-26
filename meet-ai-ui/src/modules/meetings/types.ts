import type { MockMeeting } from "@/data/mock";

// UI-only template types (no backend, no tRPC).
export type MeetingGetOne = MockMeeting;
export type MeetingGetMany = MockMeeting[];

export enum MeetingStatus {
  Upcoming = "upcoming",
  Active = "active",
  Completed = "completed",
  Processing = "processing",
  Cancelled = "cancelled",
}

export type StreamTranscriptItem = {
  speaker_id: string;
  type: string;
  text: string;
  start_ts: number;
  stop_ts: number;
};
