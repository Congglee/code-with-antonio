import { Document } from "@/types";

export type Project = Document & {
  name: string;
  imageUrl: string;
  workspaceId: string;
};
