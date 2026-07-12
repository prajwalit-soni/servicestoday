"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/app/user/components/Navbar";
import { serviceProviders } from "@/app/lib/servicesData";
import ProviderDetailContent from "@/app/components/ProviderDetailContent";
import axiosClient from "@/app/lib/api";
import { CircularProgress, Box, Typography } from "@mui/material";

interface ProviderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const [providerId, setProviderId] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(p => setProviderId(p.id));
  }, [params]);

  useEffect(() => {
    if (!providerId) return;

    const fetchProviderDetail = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/public/providers/detail/${providerId}`);
        if (res.data?.success && res.data?.data) {
          const d = res.data.data;
          
          const mapped = {
            id: d.provider.id,
            name: d.provider.business_name,
            category: d.provider.category?.name || "Service",
            address: d.address || "",
            area: d.address?.split(",")?.[2]?.trim() || "",
            city: d.address?.split(",")?.[3]?.trim() || "Hyderabad",
            rating: d.provider.rating || 4.5,
            reviewCount: d.reviews?.length || 0,
            image: d.listings?.[0]?.cover_image_path || d.provider.profile_image_path || "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
            images: d.listings?.[0]?.images && d.listings[0].images.length > 0
              ? d.listings[0].images.map((img: any) => img.image_url)
              : [d.provider.profile_image_path || "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400"],
            phone: d.phone || "",
            isVerified: d.provider.is_verified || false,
            isOpen: d.is_open,
            closingTime: d.closing_opening_text,
            tags: d.provider.is_verified ? ["Verified", "Top Rated"] : ["Top Rated"],
            about: d.provider.about || undefined,
            services: d.services && d.services.length > 0
              ? d.services.map((s: any) => ({
                  name: s.title,
                  price: `₹${s.price}`,
                  description: s.description || "Professional service package",
                }))
              : undefined,
            reviews: d.reviews && d.reviews.length > 0
              ? d.reviews.map((r: any) => ({
                  name: r.reviewer_name || "Customer",
                  rating: r.rating,
                  date: new Date(r.created_at).toLocaleDateString(),
                  comment: r.review,
                  avatar: (r.reviewer_name || "C").charAt(0),
                }))
              : undefined,
            operatingHours: d.availabilities && d.availabilities.length > 0
              ? d.availabilities.map((a: any) => ({
                  day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][a.day_of_week] || "Day",
                  hours: `${a.start_time} - ${a.end_time}`,
                }))
              : undefined,
            whyChooseUs: d.why_choose_us,
          };
          setProvider(mapped);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Failed to fetch provider detail, falling back to mock:", err);
        const mock = serviceProviders.find(p => p.id === parseInt(providerId));
        setProvider(mock || null);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderDetail();
  }, [providerId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", gap: 2 }}>
          <CircularProgress sx={{ color: "#6E42E5" }} />
          <Typography sx={{ color: "#757575", fontWeight: 500 }}>Loading provider details...</Typography>
        </Box>
      </>
    );
  }

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
