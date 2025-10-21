import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import MainSection from "@/modules/home/ui/components/home-sidebar/main-section";
import PersonalSection from "@/modules/home/ui/components/home-sidebar/personal-section";
import SubscriptionsSection from "@/modules/subscriptions/ui/sections/subscriptions-section";
import { SignedIn } from "@clerk/nextjs";

export default function HomeSidebar() {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSection />
        <SignedIn>
          <>
            <Separator />
            <SubscriptionsSection />
          </>
        </SignedIn>
      </SidebarContent>
    </Sidebar>
  );
}
