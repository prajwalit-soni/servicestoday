"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import AdminBreadcrumbs from "../../components/AdminBreadcrumbs";
import { UserService, type UserVendorData } from "../../../lib/services/userService";
import { toast } from "react-toastify";

// Helper to format Date string
const formatDate = (dateString?: string | null) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function VendorDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idStr = searchParams.get("id");

  const [vendor, setVendor] = useState<UserVendorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idStr) {
      toast.error("No user ID provided");
      setLoading(false);
      return;
    }

    const fetchVendor = async () => {
      try {
        setLoading(true);
        const data = await UserService.getById(Number(idStr));
        setVendor(data);
      } catch (err: any) {
        console.error("Failed to load user details:", err);
        const errMsg = err.response?.data?.detail || err.response?.data?.message || err.message || "Failed to load user details";
        toast.error(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [idStr]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#635BFF" }} />
      </Box>
    );
  }

  if (!vendor) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary">
          User/Vendor details could not be loaded.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ pb: 2 }}>
        <AdminBreadcrumbs />
      </Box>
      <Grid container spacing={3}>
        {/* Left Column - Store Profile Metadata */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: "16px",
              textAlign: "center",
              border: "1px solid #EAEAEA",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                mb: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                fontSize: "32px",
                bgcolor: "#635BFF",
              }}
            >
              {vendor.name ? vendor.name.charAt(0).toUpperCase() : "?"}
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#1E1E1E", mb: 0.5 }}
            >
              {vendor.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#757575", mb: 2.5 }}>
              ID: {vendor.id}
            </Typography>

            <Chip
              label={vendor.is_active ? "Active" : "Inactive"}
              sx={{
                bgcolor: vendor.is_active ? "#E6F4EA" : "#FCE8E6",
                color: vendor.is_active ? "#137333" : "#C5221F",
                fontWeight: 600,
                fontSize: "13px",
                px: 1,
              }}
            />

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                textAlign: "left",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CalendarTodayIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#757575", display: "block" }}
                  >
                    Joined Date
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatDate(vendor.created_at)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <StorefrontIcon sx={{ color: "#9E9E9E", fontSize: 20 }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#757575", display: "block" }}
                  >
                    User Role
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "#635BFF" }}
                  >
                    {vendor.role ? vendor.role.toUpperCase() : "USER"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Account details */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Account Owner Card */}
            <Paper
              sx={{
                p: 4,
                borderRadius: "16px",
                border: "1px solid #EAEAEA",
                boxShadow: "none",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#1E1E1E", mb: 2 }}
              >
                Account Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    Full Name
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                    <BadgeIcon sx={{ color: "#757575", fontSize: 18 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: "#212121" }}
                    >
                      {vendor.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    Email Address
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <MailOutlineIcon sx={{ color: "#757575", fontSize: 18 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#424242" }}
                    >
                      {vendor.email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    Phone Number
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <PhoneIcon sx={{ color: "#757575", fontSize: 18 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#424242" }}
                    >
                      {vendor.phone || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    Area Type
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <StorefrontIcon sx={{ color: "#757575", fontSize: 18 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#424242" }}
                    >
                      {vendor.area_type ? vendor.area_type.toUpperCase() : "N/A"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Address & Location Card */}
            <Paper
              sx={{
                p: 4,
                borderRadius: "16px",
                border: "1px solid #EAEAEA",
                boxShadow: "none",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#1E1E1E", mb: 2 }}
              >
                Address & Location Info
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    Address
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mt: 0.5 }}>
                    <LocationOnIcon sx={{ color: "#757575", fontSize: 18, mt: 0.3 }} />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#212121" }}
                    >
                      {vendor.address || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    PIN Code
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "#212121", mt: 0.5 }}
                  >
                    {vendor.pin_no || "N/A"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    Coordinates (Lat, Long)
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}
                  >
                    {vendor.latitude !== undefined && vendor.longitude !== undefined
                      ? `${vendor.latitude}, ${vendor.longitude}`
                      : "N/A"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    State
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}
                  >
                    {vendor.state_name || vendor.state_id || "N/A"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    District
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}
                  >
                    {vendor.district_name || vendor.district_id || "N/A"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: "#757575" }}>
                    City
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}
                  >
                    {vendor.city_name || vendor.city_id || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Business & Banking Information Card */}
            {(vendor.role?.toLowerCase() === "vendor" || vendor.role?.toLowerCase() === "provider" || vendor.role?.toLowerCase() === "partner" || vendor.bank_name) && (
              <Paper
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  border: "1px solid #EAEAEA",
                  boxShadow: "none",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#1E1E1E", mb: 2 }}
                >
                  Business & Banking Information
                </Typography>
                <Grid container spacing={2}>
                  {vendor.business_name && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" sx={{ color: "#757575" }}>
                        Business Name
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#212121", mt: 0.5 }}>
                        {vendor.business_name}
                      </Typography>
                    </Grid>
                  )}
                  {vendor.experience !== undefined && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" sx={{ color: "#757575" }}>
                        Experience (Years)
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}>
                        {vendor.experience} years
                      </Typography>
                    </Grid>
                  )}
                  <Grid size={12} sx={{ my: 1 }}>
                    <Divider />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      Bank Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}>
                      {vendor.bank_name || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      Branch Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}>
                      {vendor.branch_name || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      Account Holder
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}>
                      {vendor.account_holder || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      Account Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: "#212121", mt: 0.5 }}>
                      {vendor.account_number || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      IFSC Code
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: "#212121", mt: 0.5 }}>
                      {vendor.ifsc_code || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      Account Type
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "#212121", mt: 0.5 }}>
                      {vendor.account_type || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
