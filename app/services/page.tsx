"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Navbar from "../user/components/Navbar";
import {
  services,
  serviceCategories,
  Service,
} from "../lib/servicesData";

const ServicesPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const search = params.get("search");
      if (search) {
        setSearchTerm(decodeURIComponent(search));
      }
    }
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === "" ||
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleServiceClick = (service: Service) => {
    const categoryKey = service.category.toLowerCase().replace(/\s+/g, '-');
    const detailId = categoryKey === 'beautician' ? 'salon' : categoryKey;
    router.push(`/services/${detailId}`);
  };

  const displayedServices = filteredServices;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Navbar />

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 6, flexGrow: 1 }}>
        {/* Hero Title */}
        <Typography
          variant="h3"
          sx={{
            color: "#0F0F0F",
            fontSize: { xs: "28px", md: "36px" },
            lineHeight: "44px",
            mb: 3,
            fontWeight: 700,
          }}
        >
          Elite <span style={{ color: "#16395f" }}> home</span> services at <br /> your <span style={{ color: "#16395f" }}>door</span>
        </Typography>

        {/* Search Bar */}
        <Box sx={{ mb: 4, maxWidth: "500px" }}>
          <TextField
            fullWidth
            placeholder="Search for services"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#757575" }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchTerm("")} size="small" edge="end">
                    <ClearIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: "30px",
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid #E3E3E3",
                "& fieldset": { border: "none" },
                paddingLeft: "16px",
                paddingRight: "8px",
                height: "48px",
              }
            }}
          />
        </Box>

        {/* Category Filter Chips */}
        <Box
          sx={{
            mb: 4,
            overflowX: "auto",
            pb: 1.5,
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#e3e3e3", borderRadius: "3px" }
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <Chip
              label="All Services"
              onClick={() => setSelectedCategory("All")}
              sx={{
                fontSize: "14px",
                py: 2,
                px: 1,
                cursor: "pointer",
                borderRadius: "20px",
                border: "1px solid",
                borderColor: selectedCategory === "All" ? "#6E42E5" : "#E3E3E3",
                bgcolor: selectedCategory === "All" ? "#6E42E5" : "white",
                color: selectedCategory === "All" ? "white" : "#0F0F0F",
                "&:hover": {
                  bgcolor: selectedCategory === "All" ? "#5932C8" : "#F5F5F5",
                }
              }}
            />
            {serviceCategories.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <Chip
                  key={category.id}
                  icon={<span style={{ fontSize: "16px", marginLeft: "4px" }}>{category.icon}</span>}
                  label={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  sx={{
                    fontSize: "14px",
                    py: 2,
                    px: 1,
                    cursor: "pointer",
                    borderRadius: "20px",
                    border: "1px solid",
                    borderColor: isSelected ? "#6E42E5" : "#E3E3E3",
                    bgcolor: isSelected ? "#6E42E5" : "white",
                    color: isSelected ? "white" : "#0F0F0F",
                    "&:hover": {
                      bgcolor: isSelected ? "#5932C8" : "#F5F5F5",
                    }
                  }}
                />
              );
            })}
          </Stack>
        </Box>

        {/* Service Grid - Full Width */}
        {displayedServices.length === 0 ? (
          <Box
            sx={{
              py: 8,
              px: 4,
              textAlign: "center",
              border: "1px dashed #E3E3E3",
              borderRadius: "12px",
              mb: 4,
              bgcolor: "white",
            }}
          >
            <Typography variant="h6" sx={{ color: "#757575", mb: 1, fontWeight: 600 }}>
              No services found
            </Typography>
            <Typography sx={{ color: "#9E9E9E", fontSize: "14px" }}>
              Try searching for a different term or clearing the selected category filter.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)"
              },
              gap: 3,
              mb: 4,
            }}
          >
            {displayedServices.map((service) => (
              <Box
                key={service.id}
                onClick={() => handleServiceClick(service)}
                sx={{
                  cursor: "pointer",
                  bgcolor: "white",
                  borderRadius: "12px",
                  border: "1px solid #E3E3E3",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    borderColor: "#6E42E5",
                  },
                }}
              >
                {/* Service Image Container */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    bgcolor: "#F5F5F5",
                  }}
                >
                  {/* Time Badge */}
                  {service.availability && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        zIndex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid rgba(226,226,226,1.00)",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "os_semi_bold",
                            fontSize: "11px",
                            lineHeight: "14px",
                            color: "rgba(7,121,76,1.00)",
                            fontWeight: 600,
                          }}
                        >
                          {service.availability === "Available Now"
                            ? "46 mins"
                            : service.availability === "Instant"
                              ? "26 mins"
                              : service.availability}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {/* Image */}
                  <img
                    src={service.image}
                    alt={service.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Info Container */}
                <Box sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  {/* Category Name */}
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: "#6E42E5",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      mb: 0.5,
                    }}
                  >
                    {service.category}
                  </Typography>

                  {/* Service Name */}
                  <Typography
                    sx={{
                      fontFamily: "os_bold",
                      fontSize: "14px",
                      lineHeight: "18px",
                      color: "#0F0F0F",
                      fontWeight: 600,
                      mb: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      height: "36px",
                    }}
                  >
                    {service.name}
                  </Typography>

                  {/* Rating & Pricing */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto", pt: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <span style={{ color: "#FFB400", fontSize: "14px" }}>★</span>
                      <Typography sx={{ fontSize: "12px", color: "#757575", fontWeight: 500 }}>
                        {service.rating.toFixed(1)}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#0F0F0F" }}>
                      ₹{service.price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      {/* Simple Footer */}
      <Box
        sx={{
          borderTop: "1px solid #E3E3E3",
          py: 3,
          bgcolor: "white",
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: "#757575", fontSize: "13px" }}>
          © {new Date().getFullYear()} Shoptera. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default ServicesPage;
