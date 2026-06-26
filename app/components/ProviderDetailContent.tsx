"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Paper,
  Rating,
  Divider,
  Avatar,
  IconButton,
  Card,
  CardMedia,
  Stack,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ServiceProvider } from "../lib/servicesData";
import ImageWithFallback from "./ImageWithFallback";

interface ProviderDetailContentProps {
  provider: ServiceProvider;
}

const ProviderDetailContent: React.FC<ProviderDetailContentProps> = ({
  provider,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? provider.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === provider.images.length - 1 ? 0 : prev + 1,
    );
  };

  // Mock data for additional sections (in a real app, this would come from API/database)
  const about =
    "We provide professional " +
    provider.category.toLowerCase() +
    " services with over 15 years of experience. Our team of certified professionals is dedicated to delivering quality service with customer satisfaction as our top priority. We use modern equipment and follow industry best practices to ensure the best results.";

  const services = [
    {
      name: "Basic Service",
      price: "₹499",
      description: "Standard service package",
    },
    {
      name: "Advanced Service",
      price: "₹999",
      description: "Comprehensive solution",
    },
    {
      name: "Premium Package",
      price: "₹1,499",
      description: "All-inclusive service",
    },
    {
      name: "Emergency Service",
      price: "₹1,999",
      description: "24/7 urgent support",
    },
  ];

  const reviews = [
    {
      name: "Rajesh Kumar",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent service! Very professional and completed the work on time. Highly recommended.",
      avatar: "R",
    },
    {
      name: "Priya Sharma",
      rating: 4,
      date: "1 week ago",
      comment:
        "Good quality work. The team was courteous and cleaned up after the job. Would hire again.",
      avatar: "P",
    },
    {
      name: "Amit Reddy",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Outstanding work! They arrived on time and finished ahead of schedule. Very satisfied with the results.",
      avatar: "A",
    },
  ];

  const operatingHours = [
    { day: "Monday", hours: "9:00 AM - 9:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 9:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 9:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 9:00 PM" },
    { day: "Friday", hours: "9:00 AM - 9:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 8:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
  ];

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      {/* Full-Width Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
          color: "white",
          py: 3,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, flex: 1 }}>
              {provider.name}
            </Typography>
            {provider.isVerified && (
              <Chip
                icon={<VerifiedIcon sx={{ color: "white !important" }} />}
                label="Verified"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#10B981",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  gap: 0.5,
                  fontWeight: 700,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {provider.rating.toFixed(1)}
                </Typography>
                <StarIcon sx={{ fontSize: 18 }} />
              </Box>
              <Typography variant="body2">
                {provider.reviewCount.toLocaleString()} Ratings
              </Typography>
            </Box>

            <Chip
              label={provider.category}
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
              }}
            />

            {provider.isOpen && (
              <Chip
                label="Open Now"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#10B981",
                  fontWeight: 600,
                }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">
              {provider.address}, {provider.area}, {provider.city}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Column - Main Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Image Gallery */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
              >
                Gallery
              </Typography>

              <Box sx={{ position: "relative", mb: 2 }}>
                <ImageWithFallback
                  src={provider.images[selectedImageIndex]}
                  fallback="/assets/images/Image-alt.jpg"
                  alt={provider.name}
                  sx={{
                    width: "100%",
                    height: 400,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />

                {provider.images.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrevImage}
                      sx={{
                        position: "absolute",
                        left: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(255,255,255,0.9)",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleNextImage}
                      sx={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(255,255,255,0.9)",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        backgroundColor: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontWeight: 600,
                      }}
                    >
                      {selectedImageIndex + 1} / {provider.images.length}
                    </Box>
                  </>
                )}
              </Box>

              {/* Thumbnail Gallery */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {provider.images.map((image, index) => (
                  <Card
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    sx={{
                      cursor: "pointer",
                      border:
                        selectedImageIndex === index
                          ? "2px solid #10B981"
                          : "2px solid transparent",
                      borderRadius: 1,
                      transition: "all 0.2s",
                      width: "calc(25% - 8px)",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <ImageWithFallback
                      src={image}
                      fallback="/assets/images/Image-alt.jpg"
                      alt={`${provider.name} ${index + 1}`}
                      sx={{
                        height: 80,
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Card>
                ))}
              </Box>
            </Paper>

            {/* About Section */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
              >
                About
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", lineHeight: 1.8 }}
              >
                {about}
              </Typography>

              {provider.tags && provider.tags.length > 0 && (
                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  {provider.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      icon={<CheckCircleIcon />}
                      sx={{
                        backgroundColor: "#f0fdf4",
                        color: "#10B981",
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Paper>

            {/* Services Offered */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
              >
                Services Offered
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {services.map((service, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      transition: "all 0.3s",
                      width: { xs: "100%", sm: "calc(50% - 8px)" },
                      "&:hover": {
                        borderColor: "#10B981",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {service.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "#10B981", fontWeight: 700 }}
                      >
                        {service.price}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {service.description}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Paper>

            {/* Customer Reviews */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
              >
                Customer Reviews
              </Typography>

              {reviews.map((review, index) => (
                <Box key={index}>
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor: "#10B981",
                        width: 48,
                        height: 48,
                        fontWeight: 600,
                      }}
                    >
                      {review.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {review.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#666" }}>
                          {review.date}
                        </Typography>
                      </Box>
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        {review.comment}
                      </Typography>
                    </Box>
                  </Box>
                  {index < reviews.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 2,
                  textTransform: "none",
                  borderColor: "#10B981",
                  color: "#10B981",
                  "&:hover": {
                    borderColor: "#059669",
                    backgroundColor: "rgba(16, 185, 129, 0.05)",
                  },
                }}
              >
                View All {provider.reviewCount.toLocaleString()} Reviews
              </Button>
            </Paper>

            {/* Operating Hours */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
              >
                <AccessTimeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Operating Hours
              </Typography>

              {operatingHours.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1.5,
                    px: 2,
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.day}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#10B981" }}>
                    {item.hours}
                  </Typography>
                </Box>
              ))}
            </Paper>

            {/* Location */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
              >
                <LocationOnIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Location
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  {provider.address}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
                  {provider.area}, {provider.city}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<LocationOnIcon />}
                  sx={{
                    textTransform: "none",
                    borderColor: "#10B981",
                    color: "#10B981",
                    "&:hover": {
                      borderColor: "#059669",
                      backgroundColor: "rgba(16, 185, 129, 0.05)",
                    },
                  }}
                >
                  Get Directions
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Right Column - Sticky Sidebar */}
          <Box sx={{ width: { xs: "100%", md: 360 }, flexShrink: 0 }}>
            <Box sx={{ position: "sticky", top: 100 }}>
              {/* Contact Information */}
              <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, color: "#1a1a1a" }}
                >
                  Contact Information
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<PhoneIcon />}
                  sx={{
                    mb: 2,
                    background:
                      "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    py: 1.5,
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #059669 0%, #047857 100%)",
                    },
                  }}
                >
                  Call {provider.phone}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  sx={{
                    textTransform: "none",
                    fontSize: "1rem",
                    borderColor: "#10B981",
                    color: "#10B981",
                    py: 1.5,
                    "&:hover": {
                      borderColor: "#059669",
                      backgroundColor: "rgba(16, 185, 129, 0.05)",
                    },
                  }}
                >
                  Send Email
                </Button>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <LocationOnIcon sx={{ color: "#666", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {provider.address}, {provider.area}
                  </Typography>
                </Box>

                {provider.closingTime && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTimeIcon sx={{ color: "#666", fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "#10B981", fontWeight: 600 }}
                    >
                      Open until {provider.closingTime}
                    </Typography>
                  </Box>
                )}
              </Paper>

              {/* Social Proof */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 3, color: "#1a1a1a" }}
                >
                  Why Choose Us
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#f0fdf4",
                      borderRadius: "50%",
                      width: 56,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BusinessIcon sx={{ color: "#10B981", fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#10B981" }}
                    >
                      15+ Years
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      In Business
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#f0fdf4",
                      borderRadius: "50%",
                      width: 56,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleIcon sx={{ color: "#10B981", fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#10B981" }}
                    >
                      10,000+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Happy Customers
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: "#f0fdf4",
                      borderRadius: "50%",
                      width: 56,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <VerifiedIcon sx={{ color: "#10B981", fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#10B981" }}
                    >
                      Certified
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Licensed Professionals
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProviderDetailContent;
