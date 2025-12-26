import GeneratedAvatar from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockUser } from "@/data/mock";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DashboardUserButton() {
  const router = useRouter();

  const isMobile = useIsMobile();

  const onLogout = () => {
    toast.message("UI template", {
      description: "Logout is mocked in this UI-only template.",
    });
    router.push("/sign-in");
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-1/2">
          {mockUser.image ? (
            <Avatar className="size-9 mr-3">
              <AvatarImage src={mockUser.image ?? ""} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={mockUser.name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{mockUser.name}</p>
            <p className="text-xs truncate w-full">{mockUser.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{mockUser.name}</DrawerTitle>
            <DrawerDescription>{mockUser.email}</DrawerDescription>
            <DrawerFooter>
              <Button
                variant="outline"
                onClick={() => {
                  toast.message("UI template", {
                    description: "Billing portal is mocked in this UI-only template.",
                  });
                }}
              >
                <CreditCardIcon className="size-4 text-black" />
                Billing
              </Button>
              <Button onClick={onLogout}>
                <LogOutIcon className="size-4 text-white" />
                Logout
              </Button>
            </DrawerFooter>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
        {mockUser.image ? (
          <Avatar className="size-9 mr-3">
            <AvatarImage src={mockUser.image ?? ""} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={mockUser.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{mockUser.name}</p>
          <p className="text-xs truncate w-full">{mockUser.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72 p-2 m-2">
        <div className="flex flex-col gap-1">
          <span className="font-medium truncate">{mockUser.name}</span>
          <span className="text-sm font-normal text-muted-foreground truncate">
            {mockUser.email}
          </span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            toast.message("UI template", {
              description: "Billing portal is mocked in this UI-only template.",
            });
          }}
          className="cursor-pointer flex items-center justify-between"
        >
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={onLogout}
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
