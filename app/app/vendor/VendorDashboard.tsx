"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box, Typography, Button, Card, CardContent, Grid, Stack, Alert, AlertTitle, CircularProgress
} from "@mui/material";
import MetricCard from "../admin/components/MetricCard";
import { useAuthStore } from "../store/useAuthStore";
import axiosClient from "../lib/api";

// Icons
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import PercentIcon from "@mui/icons-material/Percent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function VendorDashboard() {
  const { role } = useAuthStore();
  const [bookings, setBookings] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const bookingsRes = await axiosClient.get("/bookings/provider/bookings");
        if (bookingsRes.data && bookingsRes.data.success) {
          setBookings(bookingsRes.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching vendor bookings:", err);
      }

      try {
        const profileRes = await axiosClient.get("/provider/profile");
        if (profileRes.data && profileRes.data.success) {
          setProfile(profileRes.data.data);
        }
      } catch (err) {
        console.error("Error fetching vendor profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#635BFF" }} />
      </Box>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const activeBookingsCount = bookings.filter((b) =>
    ["accepted", "scheduled", "en-route", "reached", "started"].includes(b.status)
  ).length;
  const completedBookingsCount = bookings.filter((b) => b.status === "completed").length;

  const totalEarnings = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + (b.total_amount || 0), 0);

  const providerRating = profile ? `${profile.rating} ★` : "5.0 ★";
  const profileStatus = profile && profile.is_verified ? "Verified" : "Pending Verification";


  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header section with subtitle */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}>
            Vendor Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
            Welcome back! Here is an overview of your account status and activity.
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/vendor/requests"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            bgcolor: "#635BFF",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "30px",
            px: 3,
            py: 1,
            textTransform: "none",
            "&:hover": { bgcolor: "#4F46E5" }
          }}
        >
          Manage Requests
        </Button>
      </Box>

      {/* Alert Widget for Pending Requests */}
      {pendingBookings.length > 0 && (
        <Alert
          severity="warning"
          action={
            <Button
              component={Link}
              href="/vendor/requests"
              color="inherit"
              size="small"
              sx={{ fontWeight: 700, textTransform: "none" }}
            >
              View Requests
            </Button>
          }
          sx={{
            mb: 4,
            borderRadius: "16px",
            border: "1px solid #FFE0B2",
            bgcolor: "#FFF8E1",
            color: "#B06000",
            "& .MuiAlert-icon": { color: "#B06000" }
          }}
        >
          <AlertTitle sx={{ fontWeight: 700 }}>Action Required</AlertTitle>
          You have <strong>{pendingBookings.length}</strong> new booking request{pendingBookings.length > 1 ? "s" : ""} waiting for your acceptance.
        </Alert>
      )}

      {/* KPI Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {role === "partner" ? (
          <>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                type="purple"
                title="Lifetime Earnings"
                value={`₹${totalEarnings}`}
                icon={<AccountBalanceWalletOutlinedIcon sx={{ color: "#fff" }} />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                type="blue"
                title="Completed Tasks"
                value={completedBookingsCount.toString()}
                icon={<CheckCircleOutlinedIcon sx={{ color: "#fff" }} />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <MetricCard
                type="split-top"
                title="Partner Rating"
                value={providerRating}
                icon={<StarOutlineIcon />}
              />
              <MetricCard
                type="split-bottom"
                title="Active Profile Status"
                value={profileStatus}
                icon={<PercentIcon />}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                type="purple"
                title="Total Sales"
                value={`₹${totalEarnings}`}
                icon={<AccountBalanceWalletOutlinedIcon sx={{ color: "#fff" }} />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <MetricCard
                type="blue"
                title="Active Bookings"
                value={activeBookingsCount.toString()}
                icon={<TrendingUpIcon sx={{ color: "#fff" }} />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <MetricCard
                type="split-top"
                title="Provider Rating"
                value={providerRating}
                icon={<StarOutlineIcon />}
              />
              <MetricCard
                type="split-bottom"
                title="Active Profile Status"
                value={profileStatus}
                icon={<PercentIcon />}
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Main Dashboard Widget Panel */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: "16px", border: "1px solid #EAEAEA", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", bgcolor: "#FFFFFF", height: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#1F2937" }}>
                Quick Action Panel
              </Typography>
              <Typography variant="body2" sx={{ color: "#4B5563", mb: 4, lineHeight: 1.6 }}>
                Use the quick actions below to manage your listings, settings, or go directly to the request management flow. Staying responsive helps maintain a high vendor rating.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={Link}
                  href="/vendor/requests"
                  variant="contained"
                  sx={{
                    bgcolor: "#635BFF",
                    fontWeight: 600,
                    borderRadius: "8px",
                    px: 3,
                    py: 1.2,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#4F46E5" }
                  }}
                >
                  Manage Requests
                </Button>
                <Button
                  component={Link}
                  href="/vendor/requests"
                  variant="outlined"
                  sx={{
                    color: "#4B5563",
                    borderColor: "#D1D5DB",
                    fontWeight: 600,
                    borderRadius: "8px",
                    px: 3,
                    py: 1.2,
                    textTransform: "none",
                    "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" }
                  }}
                >
                  View Live Services ({activeBookingsCount})
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderRadius: "16px", border: "1px solid #EAEAEA", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", bgcolor: "#FFFFFF", height: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#1F2937" }}>
                Performance Summary
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>Active Jobs</Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "#111827" }}>{activeBookingsCount}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>Completed Jobs</Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "#111827" }}>{completedBookingsCount}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>Pending Approvals</Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "#D97706" }}>{pendingBookings.length}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}