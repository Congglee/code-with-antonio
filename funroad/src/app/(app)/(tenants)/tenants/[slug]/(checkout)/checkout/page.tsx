import CheckoutView from "@/modules/checkout/ui/views/checkout-view";

interface CheckoutProps {
  params: Promise<{ slug: string }>;
}

export default async function Checkout({ params }: CheckoutProps) {
  const { slug } = await params;

  return <CheckoutView tenantSlug={slug} />;
}
