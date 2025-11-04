"use client";

import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShoppingCartIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
    loading: () => (
      <Button className="bg-white text-black" disabled>
        <ShoppingCartIcon />
      </Button>
    ),
  },
);

interface NavbarProps {
  slug: string;
}

export default function Navbar({ slug }: NavbarProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <nav className="h-20 border-b bg-white font-medium">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {data.image?.url && (
            <Image
              src={data.image.url}
              width={32}
              height={32}
              alt={slug}
              className="size-8 shrink-0 rounded-full border"
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>

        <CheckoutButton tenantSlug={slug} hideIfEmpty />
      </div>
    </nav>
  );
}

export function NavbarSkeleton() {
  return (
    <nav className="h-20 border-b bg-white font-medium">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
        <div />
        <Button className="bg-white text-black" disabled>
          <ShoppingCartIcon />
        </Button>
      </div>
    </nav>
  );
}
