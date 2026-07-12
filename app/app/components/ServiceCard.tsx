"use client";

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Service } from "../lib/servicesData";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        cursor: "pointer",
        border: "1px solid #f0f0f0",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="160"
          image={service.image}
          alt={service.name}
          sx={{
            objectFit: "cover",
          }}
        />

        {/* Badge Overlay */}
        {service.badge && (
          <Chip
            label={service.badge}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#FF6B6B",
              color: "white",
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
        )}

        {/* Availability Badge */}
        {service.availability && (
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: "16px",
              padding: "4px 12px",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <AccessTimeIcon sx={{ fontSize: "14px", color: "#10B981" }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "#10B981" }}
            >
              {service.availability}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Content Section */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        {/* Service Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            mb: 0.5,
            color: "#1a1a1a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {service.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: "0.85rem",
            mb: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {service.description}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#10B981",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              gap: 0.5,
            }}
          >
            <StarIcon sx={{ fontSize: "14px" }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {service.rating.toFixed(2)}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "#999" }}>
            ({service.reviewCount.toLocaleString()})
          </Typography>
        </Box>

        {/* Pricing & Action */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1a1a1a" }}
              >
                ₹{service.price}
              </Typography>
              {service.originalPrice && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "#999",
                    fontSize: "0.85rem",
                  }}
                >
                  ₹{service.originalPrice}
                </Typography>
              )}
            </Box>
            {service.originalPrice && (
              <Typography
                variant="caption"
                sx={{ color: "#10B981", fontWeight: 600 }}
              >
                {Math.round(
                  ((service.originalPrice - service.price) /
                    service.originalPrice) *
                    100
                )}
                % OFF
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            size="small"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textTransform: "none",
              borderRadius: "20px",
              padding: "6px 20px",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #6a3f91 100%)",
              },
            }}
          >
            Book
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
