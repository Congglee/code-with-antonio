"use client";

import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export default function CheckoutButton({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckoutButtonProps) {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button variant="elevated" className={cn("bg-white", className)} asChild>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon />
        {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
}
