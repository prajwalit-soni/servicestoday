"use client";
import React from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

interface MetricCardProps {
  type: "purple" | "blue" | "split-top" | "split-bottom";
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export default function MetricCard({ type, title, value, icon }: MetricCardProps) {
  // Styles for Purple and Dark Blue Cards
  if (type === "purple" || type === "blue") {
    const isPurple = type === "purple";
    return (
      <Card
        sx={{
          position: "relative",
          p: 3,
          borderRadius: "12px",
          color: "#fff",
          background: isPurple
            ? "linear-gradient(135deg, #4527a0 0%, #5e35b1 100%)"
            : "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Decorative background circles seen in visual dashboard layout
          "&::after": {
            content: '""',
            position: "absolute",
            width: "210px",
            height: "210px",
            background: isPurple ? "#4527a0" : "#1565c0",
            borderRadius: "50%",
            top: "-85px",
            right: "-95px",
            opacity: 0.5,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
          <Box sx={{ p: 1, backgroundColor: isPurple ? "#311b92" : "#0d47a1", borderRadius: "8px", display: "flex" }}>
            {icon}
          </Box>
          {/* <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 500 }}>
            {isPurple ? "" : "Month / Year"}
          </Typography> */}
        </Box>

        <Box sx={{ mt: 3, zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            <ArrowCircleUpIcon fontSize="small" sx={{ opacity: 0.7 }} />
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, fontWeight: 500 }}>
            {title}
          </Typography>
        </Box>
      </Card>
    );
  }

  // Styles for Stacked Side Metrics
  const isTopSplit = type === "split-top";
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: "12px",
        backgroundColor: isTopSplit ? "#1e88e5" : "#ffffff",
        color: isTopSplit ? "#ffffff" : "#121926",
        border: isTopSplit ? "none" : "1px solid #e3e8ef",
        display: "flex",
        alignItems: "center",
        gap: 2,
        height: { xs: "auto", md: "calc(50% - 8px)" }, // Adjust layout for gap stack to prevent mobile collapse
        minHeight: { xs: 80, md: "auto" },
      }}
    >
      <Box
        sx={{
          p: 1,
          borderRadius: "8px",
          backgroundColor: isTopSplit ? "#1565c0" : "#fff8e1",
          color: isTopSplit ? "#ffffff" : "#ffb300",
          display: "flex",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: isTopSplit ? "#bbdefb" : "#697586", fontWeight: 500 }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
