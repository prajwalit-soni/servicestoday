"use client";

import React, { useState } from "react";
import { Box, Container, Typography, Paper, Divider, Accordion, AccordionSummary, AccordionDetails, Grid, List, ListItemButton, ListItemText, TextField, InputAdornment } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import UserLayout from "../user/layout";

export default function HelpCenter() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "customer" | "vendor">("all");

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const customerFaqs = [
    {
      id: "c1",
      category: "customer",
      question: "How do I book a service on Shoptera?",
      answer: "Booking a service is simple. Browse our categories from the home page, select a service class (like AC repair or salon), pick a package, fill in your delivery address, and proceed to checkout to confirm your appointment.",
    },
    {
      id: "c2",
      category: "customer",
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can reschedule or cancel bookings directly from your profile dashboard. Cancellations made up to 2 hours before the scheduled appointment are free of charge. Cancellations within the 2-hour window may incur a nominal cancellation fee.",
    },
    {
      id: "c3",
      category: "customer",
      question: "How do I pay for services?",
      answer: "All payments must be made online through the Shoptera platform using credit cards, debit cards, UPI, or net banking during booking checkout. To ensure your safety and transaction security, offline cash payments directly to service providers are strictly prohibited.",
    },
    {
      id: "c4",
      category: "customer",
      question: "What should I do if the provider does not show up?",
      answer: "If your service provider has not arrived within 15 minutes of the scheduled time, please contact us immediately at support@shoptera.com or use the support hotline. We will either re-assign a new provider immediately or process a full refund to your account.",
    },
  ];

  const vendorFaqs = [
    {
      id: "v1",
      category: "vendor",
      question: "What is the difference between a Vendor and a Partner account?",
      answer: "Vendors represent established businesses or companies operating with multiple service technicians. Partners are independent individuals who register to offer their personal expertise directly on the Platform.",
    },
    {
      id: "v2",
      category: "vendor",
      question: "How do I register my business on Shoptera?",
      answer: "Go to the Join as Vendor/Partner page, fill in your details, select your area type (urban/rural), upload your trade licenses or identification documents, and set your location. Once our compliance team reviews and verifies your documents (typically within 24-48 hours), your services will go live.",
    },
    {
      id: "v3",
      category: "vendor",
      question: "How and when do I get paid for my jobs?",
      answer: "Once a service booking status is marked as 'completed' by the customer or verified by GPS tracking, the earnings are credited to your vendor wallet. Wallet balances are settled and paid out directly to your registered bank account weekly on every Monday.",
    },
    {
      id: "v4",
      category: "vendor",
      question: "Why do I need to share my GPS location?",
      answer: "Shoptera is a local aggregator. We collect location coordinates so that our matching algorithm can assign you to jobs closest to you, reducing your travel overhead and ensuring fast service times for customers.",
    },
  ];

  const allFaqs = [...customerFaqs, ...vendorFaqs];

  // Filter FAQs based on category and search query
  const filteredFaqs = allFaqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <UserLayout>
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Header Banner */}
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              py: 5,
              px: 4,
              borderRadius: "24px",
              background: "linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)",
              border: "1px solid #D1FAE5",
              boxShadow: "0px 10px 30px rgba(16, 185, 129, 0.03)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "#111827",
                mb: 1.5,
                fontSize: { xs: "28px", md: "40px" },
                letterSpacing: "-0.5px",
              }}
            >
              How can we help you?
            </Typography>
            <Typography variant="body1" sx={{ color: "#065F46", fontWeight: 500, fontSize: "16px", mb: 3 }}>
              Search for answers or browse categories below.
            </Typography>
            
            {/* Search Input */}
            <Box sx={{ maxWidth: "540px", mx: "auto" }}>
              <TextField
                fullWidth
                placeholder="Search articles, questions, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#10B981" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: "white",
                  borderRadius: "16px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
                    "& fieldset": { borderColor: "#E5E7EB" },
                    "&:hover fieldset": { borderColor: "#10B981" },
                    "&.Mui-focused fieldset": { borderColor: "#10B981" },
                  },
                }}
              />
            </Box>
          </Box>

          <Grid container spacing={4}>
            {/* Left Sidebar Menu */}
            <Grid size={{ xs: 12, md: 3.5 }}>
              <Box sx={{ position: { md: "sticky" }, top: "100px", display: "flex", flexDirection: "column", gap: 3 }}>
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
                  <Typography variant="subtitle2" sx={{ px: 2, py: 1.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
                    Categories
                  </Typography>
                  <List component="nav" disablePadding>
                    <ListItemButton
                      selected={selectedCategory === "all"}
                      onClick={() => setSelectedCategory("all")}
                      sx={{
                        borderRadius: "10px",
                        mb: 0.5,
                        "&.Mui-selected": { bgcolor: "#ECFDF5", color: "#065F46", "&:hover": { bgcolor: "#ECFDF5" } },
                      }}
                    >
                      <ListItemText primary="All Questions" primaryTypographyProps={{ fontSize: "14.5px", fontWeight: 600 }} />
                    </ListItemButton>

                    <ListItemButton
                      selected={selectedCategory === "customer"}
                      onClick={() => setSelectedCategory("customer")}
                      sx={{
                        borderRadius: "10px",
                        mb: 0.5,
                        "&.Mui-selected": { bgcolor: "#ECFDF5", color: "#065F46", "&:hover": { bgcolor: "#ECFDF5" } },
                      }}
                    >
                      <ListItemText primary="For Customers" primaryTypographyProps={{ fontSize: "14.5px", fontWeight: 600 }} />
                    </ListItemButton>

                    <ListItemButton
                      selected={selectedCategory === "vendor"}
                      onClick={() => setSelectedCategory("vendor")}
                      sx={{
                        borderRadius: "10px",
                        "&.Mui-selected": { bgcolor: "#ECFDF5", color: "#065F46", "&:hover": { bgcolor: "#ECFDF5" } },
                      }}
                    >
                      <ListItemText primary="For Vendors & Partners" primaryTypographyProps={{ fontSize: "14.5px", fontWeight: 600 }} />
                    </ListItemButton>
                  </List>
                </Paper>

                {/* Direct Contact Card */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    bgcolor: "white",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      bgcolor: "#ECFDF5",
                      color: "#10B981",
                      mb: 2,
                    }}
                  >
                    <SupportAgentIcon />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827", mb: 1, fontSize: "16px" }}>
                    Still have questions?
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6B7280", mb: 2, fontSize: "13px" }}>
                    Our dedicated support desk is available 24/7.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ color: "#111827", fontWeight: 600, mb: 0.5, fontSize: "13.5px" }}>
                    Email: <span style={{ color: "#10B981" }}>support@shoptera.com</span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#111827", fontWeight: 600, fontSize: "13.5px" }}>
                    Hotline: <span style={{ color: "#10B981" }}>+1 (800) 123-4567</span>
                  </Typography>
                </Paper>
              </Box>
            </Grid>

            {/* Right Side FAQs Area */}
            <Grid size={{ xs: 12, md: 8.5 }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: "24px",
                  border: "1px solid #E5E7EB",
                  bgcolor: "white",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.01)",
                }}
              >
                {filteredFaqs.length > 0 ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Render Category Group Title inside list if 'All' is selected */}
                    {selectedCategory === "all" && filteredFaqs.some(f => f.category === "customer") && (
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mt: 1, mb: 1, fontSize: "18px" }}>
                        For Customers
                      </Typography>
                    )}
                    
                    {filteredFaqs
                      .filter(f => selectedCategory !== "all" || f.category === "customer")
                      .map((faq) => (
                        <Accordion
                          key={faq.id}
                          expanded={expanded === faq.id}
                          onChange={handleChange(faq.id)}
                          elevation={0}
                          sx={{
                            border: "1px solid #E5E7EB",
                            borderRadius: "12px !important",
                            "&:before": { display: "none" },
                            transition: "border-color 0.2s ease",
                            "&:hover": { borderColor: "#10B981" },
                          }}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#10B981" }} />}>
                            <Typography sx={{ fontWeight: 600, color: "#1F2937", fontSize: "15px" }}>
                              {faq.question}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ borderTop: "1px solid #E5E7EB", p: 2.5, bgcolor: "#F9FAFB" }}>
                            <Typography sx={{ color: "#4B5563", fontSize: "14px", lineHeight: 1.6 }}>
                              {faq.answer}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}

                    {selectedCategory === "all" && filteredFaqs.some(f => f.category === "vendor") && (
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827", mt: 4, mb: 1, fontSize: "18px" }}>
                        For Vendors & Partners
                      </Typography>
                    )}

                    {filteredFaqs
                      .filter(f => selectedCategory !== "all" || f.category === "vendor")
                      .map((faq) => (
                        <Accordion
                          key={faq.id}
                          expanded={expanded === faq.id}
                          onChange={handleChange(faq.id)}
                          elevation={0}
                          sx={{
                            border: "1px solid #E5E7EB",
                            borderRadius: "12px !important",
                            "&:before": { display: "none" },
                            transition: "border-color 0.2s ease",
                            "&:hover": { borderColor: "#10B981" },
                          }}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#10B981" }} />}>
                            <Typography sx={{ fontWeight: 600, color: "#1F2937", fontSize: "15px" }}>
                              {faq.question}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ borderTop: "1px solid #E5E7EB", p: 2.5, bgcolor: "#F9FAFB" }}>
                            <Typography sx={{ color: "#4B5563", fontSize: "14px", lineHeight: 1.6 }}>
                              {faq.answer}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#4B5563", mb: 1 }}>
                      No results found
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#9CA3AF" }}>
                      Try adjusting your search terms or selecting a different category.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </UserLayout>
  );
}
