"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { mockProducts } from "@/data/mock";
import PricingCard from "@/modules/premium/ui/components/pricing-card";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function UpgradeView() {
  const products = mockProducts;

  // UI-only template: mock current subscription.
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState<
    string | null
  >(null);

  const currentSubscription = useMemo(() => {
    if (!currentSubscriptionId) return null;
    return products.find((p) => p.id === currentSubscriptionId) ?? null;
  }, [currentSubscriptionId, products]);

  return (
    <div className="flex-1 align-content py-4 px-4 md:px-8 flex flex-col gap-y-10">
      <div className="mt-4 flex-1 flex-col gap-y-10 items-center flex">
        <h5 className="font-medium text-2xl md:text-3xl">
          You are on the{" "}
          <span className="font-semibold text-primary">
            {currentSubscription?.name ?? "Free"}
          </span>{" "}
          plan.
        </h5>
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => {
            const isCurrentProduct = currentSubscription?.id === product.id;
            const isPremium = !!currentSubscription;

            let buttonText = "Upgrade";

            let onClick = () => {
              toast.success("Checkout (mock)", {
                description:
                  "This is a UI-only template. No billing request was made.",
              });
              setCurrentSubscriptionId(product.id === "prod_free" ? null : product.id);
            };

            if (isCurrentProduct) {
              buttonText = "Manage";
              onClick = () =>
                toast.message("Manage subscription (mock)", {
                  description:
                    "This is a UI-only template. No billing portal was opened.",
                });
            } else if (isPremium) {
              buttonText = "Change Plan";
              onClick = () => {
                toast.message("Change plan (mock)", {
                  description:
                    "This is a UI-only template. No billing portal was opened.",
                });
                setCurrentSubscriptionId(product.id === "prod_free" ? null : product.id);
              };
            }

            return (
              <PricingCard
                key={product.id}
                variant={
                  product.metadata.variant === "highlighted"
                    ? "highlighted"
                    : "default"
                }
                title={product.name}
                price={
                  product.prices[0].amountType === "fixed"
                    ? product.prices[0].priceAmount / 100
                    : 0
                }
                description={product.description}
                priceSuffix={`/${product.prices[0].recurringInterval}`}
                features={product.benefits.map(
                  (benefit) => benefit.description
                )}
                badge={product.metadata.badge as string | null}
                buttonText={buttonText}
                onClick={onClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function UpgradeViewLoading() {
  return (
    <LoadingState title="Loading" description="This may take a few seconds" />
  );
}

export function UpgradeViewError() {
  return <ErrorState title="Error" description="Plaese try again later" />;
}
