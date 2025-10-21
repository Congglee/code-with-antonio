import StudioLayout from "@/modules/studio/ui/layouts/studio-layout";
import { TRPCProvider } from "@/trpc/client";

interface StudioLayoutProps {
  children: React.ReactNode;
}

export default function StudioPageLayout({ children }: StudioLayoutProps) {
  return (
    <StudioLayout>
      <TRPCProvider>{children}</TRPCProvider>
    </StudioLayout>
  );
}
