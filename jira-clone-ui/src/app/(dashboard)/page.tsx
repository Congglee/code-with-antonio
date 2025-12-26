import { redirect } from "next/navigation";
import { mockWorkspaces } from "@/mocks";

export default function Home() {
  const workspaces = {
    documents: mockWorkspaces,
    total: mockWorkspaces.length,
  };

  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
