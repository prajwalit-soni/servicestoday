"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ServiceProvider } from "../lib/servicesData";
import ImageWithFallback from "./ImageWithFallback";

interface ServiceProviderCardProps {
  provider: ServiceProvider;
}

const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  provider,
}) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === provider.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? provider.images.length - 1 : prev - 1,
    );
  };

  const handleCardClick = () => {
    router.push(`/providers/${provider.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        display: "flex",
        mb: 2,
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          width: "140px",
          minWidth: "140px",
          height: "auto",
          overflow: "hidden",
        }}
      >
     <ImageWithFallback
  src={provider.images[currentImageIndex]}
  fallback="/assets/images/Image-alt.jpg"
  alt={provider.name}
  sx={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
/>

        {/* Image Navigation */}
        {provider.images.length > 1 && (
          <>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              sx={{
                position: "absolute",
                left: 4,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.8)",
                padding: "4px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.95)",
                },
              }}
              size="small"
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              sx={{
                position: "absolute",
                right: 4,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.8)",
                padding: "4px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.95)",
                },
              }}
              size="small"
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>

            {/* Image Counter */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "0.75rem",
              }}
            >
              {currentImageIndex + 1}/{provider.images.length}
            </Box>
          </>
        )}
      </Box>

      {/* Content Section */}
      <CardContent
        sx={{
          flex: 1,
          padding: "12px !important",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {/* Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#1a1a1a",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {provider.name}
          </Typography>
          {provider.isVerified && (
            <VerifiedIcon sx={{ fontSize: 18, color: "#10B981" }} />
          )}
        </Box>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#10B981",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              gap: 0.3,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, fontSize: "0.75rem" }}
            >
              {provider.rating.toFixed(1)}
            </Typography>
            <StarIcon sx={{ fontSize: 12 }} />
          </Box>
          <Typography
            variant="caption"
            sx={{ color: "#666", fontSize: "0.75rem" }}
          >
            {provider.reviewCount.toLocaleString()} Ratings
          </Typography>
        </Box>

        {/* Address */}
        <Box
          sx={{ display: "flex", alignItems: "flex-start", gap: 0.5, mt: 0.5 }}
        >
          <LocationOnIcon sx={{ fontSize: 14, color: "#999", mt: 0.2 }} />
          <Typography
            variant="caption"
            sx={{
              color: "#555",
              fontSize: "0.8rem",
              lineHeight: 1.4,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {provider.address}, {provider.area}, {provider.city}
          </Typography>
        </Box>

        {/* Status & Tags */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
          {provider.isOpen && (
            <>
              <Typography
                variant="caption"
                sx={{ color: "#10B981", fontWeight: 600, fontSize: "0.75rem" }}
              >
                Open
              </Typography>
              {provider.closingTime && (
                <Typography
                  variant="caption"
                  sx={{ color: "#666", fontSize: "0.75rem" }}
                >
                  until {provider.closingTime}
                </Typography>
              )}
            </>
          )}
        </Box>

        {/* Tags */}
        {provider.tags && provider.tags.length > 0 && (
          <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
            {provider.tags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  fontSize: "0.65rem",
                  height: 20,
                  backgroundColor: "#f0f0f0",
                }}
              />
            ))}
          </Box>
        )}

        {/* Action Button */}
        <Box sx={{ display: "flex", gap: 1, mt: "auto", pt: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<PhoneIcon />}
            onClick={(e) => e.stopPropagation()}
            sx={{
              flex: 1,
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              textTransform: "none",
              fontSize: "0.8rem",
              padding: "4px 12px",
              "&:hover": {
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              },
            }}
          >
            {provider.phone}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceProviderCard;
