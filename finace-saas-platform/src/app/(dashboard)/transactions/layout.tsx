import { Suspense } from "react";

interface TransactionsPageLayoutProps {
  children: React.ReactNode;
}

export default function TransactionsPageLayout({
  children,
}: TransactionsPageLayoutProps) {
  return <Suspense>{children}</Suspense>;
}
