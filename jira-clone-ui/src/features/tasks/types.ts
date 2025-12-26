import { Document } from "@/types";
import { Project } from "@/features/projects/types";
import { Member } from "@/features/members/types";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export type Task = Document & {
  name: string;
  status: TaskStatus;
  assigneeId: string;
  workspaceId: string;
  projectId: string;
  position: number;
  dueDate: string;
  description?: string;
  project: Project;
  assignee: Member;
};
