import { Document } from "@/types";

export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type Member = Document & {
  workspaceId: string;
  userId: string;
  role: MemberRole;
  name: string;
  email: string;
};
