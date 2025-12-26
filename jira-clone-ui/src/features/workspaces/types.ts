import { Document } from "@/types";

export type Workspace = Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
