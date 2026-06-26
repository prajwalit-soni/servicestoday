"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ServicesSidebar from "../../components/ServicesSidebar";
import ImageWithFallback from "../../components/ImageWithFallback";
import { services, serviceCategories } from "../../lib/servicesData";
import BecomeVendor from "../components/BecomeVendor";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axiosClient from "../../lib/api";

typeof window !== "undefined" ? window.innerWidth < 600 : 3;
const ServicesPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const [banners, setBanners] = useState<{ id: any; image_url?: string; title?: string }[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axiosClient.get("/public/banners");
        if (res.data?.success && Array.isArray(res.data?.data)) {
          setBanners(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchBanners();
  }, []);

  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    // Route to service detail page instead of filtering
    router.push(`/services/${category.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleServiceClick = (serviceId: string | number) => {
    router.push(`/services/${serviceId}`);
  };

  // Display services based on showAllServices state
  const displayedServices = showAllServices
    ? filteredServices
    : filteredServices.slice(0, 8);

  // Featured carousel services (next 6)
  const featuredServices = services.slice(9, 15);

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextCarousel = () => {
    setCarouselIndex((prev) =>
      Math.min(prev + 1, featuredServices.length - visibleCards),
    );
  };

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const visibleCards = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <Box sx={{ pt: 2, minHeight: "100vh" }}>
        {/* Hero Title */}
        <Typography
          variant="h3"
          sx={{
            // fontWeight: 600,
            color: "#0F0F0F",
            fontSize: { xs: "28px", md: "36px" },
            lineHeight: "44px",
            mb: 4,
          }}
        >
          Elite Home Services At
          <br /> Your Door
        </Typography>


        {/* Top Section: 40% Services Grid + 60% Zigzag Images */}
        <Box
          sx={{
            display: "flex",
            gap: 10,
            mb: 5,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left 40% - What are you looking for? Section */}
          <Box
            sx={{
              flex: {
                xs: "1",
                md: "0 0 40%",
                alignItems: "center",
              },
            }}
          >
            <Box
              sx={{
                flex: { xs: "1", md: "0 0 40%" },
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: { xs: 2, sm: 3 },
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#545454",
                  fontSize: "20px",
                  lineHeight: "28px",
                  mb: 3,
                }}
              >
                What are you looking for?
              </Typography>

              {/* Service Icons Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 2,
                }}
              >
                {serviceCategories.slice(0, 8).map((category) => (
                  <Box
                    key={category.id}
                    sx={{
                      cursor: "pointer",
                      textAlign: "center",
                      padding: 1,
                      borderRadius: "8px",
                      transition: "background-color 0.2s",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.04)",
                      },
                    }}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        fontSize: "48px",
                        mb: 0.5,
                        height: 60,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {category.icon}
                    </Box>

                    {/* Time badge for some services */}
                    {(category.name === "AC Repair" ||
                      category.name === "Electrician" ||
                      category.name === "Carpenter") && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#07794C",
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        26 mins
                      </Typography>
                    )}

                    {/* Service Name */}
                    <Typography
                      sx={{
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#0F0F0F",
                        fontWeight: 400,
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                ))}

                {/* View All Button */}
                <Box
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    padding: 1,
                    borderRadius: "8px",
                    transition: "background-color 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)",
                    },
                  }}
                  onClick={() => router.push("/services")}
                >
                  <Box
                    sx={{
                      mb: 0.5,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: 32, color: "#6E42E5" }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#6E42E5",
                      fontWeight: 600,
                    }}
                  >
                    View All
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* Rating Badges Section */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                marginTop: 3,
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              {/* 4.8 Rating Badge */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "4px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <ImageWithFallback
                    src="https://www.urbancompany.com/img?quality=90&format=auto/w_48,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1693570188661-dba2e7.jpeg"
                    alt="4.8 Service Rating*"
                    fallback="/assets/images/Image-alt.jpg"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      aspectRatio: "1/1",
                    }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}
                >
                  <Typography
                    sx={{
                      fontFamily: "os_semi_bold",
                      fontSize: "20px",
                      lineHeight: "28px",
                      color: "rgba(15,15,15,1.00)",
                      fontWeight: 600,
                    }}
                  >
                    4.8
                  </Typography>
                  <Box sx={{ width: 4 }} />
                  <Typography
                    sx={{
                      fontFamily: "os_regular",
                      fontSize: "14px",
                      lineHeight: "24px",
                      color: "rgba(84,84,84,1.00)",
                      fontWeight: 400,
                    }}
                  >
                    Service Rating*
                  </Typography>
                </Box>
              </Box>

              {/* 12M+ Customers Badge */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "4px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <ImageWithFallback
                    src="https://www.urbancompany.com/img?quality=90&format=auto/w_48,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1693491890812-e86755.jpeg"
                    alt="12M+ Customers Globally*"
                    fallback="/assets/images/Image-alt.jpg"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      aspectRatio: "1/1",
                    }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}
                >
                  <Typography
                    sx={{
                      fontFamily: "os_semi_bold",
                      fontSize: "20px",
                      lineHeight: "28px",
                      color: "rgba(15,15,15,1.00)",
                      fontWeight: 600,
                    }}
                  >
                    12M+
                  </Typography>
                  <Box sx={{ width: 4 }} />
                  <Typography
                    sx={{
                      fontFamily: "os_regular",
                      fontSize: "14px",
                      lineHeight: "24px",
                      color: "rgba(84,84,84,1.00)",
                      fontWeight: 400,
                    }}
                  >
                    Customers Globally*
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right 60% - Zigzag Images */}
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gridTemplateRows: "repeat(2, minmax(0, 1fr))",
              gap: 2,
              height: { xs: "auto", md: "auto" },
              maxHeight: "100%",
              overflow: "hidden",
            }}
          >
            {/* Top Left Image */}
            <Box
              sx={{
                gridColumn: "1 / 2",
                gridRow: "1 / 2",
                borderRadius: "12px",
                overflow: "hidden",
                minHeight: 0,
                height: { xs: "200px", md: "100%" },
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop"
                alt="Beauty Services"
                fallback="/assets/images/Image-alt.jpg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Top Right Image */}
            <Box
              sx={{
                gridColumn: "2 / 3",
                gridRow: "1 / 2",
                borderRadius: "12px",
                overflow: "hidden",
                minHeight: 0,
                height: { xs: "200px", md: "100%" },
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop"
                alt="Massage Services"
                fallback="/assets/images/Image-alt.jpg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Bottom Left Image */}
            <Box
              sx={{
                gridColumn: "1 / 2",
                gridRow: "2 / 3",
                borderRadius: "12px",
                overflow: "hidden",
                minHeight: 0,
                height: { xs: "200px", md: "100%" },
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop"
                alt="Painting Services"
                fallback="/assets/images/Image-alt.jpg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Bottom Right Image */}
            <Box
              sx={{
                gridColumn: "2 / 3",
                gridRow: "2 / 3",
                borderRadius: "12px",
                overflow: "hidden",
                minHeight: 0,
                height: { xs: "200px", md: "100%" },
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
                alt="AC Repair Services"
                fallback="/assets/images/Image-alt.jpg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Below: Services Grid and Sidebar */}
      <Box
        sx={{
          display: "flex",
          gap: 10,
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* Left Section - 70% */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#0F0F0F",
              fontSize: "36px",
              lineHeight: "44px",
              mb: 4,
            }}
          >
            Highest in-demand services
          </Typography>
          {/* Service Grid - 4 columns */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
              mb: 4,
            }}
          >
            {displayedServices.map((service) => (
              <Box
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                sx={{
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                {/* Service Image Container */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    mb: 1.5,
                  }}
                >
                  {/* Time Badge (if available) */}
                  {service.availability && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "1px solid rgba(226,226,226,1.00)",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "os_semi_bold",
                            fontSize: "12px",
                            lineHeight: "16px",
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
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      fallback="/assets/images/Image-alt.jpg"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>

                {/* Service Name */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "os_regular",
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "rgba(15,15,15,1.00)",
                      fontWeight: 400,
                      textAlign: "center",
                      maxWidth: "calc(100% - 8px)",
                    }}
                  >
                    {service.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* View More Button */}
          {!showAllServices && filteredServices.length > 8 && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Button
                onClick={() => setShowAllServices(true)}
                variant="outlined"
                sx={{
                  borderColor: "#E3E3E3",
                  color: "#0F0F0F",
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#0F0F0F",
                    backgroundColor: "rgba(0,0,0,0.04)",
                  },
                }}
              >
                More
              </Button>
            </Box>
          )}

          {/* Carousel Section */}
          <Box sx={{ my: 10 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#0F0F0F",
                  fontSize: {
                    xs: "24px",
                    sm: "30px",
                    md: "36px",
                  },
                  lineHeight: 1.2,
                }}
              >
                New and noteworthy
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  onClick={handlePrevCarousel}
                  disabled={carouselIndex === 0}
                  sx={{
                    border: "1px solid #E3E3E3",
                    borderRadius: "50%",
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                    },
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
                </IconButton>

                <IconButton
                  onClick={handleNextCarousel}
                  disabled={carouselIndex >= featuredServices.length - 1}
                  sx={{
                    border: "1px solid #E3E3E3",
                    borderRadius: "50%",
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                    },
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {featuredServices
                  .slice(carouselIndex, carouselIndex + visibleCards)
                  .map((service) => (
                    <Box
                      key={service.id}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: {
                            xs: 200,
                            sm: 220,
                            md: 233,
                          },
                          borderRadius: "8px",
                          overflow: "hidden",
                          mb: 1,
                        }}
                      >
                        <ImageWithFallback
                          src={service.image}
                          alt={service.name}
                          fallback="/assets/images/Image-alt.jpg"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#0F0F0F",
                          fontSize: "16px",
                          lineHeight: "24px",
                        }}
                      >
                        {service.name}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>

          {/* Full Width Banner(s) */}
          {banners.length > 0 ? (
            banners.map((banner) => (
              <Box
                key={banner.id || banner.image_url}
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                  mb: 4,
                }}
              >
                <ImageWithFallback
                  src={banner.image_url || ""}
                  alt={banner.title || "Shoptera Banner"}
                  fallback="https://www.urbancompany.com/img?bucket=urbanclap-prod&quality=90&format=auto/w_1232,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1736922795409-bece35.jpeg"
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "3/1",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))
          ) : (
            <Box
              sx={{
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                mb: 4,
              }}
            >
              <ImageWithFallback
                src="https://www.urbancompany.com/img?bucket=urbanclap-prod&quality=90&format=auto/w_1232,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1736922795409-bece35.jpeg"
                alt="Urban Company Spotlight"
                fallback="/assets/images/Image-alt.jpg"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "3/1",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Right Sidebar - 30% (Just Dial Style) */}
        <Box>
          <ServicesSidebar selectedCategory={selectedCategory} />
        </Box>
      </Box>

      <BecomeVendor />
    </Box>
  );
};

export default ServicesPage;
