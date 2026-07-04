"use client";

import React, { useState, forwardRef } from "react";
import { Box, Typography, IconButton, Button, Chip } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ServiceDetail } from "../lib/mockServiceData";
import ServicePackageCard from "./ServicePackageCard";
import CartSidebar from "./CartSidebar";
import ImageWithFallback from "./ImageWithFallback";

interface ServiceDetailContentProps {
  service: ServiceDetail;
}

const ServiceDetailContent = forwardRef<HTMLDivElement, ServiceDetailContentProps>(
  ({ service }, ref) => {
    const [carouselIndex, setCarouselIndex] = useState(0);

    // Dynamic carousel images based on loaded category
    const carouselImages = [
      {
        image: service.image || "/assets/images/placeholder-banner.svg",
        title: `Premium ${service.name} Services at Home`,
        description: `Get professional ${service.name.toLowerCase()} services in the comfort of your home`,
        cta: "Book Now",
      },
      {
        image: "/assets/images/placeholder-banner.svg",
        title: "Expert Professionals",
        description: `Trained and verified ${service.name.toLowerCase()} experts`,
        cta: "Learn More",
      },
      {
        image: "/assets/images/placeholder-banner.svg",
        title: "Safe & Hygienic",
        description: "100% sanitized equipment and products",
        cta: "View Safety",
      },
    ];

    const handlePrevCarousel = () => {
      setCarouselIndex((prev) => (prev > 0 ? prev - 1 : carouselImages.length - 1));
    };

    const handleNextCarousel = () => {
      setCarouselIndex((prev) => (prev < carouselImages.length - 1 ? prev + 1 : 0));
    };

    return (
      <Box
        ref={ref}
        sx={{
          flex: 1,
          width: { xs: "100%", md: "70%" },
          borderLeft: { xs: "none", md: "1px solid #EDEDED" },
          pl: { xs: 0, md: 4 },
          pt: { xs: 4, md: 0 },
        }}
      >
        {/* Carousel Section - Full Width */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            mb: 4,
            height: { xs: "220px", md: "400px" },
            bgcolor: "#F5F5F5",
          }}
        >
          <ImageWithFallback
            src={carouselImages[carouselIndex].image || "/assets/images/placeholder-banner.svg"}
            fallback="/assets/images/placeholder-banner.svg"
            alt={carouselImages[carouselIndex].title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Carousel Overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              color: "white",
              p: 4,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {carouselImages[carouselIndex].title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {carouselImages[carouselIndex].description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#6E42E5",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#5932C8",
                },
              }}
            >
              {carouselImages[carouselIndex].cta}
            </Button>
          </Box>

          {/* Navigation Arrows */}
          <IconButton
            onClick={handlePrevCarousel}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={handleNextCarousel}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Carousel Indicators */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
            }}
          >
            {carouselImages.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: index === carouselIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: index === carouselIndex ? "white" : "rgba(255,255,255,0.5)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => setCarouselIndex(index)}
              />
            ))}
          </Box>
        </Box>

        {/* Content Below Carousel - Split 60-40 */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          {/* Left Side - Service Categories - 60% */}
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            {/* Service Categories and Packages */}
            {service.categories.map((category) => (
              <Box
                key={category.id}
                id={`category-${category.id}`}
                sx={{ mb: 6, scrollMarginTop: "100px" }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    fontSize: "28px",
                    mb: 3,
                    color: "#0F0F0F",
                  }}
                >
                  {category.name}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {category.packages.map((pkg) => (
                    <ServicePackageCard key={pkg.id} package={pkg} />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Right Side - Cart Sidebar - 40% */}
          <CartSidebar />
        </Box>
      </Box>
    );
  }
);

ServiceDetailContent.displayName = "ServiceDetailContent";

export default ServiceDetailContent;
