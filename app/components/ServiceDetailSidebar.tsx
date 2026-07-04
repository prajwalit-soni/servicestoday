"use client";

import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ImageWithFallback from "./ImageWithFallback";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ServiceDetail } from "../lib/mockServiceData";

interface ServiceDetailSidebarProps {
  service: ServiceDetail;
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const ServiceDetailSidebar: React.FC<ServiceDetailSidebarProps> = ({
  service,
  selectedCategory,
  onCategoryClick,
}) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "30%" },
        position: { xs: "static", md: "sticky" },
        top: 80,
        height: "fit-content",
        maxHeight: { xs: "none", md: "calc(100vh - 100px)" },
        overflowY: "auto",
      }}
    >
      {/* Service Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "44px",
            mb: 1,
            color: "#0F0F0F",
          }}
        >
          {service.name}
        </Typography>

        {service.description && (
          <Typography
            sx={{
              fontSize: "14px",
              color: "#757575",
              mb: 2,
              lineHeight: "20px",
            }}
          >
            {service.description}
          </Typography>
        )}

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <StarIcon sx={{ color: "#0F0F0F", fontSize: 20 }} />
          <Typography
            sx={{
              fontSize: "12px",
              color: "#0F0F0F",
              fontWeight: 400,
            }}
          >
            {service.rating} ({service.totalBookings})
          </Typography>
        </Box>

        {/* Earliest Time */}
        <Box
          sx={{
            display: "inline-flex",
            border: "1px solid #E3E3E3",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              bgcolor: "#EDF7F2",
              px: 1.5,
              py: 0.75,
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 16, color: "#07794C" }} />
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#07794C",
              }}
            >
              Earliest
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "white",
              px: 1.5,
              py: 0.75,
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#0F0F0F",
              }}
            >
              {service.earliest}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Select a Service - Sticky Section */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "8px",
          p: 2,
          border: "1px solid #E3E3E3",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#757575",
            mb: 2,
          }}
        >
          Select a service
        </Typography>

        {/* Category Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(4, 1fr)", sm: "repeat(5, 1fr)", md: "repeat(3, 1fr)" },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {service.categories.map((category) => (
            <Box
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                sx={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  mb: 1,
                  mx: "auto",
                  bgcolor: "#F5F5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageWithFallback
                  src={category.image || "/assets/images/placeholder.svg"}
                  fallback="/assets/images/placeholder.svg"
                  alt={category.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#0F0F0F",
                  lineHeight: "16px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {category.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ServiceDetailSidebar;
