"use client";

import React from "react";
import { Box, Container, Typography, Paper, Divider, List, ListItem, Grid, ListItemButton, ListItemText } from "@mui/material";
import UserLayout from "../user/layout";

export default function PrivacyPolicy() {
  const sections = [
    { id: "collect", label: "1. Information We Collect" },
    { id: "use", label: "2. How We Use Information" },
    { id: "share", label: "3. Disclosing Information" },
    { id: "geo", label: "4. Geolocation Tracking" },
    { id: "security", label: "5. Security & Encryption" },
    { id: "rights", label: "6. Your Privacy Rights" },
    { id: "cookies", label: "7. Cookies & Sessions" },
    { id: "children", label: "8. Children's Privacy" },
    { id: "changes", label: "9. Policy Changes & Contact" },
  ];

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90; // account for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
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
              background: "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
              border: "1px solid #E5E7EB",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 900, color: "#111827", mb: 1.5, fontSize: { xs: "28px", md: "40px" }, letterSpacing: "-0.5px" }}>
              Privacy Policy
            </Typography>
            <Typography variant="body2" sx={{ color: "#4B5563", fontWeight: 600, fontSize: "14px" }}>
              Effective Date: June 25, 2026 | Version 1.5
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Table of Contents Sticky Sidebar */}
            <Grid size={{ xs: 12, md: 3.5 }}>
              <Box sx={{ position: { md: "sticky" }, top: "100px" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    bgcolor: "white",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
                    Table of Contents
                  </Typography>
                  <List component="nav" disablePadding>
                    {sections.map((sec) => (
                      <ListItemButton
                        key={sec.id}
                        onClick={() => handleScroll(sec.id)}
                        sx={{
                          borderRadius: "10px",
                          mb: 0.5,
                          "&:hover": { bgcolor: "#F3F4F6" },
                        }}
                      >
                        <ListItemText 
                          primary={sec.label} 
                          primaryTypographyProps={{ fontSize: "13.5px", fontWeight: 600, color: "#4B5563" }} 
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              </Box>
            </Grid>

            {/* Document Content */}
            <Grid size={{ xs: 12, md: 8.5 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: "24px",
                  border: "1px solid #E5E7EB",
                  bgcolor: "white",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
                }}
              >
                <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                  At Shoptera, we value your privacy and trust. This Privacy Policy ("Policy") explains how Shoptera
                  Technologies Private Limited ("we," "our," or "us") collects, uses, stores, shares, and protects your
                  personal data when you visit our website, install our mobile applications, register an account, hire service
                  providers, or offer local services on the Shoptera Platform. By using our Platform, you consent to our collection
                  and processing of your personal information as detailed in this Policy.
                </Typography>

                <Divider />

                <Box id="collect" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    1. Types of Information We Collect
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px", mb: 2 }}>
                    We collect personal information directly provided by you, automatically recorded from your devices, and sourced
                    from third-party integrations:
                  </Typography>
                  <List sx={{ pl: 2, listStyleType: "disc", "& .MuiListItem-root": { display: "list-item", py: 0.5 } }}>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      <strong>Account Registration:</strong> Your full name, verified email address, mobile number, and password hash.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      <strong>Profile & Address Data:</strong> Detailed physical address, pin code, state, district, city, and ward coordinates for service delivery mapping.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      <strong>Vendor & Partner Information:</strong> Occupation details, certification documents, business details, profile images, and legal ID documents for verification.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      <strong>Usage & Device Details:</strong> IP addresses, browser types, operational log files, device models, and mobile identifiers.
                    </ListItem>
                  </List>
                </Box>

                <Box id="use" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    2. How We Use Your Information
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px", mb: 2 }}>
                    We process your personal data under valid legal bases to achieve the following operational purposes:
                  </Typography>
                  <List sx={{ pl: 2, listStyleType: "disc", "& .MuiListItem-root": { display: "list-item", py: 0.5 } }}>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Facilitating the matching of service requests with nearby vendors or partners.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Managing payments, issuing service invoices, and processing refund claims.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Verifying account details, confirming business licenses, and identifying platform abuse or spam.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Sending transaction SMS alerts, OTP codes for authentication, and marketing updates.
                    </ListItem>
                  </List>
                </Box>

                <Box id="share" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    3. Sharing & Disclosing Your Information
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    We respect your data privacy and will never sell your personal information. To fulfill services, we share
                    necessary transaction details (e.g. name, contact number, address, location coordinates) between the customer
                    and the assigned service provider (Vendor/Partner).
                    <br /><br />
                    We also share relevant tokenized details with our authorized payment gateways, storage providers, analytics
                    partners, and law enforcement agencies when legally required to protect the safety of the Platform.
                  </Typography>
                </Box>

                <Box id="geo" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    4. Geolocation Data & Tracking
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    Because Shoptera is a local service delivery marketplace, we capture precise GPS coordinates (latitude/longitude)
                    from your mobile device or browser when you search for nearby services. You can grant or withdraw location
                    permission at any time via your device's operating system settings, although disabling this will prevent you
                    from listing services or matching with nearby providers.
                  </Typography>
                </Box>

                <Box id="security" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    5. Security Measures & Encryption Protocols
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    We employ robust security standards, including SSL/TLS encryption for all data in transit, password hashing,
                    database firewall restrictions, and restricted server access controls. While we follow industry best practices
                    to prevent data breaches, no network storage or database is 100% secure. You are responsible for keeping your
                    login credentials safe.
                  </Typography>
                </Box>

                <Box id="rights" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    6. Your Privacy Rights & Controls
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    You have the right to access, edit, update, or request the deletion of your personal data at any
                    time. You can modify your information directly in your profile dashboard or by contacting our support
                    desk to request permanent deletion.
                  </Typography>
                </Box>

                <Box id="cookies" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    7. Cookies and Session Tokens
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    The Platform uses cookies, local browser storage, and session tokens to keep you logged in, remember your
                    address preferences, and track analytics traffic. You can adjust your browser cookie settings to reject
                    tracking, but this might require you to re-authenticate or manually re-enter location details during every visit.
                  </Typography>
                </Box>

                <Box id="children" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    8. Children's Privacy Policies
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    Shoptera does not intentionally collect or process data from individuals under 18 years of age. If we learn
                    that a minor has registered an account or provided us with personal information without parental consent, we
                    will immediately delete the data from our records.
                  </Typography>
                </Box>

                <Box id="changes" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    9. Changes to this Privacy Policy & Contact
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    We may revise this Privacy Policy periodically to reflect shifts in regulatory mandates or Platform features.
                    We will notify you of any material changes by updating the effective date at the top of this page. For any
                    inquiries, data portable copies, or deletion requests, please contact our Data Protection Officer at:
                    <strong> privacy@shoptera.com</strong>.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </UserLayout>
  );
}
