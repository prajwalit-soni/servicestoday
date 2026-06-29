"use client";

import React from "react";
import { 
  Box, Typography, Button, Stack, Chip, Card, CardContent, 
  Stepper, Step, StepLabel, useMediaQuery, useTheme, LinearProgress
} from "@mui/material";
import CustomDataTable, { Column } from "../../admin/components/CustomDataTable";
import { useAuthStore } from "../../store/useAuthStore";
import { useBookingStore } from "../../store/useBookingStore";

const SERVICE_STEPS = ["Accepted", "Agent En-route", "Reached Location", "Work Started", "Completed"];

export default function VendorRequestsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { role } = useAuthStore();
  const { bookings, updateStatus } = useBookingStore();

  // Filter Categories
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  
  // "Live" or "Coming Up" bookings that need action
  const activeBookings = bookings.filter((b) => 
    ["accepted", "scheduled", "en-route", "reached", "started"].includes(b.status)
  );

  const historyBookings = bookings.filter((b) => 
    ["completed", "cancelled", "declined"].includes(b.status)
  );

  const getActiveStep = (status: string) => {
    switch (status) {
      case "scheduled":
      case "accepted": return 0;
      case "en-route": return 1;
      case "reached": return 2;
      case "started": return 3;
      case "completed": return 4;
      default: return 0;
    }
  };

  const columns: Column[] = [
    { id: "id", label: "ID", width: "100px" },
    { id: "serviceType", label: "Service", width: "180px" },
    { id: "customerName", label: "Customer", width: "180px" },
    { id: "amount", label: "Price", width: "100px", render: (row: any) => `₹${row.amount}` },
    { 
      id: "status", 
      label: "Status", 
      width: "140px",
      render: (row: any) => {
        let bgcolor = "#F1F3F4";
        let color = "#3C4043";
        let displayLabel = row.status.toUpperCase();

        if (row.status === "completed") {
          bgcolor = "#E6F4EA";
          color = "#137333";
        } else if (row.status === "pending") {
          bgcolor = "#FEF3D6";
          color = "#B06000";
        } else if (row.status === "cancelled" || row.status === "declined") {
          bgcolor = "#FCE8E6";
          color = "#C5221F";
        } else if (row.status === "scheduled" || row.status === "accepted") {
          bgcolor = "#E8F0FE";
          color = "#1A73E8";
        } else if (row.status === "en-route" || row.status === "reached" || row.status === "started") {
          bgcolor = "#E2F1FD";
          color = "#0288D1";
        }
        
        return (
          <Chip 
            label={displayLabel} 
            size="small" 
            sx={{ 
              bgcolor, 
              color, 
              fontWeight: 600, 
              fontSize: "11px", 
              borderRadius: "8px" 
            }} 
          />
        );
      } 
    },
    { id: "date", label: "Date/Time", width: "200px" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header section with subtitle */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#111827", mb: 0.5, fontSize: { xs: "1.75rem", sm: "2.125rem" } }}>
          Service Requests & Bookings
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
          Manage your incoming requests, track live jobs, and review service history.
        </Typography>
      </Box>

      {/* SECTION 1: NOTIFICATIONS (Action Needed) */}
      {pendingBookings.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#D97706", display: "flex", alignItems: "center", gap: 1 }}>
            ⚠️ {role === "partner" ? "New Task Requests" : "New Booking Requests"}
          </Typography>
          <Stack spacing={2}>
            {pendingBookings.map((booking) => (
              <Card 
                key={booking.id} 
                sx={{ 
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  border: "1px solid #FFE0B2",
                  bgcolor: "#FFF8E1",
                  transition: "all 0.2s",
                  "&:hover": { boxShadow: "0 6px 16px rgba(255, 179, 0, 0.12)", transform: "translateY(-2px)" }
                }}
              >
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'stretch', sm: 'center' }, 
                  gap: 2.5,
                  p: 3, 
                  "&:last-child": { pb: 3 } 
                }}>
                  <Box>
                    <Chip label="ACTION REQUIRED" color="warning" size="small" sx={{ fontWeight: 700, fontSize: "9px", mb: 1, borderRadius: "6px" }} />
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#1F2937", mb: 0.5 }}>{booking.serviceType}</Typography>
                    <Typography variant="body2" sx={{ color: "#4B5563" }}>
                      Customer: <strong>{booking.customerName}</strong> • Requested at: <strong>{booking.date}</strong>
                    </Typography>
                  </Box>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }}>
                    <Button 
                      size="medium" 
                      variant="contained" 
                      onClick={() => updateStatus(booking.id, "scheduled")}
                      fullWidth={isMobile}
                      sx={{ 
                        bgcolor: "#10b981", 
                        color: "#fff", 
                        fontWeight: 600, 
                        borderRadius: "30px", 
                        px: 3,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#059669" }
                      }}
                    >
                      Accept Request
                    </Button>
                    <Button 
                      size="medium" 
                      variant="outlined" 
                      color="error" 
                      onClick={() => updateStatus(booking.id, "declined")}
                      fullWidth={isMobile}
                      sx={{ 
                        fontWeight: 600, 
                        borderRadius: "30px", 
                        px: 3,
                        textTransform: "none"
                      }}
                    >
                      Decline
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* SECTION 2: LIVE PROGRESS */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#1F2937" }}>
          {role === "partner" ? "Active & Upcoming Tasks" : "Current & Upcoming Services"}
        </Typography>
        {activeBookings.length === 0 ? (
          <Card sx={{ p: 4, textAlign: "center", borderRadius: "16px", border: "1px solid #E5E7EB", bgcolor: "#FFFFFF" }}>
            <Typography color="text.secondary" fontWeight={500}>No active tasks or services currently scheduled.</Typography>
          </Card>
        ) : (
          activeBookings.map((booking) => (
            <Card 
              key={booking.id} 
              sx={{ 
                mb: 3, 
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                border: "1px solid #EAEAEA",
                overflow: "hidden",
                bgcolor: "#FFFFFF"
              }}
            >
              {/* Header bar on active booking card */}
              <Box sx={{ 
                bgcolor: "#FAFAFA", 
                px: 3, 
                py: 2, 
                borderBottom: "1px solid #EAEAEA", 
                display: "flex", 
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between", 
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1.5
              }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#6B7280", textTransform: "uppercase", fontSize: "10px", fontWeight: 700, letterSpacing: "1px" }}>Active Service</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>{booking.serviceType} for {booking.customerName}</Typography>
                </Box>
                <Button 
                  size="small" 
                  color="error" 
                  onClick={() => updateStatus(booking.id, "cancelled")}
                  sx={{ textTransform: "none", fontWeight: 600, width: { xs: "100%", sm: "auto" }, textAlign: { xs: "left", sm: "right" } }}
                >
                  Cancel Service
                </Button>
              </Box>

              <CardContent sx={{ p: 3 }}>
                {!isMobile ? (
                  <Stepper 
                    activeStep={getActiveStep(booking.status)} 
                    alternativeLabel 
                    sx={{ 
                      mb: 4,
                      "& .MuiStepLabel-label.Mui-active": { color: "#635BFF", fontWeight: 600 },
                      "& .MuiStepLabel-label.Mui-completed": { color: "#10b981", fontWeight: 500 },
                      "& .MuiStepIcon-root.Mui-active": { color: "#635BFF" },
                      "& .MuiStepIcon-root.Mui-completed": { color: "#10b981" }
                    }}
                  >
                    {SERVICE_STEPS.map((label) => (
                      <Step key={label}><StepLabel>{label}</StepLabel></Step>
                    ))}
                  </Stepper>
                ) : (
                  <Box sx={{ mb: 3, px: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#1F2937", mb: 1 }}>
                      Current Status: <span style={{ color: "#635BFF" }}>{SERVICE_STEPS[getActiveStep(booking.status)]}</span> (Step {getActiveStep(booking.status) + 1} of 5)
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={((getActiveStep(booking.status) + 1) / 5) * 100} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3, 
                        bgcolor: "#E5E7EB",
                        "& .MuiLinearProgress-bar": { bgcolor: "#635BFF" } 
                      }} 
                    />
                  </Box>
                )}

                <Box sx={{ display: "flex", justifyContent: 'center', width: "100%" }}>
                  {booking.status === "scheduled" && (
                    <Button 
                      variant="contained" 
                      onClick={() => updateStatus(booking.id, "en-route")}
                      fullWidth={isMobile}
                      sx={{ bgcolor: "#635BFF", color: "#fff", fontWeight: 600, borderRadius: "30px", px: 4, py: 1.2, textTransform: "none", "&:hover": { bgcolor: "#4F46E5" } }}
                    >
                      Start Journey
                    </Button>
                  )}
                  {booking.status === "en-route" && (
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => updateStatus(booking.id, "reached")}
                      fullWidth={isMobile}
                      sx={{ fontWeight: 600, borderRadius: "30px", px: 4, py: 1.2, textTransform: "none" }}
                    >
                      Reached Location
                    </Button>
                  )}
                  {booking.status === "reached" && (
                    <Button 
                      variant="contained" 
                      color="info" 
                      onClick={() => updateStatus(booking.id, "started")}
                      fullWidth={isMobile}
                      sx={{ fontWeight: 600, borderRadius: "30px", px: 4, py: 1.2, textTransform: "none" }}
                    >
                      Begin Service
                    </Button>
                  )}
                  {booking.status === "started" && (
                    <Button 
                      variant="contained" 
                      color="success" 
                      onClick={() => updateStatus(booking.id, "completed")}
                      fullWidth={isMobile}
                      sx={{ bgcolor: "#10b981", "&:hover": { bgcolor: "#059669" }, fontWeight: 600, borderRadius: "30px", px: 4, py: 1.2, textTransform: "none" }}
                    >
                      Finish & Close
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* SECTION 3: HISTORY TABLE */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#1F2937" }}>
          {role === "partner" ? "Task History" : "Service History"}
        </Typography>
        <CustomDataTable
          data={historyBookings}
          columns={columns}
          searchPlaceholder="Search task history..."
          searchFields={["id", "serviceType", "customerName", "status"]}
        />
      </Box>
    </Box>
  );
}
