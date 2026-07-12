"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import ServiceProviderCard from "./ServiceProviderCard";
import { serviceProviders, ServiceProvider } from "../lib/servicesData";
import axiosClient from "../lib/api";

interface ServicesSidebarProps {
  selectedCategory?: string;
}

const ServicesSidebar: React.FC<ServicesSidebarProps> = ({ selectedCategory }) => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get("/public/listings", {
          params: {
            limit: 100,
          }
        });
        if (res.data?.success && Array.isArray(res.data?.data)) {
          const mapped = res.data.data.map((l: any) => ({
            id: l.provider_id,
            name: l.business_name,
            category: l.category_name || "Service",
            address: l.address || "",
            area: l.address?.split(",")?.[2]?.trim() || "",
            city: l.address?.split(",")?.[3]?.trim() || "Hyderabad",
            rating: l.rating || 4.5,
            reviewCount: 120,
            image: l.cover_image_path || l.logo_path || "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
            images: l.images && l.images.length > 0 
              ? l.images.map((img: any) => img.image_url)
              : [l.cover_image_path || "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400"],
            phone: l.phone || "",
            isVerified: l.is_verified || false,
            isOpen: true,
            closingTime: "9:00 pm",
            tags: l.is_verified ? ["Verified", "Top Rated"] : ["Top Rated"],
          }));
          setProviders(mapped);
        }
      } catch (err) {
        console.error("Error fetching providers from backend, using mock fallback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  const activeProviders = providers.length > 0 ? providers : serviceProviders;
  const filteredProviders = selectedCategory && selectedCategory !== "All"
    ? activeProviders.filter(provider => provider.category.toLowerCase() === selectedCategory.toLowerCase())
    : activeProviders;

  return (
    <Box sx={{ position: "sticky", top: 140 }}>
      {/* Service Providers Section */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
          overflow: "hidden",
          mb: 3,
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "16px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "white",
              fontSize: "1rem",
            }}
          >
            Service Providers Near You
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "0.8rem",
            }}
          >
            Verified professionals in your area
          </Typography>
        </Box>

        {/* Provider List */}
        <Box sx={{ padding: "16px", maxHeight: "calc(100vh - 280px)", overflowY: "auto" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={30} sx={{ color: "#667eea" }} />
            </Box>
          ) : filteredProviders.length === 0 ? (
            <Typography variant="body2" sx={{ color: "#757575", textAlign: "center", py: 2 }}>
              No service providers found.
            </Typography>
          ) : (
            filteredProviders.slice(0, 6).map((provider) => (
              <ServiceProviderCard key={provider.id} provider={provider} />
            ))
          )}
          
          {!loading && filteredProviders.length > 6 && (
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              href={`/user/providers?category=${selectedCategory || "All"}`}
              sx={{
                mt: 2,
                borderColor: "#667eea",
                color: "#667eea",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#5568d3",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              View {filteredProviders.length - 6} More Providers
            </Button>
          )}
        </Box>
      </Paper>

      {/* Support Card */}
      <Paper
        sx={{
          borderRadius: "12px",
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          padding: "20px",
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: "0.95rem" }}>
          24/7 Customer Support
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, opacity: 0.9, fontSize: "0.85rem" }}>
          Need help? Call us anytime! Toll Free
        </Typography>
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "7px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: 2 }}>
            1234567890
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ServicesSidebar;
