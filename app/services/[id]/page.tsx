"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Container, IconButton, CircularProgress, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ServiceDetailSidebar from "../../components/ServiceDetailSidebar";
import ServiceDetailContent from "../../components/ServiceDetailContent";
import Navbar from "../../user/components/Navbar";
import axiosClient from "../../lib/api";

const ServiceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Public category data integration
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loadingCategory, setLoadingCategory] = useState(false);

  // Helper to map route parameter ID to the exact category name expected by the public backend endpoint
  const getCategoryName = (id: string) => {
    if (!id) return "";
    const mapping: Record<string, string> = {
      "plumber": "Plumber",
      "electrician": "Electrician",
      "beautician": "Beautician",
      "salon": "Beautician",
      "ac-repair": "AC Repair",
      "carpenter": "Carpenter",
      "cleaning": "Cleaning",
      "painter": "Painter",
      "pest-control": "Pest Control",
      "salon-for-women": "Salon for Women",
      "salon-for-men": "Salon for Men",
      "massage-&-spa": "Massage & Spa",
      "massage": "Massage & Spa",
      "spa": "Massage & Spa",
      "appliance-repair": "Appliance Repair",
      "home-security": "Home Security",
      "gardening": "Gardening"
    };

    const normalized = id.toLowerCase().trim();
    return mapping[normalized] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  useEffect(() => {
    if (!serviceId) return;

    const fetchCategory = async () => {
      setLoadingCategory(true);
      try {
        const name = getCategoryName(serviceId);
        console.log(`[API Integration] Fetching category details for: ${name}`);
        const res = await axiosClient.get(`/public/categories/${name}`);
        if (res.data?.success) {
          setCategoryData(res.data.data);
          console.log("[API Integration] Successfully fetched category data:", res.data.data);
        } else {
          console.warn("[API Integration] Failed response:", res.data?.message);
        }
      } catch (err) {
        // Silently catch error and fall back to local mock data
      } finally {
        setLoadingCategory(false);
      }
    };

    fetchCategory();
  }, [serviceId]);

  // Helper to map API category data to ServiceDetail interface
  const mapApiCategoryToServiceDetail = (apiData: any) => {
    if (!apiData) return null;

    // Helper to format/prepend backend domain to upload assets
    const processAssetUrl = (url: string) => {
      if (!url) return "";
      if (url.startsWith("/uploads/")) {
        return `https://shoptera-backend.onrender.com${url}`;
      }
      return url;
    };

    // Map subcategories as individual service package cards
    const mappedPackages = (apiData.subcategories || []).map((sub: any) => {
      return {
        id: `pkg-${sub.id}`,
        title: sub.name,
        description: sub.description || `Professional ${sub.name} services`,
        price: sub.price || 499,
        originalPrice: sub.original_price || undefined,
        duration: sub.duration || "45 mins",
        rating: sub.rating || 4.8,
        reviews: `${sub.review_count || 120} reviews`,
        image: processAssetUrl(sub.image_path || sub.image) || "/assets/images/placeholder.svg"
      };
    });

    return {
      id: String(apiData.id),
      name: apiData.name,
      description: apiData.description || undefined,
      rating: apiData.rating || 4.89,
      totalBookings: apiData.total_bookings || "1.2 M bookings",
      earliest: apiData.earliest || "Today, 3:00 PM",
      earliestDay: apiData.earliest_day || "Today",
      image: processAssetUrl(apiData.banner_image_path || apiData.image_path) || "/assets/images/placeholder.svg",
      categories: [
        {
          id: String(apiData.id),
          name: apiData.name,
          image: processAssetUrl(apiData.icon_path || apiData.image_path) || "/assets/images/placeholder.svg",
          packages: mappedPackages
        }
      ],
      offers: [],
      trustMarkers: [
        "Verified Technicians",
        "Up to 30 days warranty",
        "Transparent Pricing"
      ]
    };
  };

  // Determine final service object
  const service = categoryData ? mapApiCategoryToServiceDetail(categoryData) : null;

  // Automatically select the first category on mount or when data changes
  useEffect(() => {
    if (service && service.categories && service.categories.length > 0 && !selectedCategory) {
      setSelectedCategory(service.categories[0].id);
    }
  }, [service, selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);

    // Scroll to the category section
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  if (loadingCategory) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFA", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            gap: 2,
            py: 12,
          }}
        >
          <CircularProgress sx={{ color: "#6E42E5" }} size={48} thickness={4} />
          <Typography sx={{ color: "#545454", fontWeight: 500, fontSize: "14px" }}>
            Loading service details...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!service) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFA", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            gap: 2,
            py: 12,
          }}
        >
          <Typography sx={{ color: "#545454", fontWeight: 500, fontSize: "16px" }}>
            Category details not found.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFA" }}>
      {/* Header */}
      <Navbar />

      {/* Back Button Header */}
      <Box
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #E3E3E3",
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 2, md: 4 }, position: "relative" }}>
          {/* Left Sidebar - 30% */}
          <ServiceDetailSidebar
            service={service}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />

          {/* Right Content - 70% */}
          <ServiceDetailContent
            service={service}
            ref={contentRef}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceDetailPage;
