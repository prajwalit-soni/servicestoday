"use client";

import React, { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Container, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ServiceDetailSidebar from "../../components/ServiceDetailSidebar";
import ServiceDetailContent from "../../components/ServiceDetailContent";
import Navbar from "../../user/components/Navbar";
import { serviceDetails } from "../../lib/mockServiceData";

const ServiceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Get service data based on ID
  const service = serviceDetails[serviceId] || serviceDetails["salon"];

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
