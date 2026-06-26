"use client";

import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import ServiceProviderCard from "./ServiceProviderCard";
import { serviceProviders } from "../lib/servicesData";

interface ServicesSidebarProps {
  selectedCategory?: string;
}

const ServicesSidebar: React.FC<ServicesSidebarProps> = ({ selectedCategory }) => {
  const filteredProviders = selectedCategory && selectedCategory !== "All"
    ? serviceProviders.filter(provider => provider.category === selectedCategory)
    : serviceProviders;

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
          {filteredProviders.slice(0, 6).map((provider) => (
            <ServiceProviderCard key={provider.id} provider={provider} />
          ))}
          
          {filteredProviders.length > 6 && (
            <Button
              fullWidth
              variant="outlined"
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
          <Typography variant="h6" sx={{ fontWeight: 500 ,letterSpacing: 2
          }}>
           1234567890
          </Typography>
         
        </Box>
      </Paper>
    </Box>
  );
};

export default ServicesSidebar;
