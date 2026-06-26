"use client";

import React from "react";
import { Box, Container, Typography, Paper, Divider, Grid } from "@mui/material";
import UserLayout from "../user/layout";

export default function AboutUs() {
  const stats = [
    { value: "12M+", label: "Service Bookings", emoji: "📈", color: "#635BFF" },
    { value: "50k+", label: "Verified Partners", emoji: "👷", color: "#10B981" },
    { value: "4.8★", label: "Average Rating", emoji: "⭐", color: "#F59E0B" },
    { value: "100+", label: "Cities Covered", emoji: "📍", color: "#EC4899" },
  ];

  const values = [
    {
      emoji: "🤝",
      title: "Trust & Transparency",
      desc: "We believe in honest, upfront pricing with no hidden costs, backed by rigorous vendor background checks and authentic customer rating systems.",
      bgColor: "#EFF6FF", // Soft blue
      textColor: "#1D4ED8",
    },
    {
      emoji: "⚡",
      title: "Customer First",
      desc: "We aim to deliver top-tier convenience. From instant matching to dedicated support, we guarantee customer satisfaction with every single booking.",
      bgColor: "#FEF2F2", // Soft red
      textColor: "#DC2626",
    },
    {
      emoji: "💪",
      title: "Partner Empowerment",
      desc: "Our service partners are our backbone. We ensure fair commission percentages, weekly bank settlements, and business-building support to help them grow.",
      bgColor: "#F5F3FF", // Soft purple
      textColor: "#7C3AED",
    },
    {
      emoji: "🚀",
      title: "Technological Innovation",
      desc: "We constantly refine our geographical matching algorithms, real-time tracking, and automated service flows to save travel time and optimize costs.",
      bgColor: "#ECFDF5", // Soft green
      textColor: "#059669",
    },
  ];

  return (
    <UserLayout>
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Hero Banner Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
              py: 6,
              px: 4,
              borderRadius: "24px",
              background: "linear-gradient(135deg, #F5F3FF 0%, #EFF6FF 100%)",
              border: "1px solid #E0E7FF",
              boxShadow: "0px 10px 30px rgba(99, 91, 255, 0.03)",
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                bgcolor: "#635BFF",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                mb: 2.5,
              }}
            >
              Who We Are
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#111827",
                mb: 2,
                fontSize: { xs: "28px", sm: "36px", md: "46px" },
                letterSpacing: "-1px",
                lineHeight: 1.2,
              }}
            >
              Shaping the Future of Local Services
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#4B5563",
                fontWeight: 500,
                fontSize: { xs: "15px", md: "17px" },
                maxWidth: "680px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Shoptera is a modern service aggregator linking households with trusted local experts, driving efficiency for consumers and sustainable livelihoods for service professionals.
            </Typography>
          </Box>

          {/* Stats section */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {stats.map((s, idx) => (
              <Grid size={{ xs: 6, md: 3 }} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: "16px",
                    border: "1px solid #ECEBE6",
                    bgcolor: "white",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.04)",
                      borderColor: s.color,
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 800, color: s.color, mb: 1, fontSize: { xs: "28px", md: "36px" } }}>
                    {s.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4B5563", fontWeight: 600, fontSize: "14px" }}>
                    {s.emoji} {s.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Story & Mission Columns */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: "24px",
                  border: "1px solid #ECEBE6",
                  bgcolor: "white",
                  height: "100%",
                  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.01)",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 2.5, fontSize: "22px", display: "flex", alignItems: "center", gap: 1.5 }}>
                  <span style={{ width: "4px", height: "20px", backgroundColor: "#635BFF", display: "inline-block", borderRadius: "2px" }}></span>
                  Our Story
                </Typography>
                <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                  Founded in 2026, Shoptera emerged from a simple observation: finding trusted, skilled local service
                  professionals for household chores (like cleaning, appliance repair, electrical works, or beauty services)
                  was fragmented and unreliable. Similarly, skilled local technicians and beauty professionals struggled to find
                  consistent jobs near their locations.
                  <br /><br />
                  We built Shoptera as a modern bridge. By leveraging location-based matchmaking and real-time scheduling technology,
                  we empower local service providers (structured Vendors and independent Partners) to scale their operations
                  while providing customers with upfront pricing, verified expertise, and absolute convenience.
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: "24px",
                  border: "1px solid #ECEBE6",
                  bgcolor: "white",
                  height: "100%",
                  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.01)",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 2.5, fontSize: "22px", display: "flex", alignItems: "center", gap: 1.5 }}>
                  <span style={{ width: "4px", height: "20px", backgroundColor: "#10B981", display: "inline-block", borderRadius: "2px" }}></span>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                  Our mission is to organize the local on-demand service ecosystem. We strive to make high-quality home services
                  reliable, transparent, and instantly accessible to households everywhere. At the same time, we are committed to
                  creating sustainable, independent livelihoods for micro-entrepreneurs and local service partners by ensuring
                  fair payouts, professional training, and constant workflow streams.
                  <br /><br />
                  By combining deep operational experience with powerful technology, we aim to become the default standard for quality, reliable home services globally.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Core Values Section */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: "24px",
              border: "1px solid #ECEBE6",
              bgcolor: "white",
              boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.02)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 4, fontSize: "22px", display: "flex", alignItems: "center", gap: 1.5 }}>
              <span style={{ width: "4px", height: "20px", backgroundColor: "#F59E0B", display: "inline-block", borderRadius: "2px" }}></span>
              Our Core Values
            </Typography>

            <Grid container spacing={3}>
              {values.map((v, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      border: "1px solid #F3F4F6",
                      height: "100%",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#E5E7EB",
                        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.02)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        bgcolor: v.bgColor,
                        fontSize: "20px",
                        mb: 2,
                      }}
                    >
                      {v.emoji}
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827", mb: 1, fontSize: "16px" }}>
                      {v.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6B7280", lineHeight: 1.6, fontSize: "14px" }}>
                      {v.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </UserLayout>
  );
}
