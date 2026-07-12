"use client";

import React from "react";
import { Box, Container, Typography, Paper, Divider, List, ListItem, Grid, ListItemButton, ListItemText } from "@mui/material";
import UserLayout from "../user/layout";

export default function TermsOfService() {
  const sections = [
    { id: "acceptance", label: "1. Acceptance & Contract" },
    { id: "scope", label: "2. Scope of Platform" },
    { id: "safety", label: "3. Account Safety" },
    { id: "payments", label: "4. Bookings & Payments" },
    { id: "standards", label: "5. Partner Standards" },
    { id: "prohibited", label: "6. Prohibited Activities" },
    { id: "liability", label: "7. Limitation of Liability" },
    { id: "termination", label: "8. Suspending & Data Rights" },
    { id: "dispute", label: "9. Dispute Resolution" },
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
              Terms of Service
            </Typography>
            <Typography variant="body2" sx={{ color: "#4B5563", fontWeight: 600, fontSize: "14px" }}>
              Effective Date: June 25, 2026 | Version 2.0
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
                  Welcome to Shoptera. These Terms of Service ("Terms") form a legally binding contract between you
                  (referred to as "User," "Customer," or "you") and Shoptera Technologies Private Limited ("Shoptera,"
                  "we," "our," or "us"). These Terms govern your access to and use of the Shoptera online marketplace,
                  including our website, mobile applications, API layers, and on-demand matching services (collectively, the
                  "Platform"). Please review these Terms carefully before using the Platform.
                </Typography>

                <Divider />

                <Box id="acceptance" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    1. Acceptance & Contractual Binding
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    By creating a user profile, registering as a service vendor, booking a service, or browsing our catalog
                    on the Platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and
                    our Privacy Policy. If you do not agree to these conditions, you are prohibited from utilizing the Platform
                    or booking any service through it.
                  </Typography>
                </Box>

                <Box id="scope" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    2. Scope of Platform & Role of Shoptera
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    Shoptera operates strictly as an intermediary technology aggregator. The Platform connects independent
                    service providers ("Vendors" and "Partners") with consumers looking to hire local services (such as appliance
                    repair, cleaning, electrical works, plumbing, and beauty therapies). 
                    <br /><br />
                    Shoptera does not employ, contract, or manage the service providers directly. Service providers operate as
                    independent contractors. We do not guarantee the completion, quality, timeliness, safety, or legality of any
                    service performed, and we do not assume responsibility for disputes, losses, or damages occurring at the
                    physical service site.
                  </Typography>
                </Box>

                <Box id="safety" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    3. User Account Safety & Verification
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px", mb: 2 }}>
                    To book services or list your business, you must register a secure account. You are solely responsible
                    for maintaining the confidentiality of your account credentials, passwords, and OTP (One-Time Password) codes.
                    You agree to:
                  </Typography>
                  <List sx={{ pl: 2, listStyleType: "disc", "& .MuiListItem-root": { display: "list-item", py: 0.5 } }}>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Provide authentic, accurate, and verified information (legal name, active mobile number, and address).
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Notify us immediately if you suspect unauthorized access or any security breach of your account.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Ensure your registered location and contact coordinates are kept up-to-date for service matching.
                    </ListItem>
                  </List>
                </Box>

                <Box id="payments" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    4. Bookings, Pricing, and Payments
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    Service prices are displayed transparently on the Platform and are subject to change based on custom scope
                    requirements or onsite inspections. All payments must be processed using the Platform's authorized payment
                    gateways. Cash payments or offline transactions directly with service providers are strictly prohibited and
                    will result in account termination.
                    <br /><br />
                    <strong>Cancellations & Refunds:</strong> You can cancel a booking without penalty up to 2 hours before the
                    scheduled service time. Cancellations made within the 2-hour window are subject to a late cancellation fee.
                    Platform service fees are non-refundable once the provider has arrived at the location.
                  </Typography>
                </Box>

                <Box id="standards" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    5. Service Provider (Vendor/Partner) Standards
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    Vendors and Partners who offer services represent that they hold all valid business registrations, local
                    trade licenses, certifications, and safety clearances necessary to perform the requested jobs in their
                    jurisdiction. Providers must behave professionally, treat customers with respect, ensure site safety, and
                    adhere to the specifications agreed upon in the booking. 
                    <br /><br />
                    Any attempt by a provider to bypass the Platform by negotiating direct offline billing with Shoptera customers
                    will lead to instant blacklist and forfeiture of outstanding payouts.
                  </Typography>
                </Box>

                <Box id="prohibited" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    6. Platform Rules & Prohibited Activities
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px", mb: 2 }}>
                    When using the Platform, you agree that you will not:
                  </Typography>
                  <List sx={{ pl: 2, listStyleType: "disc", "& .MuiListItem-root": { display: "list-item", py: 0.5 } }}>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Submit false, defamatory, or manipulated ratings, feedback, or reviews.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Provide incorrect location coordinates or book fake service requests.
                    </ListItem>
                    <ListItem disablePadding sx={{ color: "#4B5563" }}>
                      Use automated crawlers, scrapers, or reverse-engineer the matching algorithm code.
                    </ListItem>
                  </List>
                </Box>

                <Box id="liability" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    7. Limitation of Liability & Indemnity
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    To the maximum extent permitted by applicable law, Shoptera Technologies Private Limited, its directors,
                    and employees shall not be liable for any indirect, incidental, punitive, or consequential damages, or any
                    loss of profits, revenue, or data. This includes physical injury, theft, property damage, or poor quality of
                    works resulting from services booked on the Platform. 
                    <br /><br />
                    Our total liability for any claim arising out of these Terms or use of the Platform is strictly limited to
                    the amount paid by the customer to Shoptera for that specific service booking request.
                  </Typography>
                </Box>

                <Box id="termination" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    8. Termination, Suspensions, and Data Rights
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    We reserve the right to temporarily suspend or permanently terminate your account and block Platform access
                    if we detect violations of these Terms, suspicious booking patterns, or poor ratings. You can close your account
                    and request deletion of your data at any time by contacting our support desk or selecting account deletion from
                    your profile settings.
                  </Typography>
                </Box>

                <Box id="dispute" sx={{ scrollMarginTop: "100px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mb: 1.5, fontSize: "18px" }}>
                    9. Dispute Resolution & Governing Law
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#4B5563", lineHeight: 1.8, fontSize: "15px" }}>
                    These Terms shall be governed by, and construed in accordance with, the laws of the jurisdiction in which
                    Shoptera operates. Any disputes, claims, or controversies arising out of this agreement or the use of the
                    Platform shall be subject to the exclusive jurisdiction of the local courts situated at the corporate headquarters
                    location of Shoptera. 
                    <br /><br />
                    For any support inquiries, refund requests, or policy questions, please reach out to us at:
                    <strong> support@shoptera.com</strong>.
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
