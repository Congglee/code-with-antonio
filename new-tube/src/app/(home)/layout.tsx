import HomeLayout from "@/modules/home/ui/layouts/home-layout";
import { TRPCProvider } from "@/trpc/client";

interface HomePageLayoutProps {
  children: React.ReactNode;
}

export default function HomePageLayout({ children }: HomePageLayoutProps) {
  return (
    <HomeLayout>
      <TRPCProvider>{children}</TRPCProvider>
    </HomeLayout>
  );
}
