"use client";

import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/app/user/components/Navbar";
import { serviceProviders } from "@/app/lib/servicesData";
import ProviderDetailContent from "@/app/components/ProviderDetailContent";

interface ProviderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const [providerId, setProviderId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then(p => setProviderId(p.id));
  }, [params]);

  if (!providerId) {
    return null;
  }

  const provider = serviceProviders.find(p => p.id === parseInt(providerId));

  if (!provider) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProviderDetailContent provider={provider} />
    </>
  );
}
