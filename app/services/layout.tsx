import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Shoptera",
  description: "Book trusted professionals for all your service needs",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
