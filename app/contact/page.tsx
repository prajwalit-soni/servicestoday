"use client";

import React, { useState } from "react";
import { Box, Container, Typography, Paper, Grid, TextField, Button, Divider } from "@mui/material";
import { toast } from "react-toastify";
import UserLayout from "../user/layout";
import MapIcon from "@mui/icons-material/Map";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";

export default function ContactUs() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.email || !formValues.message) {
      toast.error("Please fill in all required fields (Name, Email, Message).");
      return;
    }
    
    // Simulate sending message
    toast.success("Thank you for contacting us! Our team will respond shortly.");
    setFormValues({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <UserLayout>
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              py: 5,
              px: 4,
              borderRadius: "24px",
              background: "linear-gradient(135deg, #EEF2F6 0%, #E3E9F1 100%)",
              border: "1px solid #D9E2EC",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.01)",
            }}
          >
            <Box
              sx={{
                display: "inline-block",
                bgcolor: "#3B82F6",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                mb: 2,
              }}
            >
              Support Desk
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 900, color: "#111827", mb: 1, fontSize: { xs: "28px", md: "40px" }, letterSpacing: "-0.5px" }}>
              Contact Our Team
            </Typography>
            <Typography variant="body1" sx={{ color: "#4B5563", fontWeight: 500, fontSize: "16px" }}>
              Have questions or feedback? We are here to help.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Contact Details Card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: "24px",
                    border: "1px solid #ECEBE6",
                    bgcolor: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3.5,
                    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.01)",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        bgcolor: "#EFF6FF",
                        color: "#3B82F6",
                        flexShrink: 0,
                      }}
                    >
                      <BusinessIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", mb: 0.5, fontSize: "16px" }}>
                        Corporate Office
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6B7280", lineHeight: 1.6, fontSize: "13.5px" }}>
                        Shoptera Technologies Private Limited<br />
                        4th Floor, Tech Hub Building, Sector 5,<br />
                        Kolkata, WB 700091, India
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        bgcolor: "#ECFDF5",
                        color: "#10B981",
                        flexShrink: 0,
                      }}
                    >
                      <PhoneIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", mb: 0.5, fontSize: "16px" }}>
                        Customer Support
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6B7280", lineHeight: 1.6, fontSize: "13.5px" }}>
                        Email: <span style={{ color: "#10B981", fontWeight: 500 }}>support@shoptera.com</span><br />
                        Hotline: +1 (800) 123-4567<br />
                        Available 24/7
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        bgcolor: "#FFFBEB",
                        color: "#F59E0B",
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", mb: 0.5, fontSize: "16px" }}>
                        Business Relations
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6B7280", lineHeight: 1.6, fontSize: "13.5px" }}>
                        For vendor partnerships or corporate business inquiries:<br />
                        Email: <span style={{ color: "#F59E0B", fontWeight: 500 }}>partners@shoptera.com</span>
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Simulated Interactive Map */}
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "24px",
                    border: "1px solid #ECEBE6",
                    bgcolor: "white",
                    overflow: "hidden",
                    height: "230px",
                    position: "relative",
                    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.01)",
                  }}
                >
                  {/* Styled Map Background */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: "radial-gradient(#E2E8F0 1.5px, transparent 1.5px), radial-gradient(#F1F5F9 1.5px, transparent 1.5px)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 10px 10px",
                      backgroundColor: "#F8FAFC",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Simulated Map Streets */}
                    <Box sx={{ position: "absolute", width: "150%", height: "2px", bgcolor: "#E2E8F0", transform: "rotate(20deg)" }} />
                    <Box sx={{ position: "absolute", width: "150%", height: "2px", bgcolor: "#E2E8F0", transform: "rotate(-35deg)" }} />
                    <Box sx={{ position: "absolute", width: "2px", height: "150%", bgcolor: "#E2E8F0", left: "40%" }} />
                    <Box sx={{ position: "absolute", width: "2px", height: "150%", bgcolor: "#E2E8F0", left: "70%" }} />

                    {/* Styled Map Pin Indicator */}
                    <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      {/* Pulse Circle */}
                      <Box
                        sx={{
                          position: "absolute",
                          width: "32px",
                          height: "32px",
                          bgcolor: "rgba(59, 130, 246, 0.2)",
                          borderRadius: "50%",
                          animation: "pulse 1.8s infinite ease-in-out",
                          top: "-8px",
                          "@keyframes pulse": {
                            "0%": { transform: "scale(0.5)", opacity: 1 },
                            "100%": { transform: "scale(2.2)", opacity: 0 }
                          }
                        }}
                      />
                      
                      {/* Solid Marker */}
                      <Box
                        sx={{
                          width: "14px",
                          height: "14px",
                          bgcolor: "#3B82F6",
                          border: "2.5px solid white",
                          borderRadius: "50%",
                          boxShadow: "0px 2px 10px rgba(59, 130, 246, 0.5)",
                          zIndex: 2,
                        }}
                      />
                      
                      <Paper
                        elevation={2}
                        sx={{
                          position: "absolute",
                          top: "-38px",
                          whiteSpace: "nowrap",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "6px",
                          border: "1px solid #BFDBFE",
                          bgcolor: "white",
                          zIndex: 3,
                        }}
                      >
                        <Typography sx={{ fontSize: "10.5px", fontWeight: 700, color: "#1E3A8A" }}>
                          Shoptera HQ
                        </Typography>
                      </Paper>
                    </Box>
                    
                    {/* Controls HUD */}
                    <Box sx={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 0.5 }}>
                      <Box sx={{ px: 1, py: 0.5, bgcolor: "white", borderRadius: "4px", fontSize: "9px", fontWeight: 700, border: "1px solid #E2E8F0", color: "#64748B", display: "flex", alignItems: "center", gap: 0.5 }}>
                        <MapIcon style={{ fontSize: "11px" }} /> MAP VIEW
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            {/* Contact Form Card */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: "24px",
                  border: "1px solid #ECEBE6",
                  bgcolor: "white",
                  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.02)",
                  height: "100%",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 3.5, fontSize: "20px", display: "flex", alignItems: "center", gap: 1.5 }}>
                  <span style={{ width: "4px", height: "18px", backgroundColor: "#3B82F6", display: "inline-block", borderRadius: "2px" }}></span>
                  Send us a Message
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": { borderColor: "#E5E7EB" },
                            "&:hover fieldset": { borderColor: "#3B82F6" },
                            "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": { borderColor: "#E5E7EB" },
                            "&:hover fieldset": { borderColor: "#3B82F6" },
                            "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": { borderColor: "#E5E7EB" },
                            "&:hover fieldset": { borderColor: "#3B82F6" },
                            "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formValues.subject}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            "& fieldset": { borderColor: "#E5E7EB" },
                            "&:hover fieldset": { borderColor: "#3B82F6" },
                            "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={5}
                    label="Message"
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": { borderColor: "#E5E7EB" },
                        "&:hover fieldset": { borderColor: "#3B82F6" },
                        "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
                      }
                    }}
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#111827",
                      color: "white",
                      py: 1.5,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "none",
                      transition: "all 0.2s ease",
                      "&:hover": { bgcolor: "black", boxShadow: "none" }
                    }}
                  >
                    Submit Message
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </UserLayout>
  );
}
