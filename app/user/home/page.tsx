"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, IconButton, Button, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import ServicesSidebar from "../../components/ServicesSidebar";
import ImageWithFallback from "../../components/ImageWithFallback";
import { services, serviceCategories, getCategoryIconByName } from "../../lib/servicesData";
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
  const [categories, setCategories] = useState<any[]>([]);
  const [shuffledDemandServices, setShuffledDemandServices] = useState<any[]>([]);
  const [shuffledNoteworthyServices, setShuffledNoteworthyServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState<any[]>([]);
  const [bannersError, setBannersError] = useState<boolean>(false);

  useEffect(() => {
    // Helper to map category to service format
    const mapCategoryToService = (cat: any): any => {
      // Prioritize image_path, fallback to banner_image_path, then icon_path, then placeholder
      const imageUrl = cat.image_path || cat.banner_image_path || cat.icon_path ||
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400";

      return {
        id: cat.id || String(Math.random()),
        name: cat.name,
        slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-"),
        category: cat.name,
        description: cat.description || `Professional ${cat.name} services`,
        price: cat.price || 499, // default fallback price
        rating: cat.rating || parseFloat((4.5 + Math.random() * 0.5).toFixed(2)), // dynamic rating 4.5 to 5.0
        image: imageUrl,
        availability: "Available Now"
      };
    };

    // Shuffle array function
    const shuffleArray = (array: any[]) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("/public/home-categories");
        if (res.data?.success && Array.isArray(res.data?.data)) {
          const fetchedCats = res.data.data;
          setCategories(fetchedCats);

          if (fetchedCats.length > 0) {
            const mappedServices = fetchedCats.map(mapCategoryToService);
            // Shuffle independently for both sections
            setShuffledDemandServices(shuffleArray(mappedServices));
            setShuffledNoteworthyServices(shuffleArray(mappedServices));
          }
        }
      } catch (err) {
        // Silently handle
      }
    };

    const fetchBanners = async () => {
      try {
        const res = await axiosClient.get("/public/banners");
        if (res.data?.success && Array.isArray(res.data?.data)) {
          const fetchedBanners = res.data.data.filter(
            (b: any) => b.status === "active" || b.status === "Active"
          );
          let finalBanners = fetchedBanners;
          if (fetchedBanners.length > 4) {
            finalBanners = shuffleArray(fetchedBanners).slice(0, 4);
          }
          setBanners(finalBanners);
          setBannersError(false);
        } else {
          setBannersError(true);
        }
      } catch (err) {
        console.error("Failed to fetch home banners:", err);
        setBannersError(true);
      }
    };

    const loadAllData = async () => {
      setLoading(true);
      try {
        await Promise.allSettled([fetchCategories(), fetchBanners()]);
      } catch (err) {
        // Silently handle
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);



  const getBannerImageUrl = (path: string | undefined) => {
    if (!path) return "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1200";
    if (path.startsWith("http") || path.startsWith("data:")) return path;
    return `https://shoptera-backend.onrender.com${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const handleBannerClick = (url: string | undefined) => {
    if (!url) return;
    router.push(url);
  };

  // Determine if we should use API categories mapped to services
  const sourceServices = shuffledDemandServices;

  const filteredServices = selectedCategory === "All"
    ? sourceServices
    : sourceServices.filter((service) => service.category === selectedCategory);

  const handleCategoryChange = (slug: string) => {
    // Route to service detail page using slug directly
    router.push(`/services/${slug}`);
  };

  const handleServiceClick = (slug: string) => {
    router.push(`/services/${slug}`);
  };

  // Display services based on showAllServices state
  const displayedServices = showAllServices
    ? filteredServices
    : filteredServices.slice(0, 8);

  // Featured carousel services (shuffled API services if available)
  const featuredServices = shuffledNoteworthyServices;

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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          backgroundColor: "#fafafa",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#6E42E5" }} size={48} thickness={4} />
        <Typography sx={{ color: "#545454", fontWeight: 500, fontSize: "14px" }}>
          Loading Shoptera...
        </Typography>
      </Box>
    );
  }

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
            gap: 5,
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
                {categories.slice(0, 5).map((category) => {
                  // Get color from serviceCategories if available, else use fallback
                  const baseColor = serviceCategories.find(c => c.name === category.name)?.color || "#6E42E5";

                  // Convert hex color to rgba with opacity 0.08 for light background
                  let bgLight = "rgba(110, 66, 229, 0.08)";
                  if (baseColor.startsWith("#")) {
                    const r = parseInt(baseColor.slice(1, 3), 16);
                    const g = parseInt(baseColor.slice(3, 5), 16);
                    const b = parseInt(baseColor.slice(5, 7), 16);
                    bgLight = `rgba(${r}, ${g}, ${b}, 0.08)`;
                  }

                  return (
                    <Box
                      key={category.id}
                      sx={{
                        cursor: "pointer",
                        textAlign: "center",
                        padding: "36px 12px 30px 12px",
                        borderRadius: "16px",
                        border: "1px solid #F0F0F0",
                        background: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        position: "relative",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 24px rgba(110, 66, 229, 0.08)",
                          borderColor: "#6E42E5",
                          background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)",
                          "& .icon-wrapper": {
                            transform: "scale(1.08)",
                            backgroundColor: baseColor,
                            color: "#FFFFFF",
                          }
                        },
                      }}
                      onClick={() => handleCategoryChange(category.slug || category.name.toLowerCase().replace(/\s+/g, "-"))}
                    >
                      {/* Absolute Positioned Time Badge */}
                      {(category.name === "AC Repair" ||
                        category.name === "Electrician" ||
                        category.name === "Carpenter") && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              display: "inline-flex",
                              alignItems: "center",
                              bgcolor: "rgba(7, 121, 76, 0.08)",
                              borderRadius: "10px",
                              px: 0.8,
                              py: 0.2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "9px",
                                color: "#07794C",
                                fontWeight: 700,
                                lineHeight: 1,
                              }}
                            >
                              26m
                            </Typography>
                          </Box>
                        )}

                      {/* Icon Wrapper */}
                      <Box
                        className="icon-wrapper"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: bgLight,
                          color: baseColor,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          fontSize: "28px",
                          mb: 2,
                        }}
                      >
                        {category.icon || getCategoryIconByName(category.name)}
                      </Box>

                      {/* Service Name */}
                      <Typography
                        sx={{
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: "#1A1A1A",
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  );
                })}

                {/* View All Button */}
                <Box
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    padding: "36px 12px 30px 12px",
                    borderRadius: "16px",
                    border: "1px solid #F0F0F0",
                    background: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(110, 66, 229, 0.08)",
                      borderColor: "#6E42E5",
                      background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)",
                      "& .icon-wrapper-all": {
                        transform: "scale(1.08)",
                        backgroundColor: "#6E42E5",
                        color: "#FFFFFF",
                      }
                    },
                  }}
                  onClick={() => {
                    const el = document.getElementById("highest-in-demand-services");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <Box
                    className="icon-wrapper-all"
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(110, 66, 229, 0.08)",
                      color: "#6E42E5",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      mb: 2,
                    }}
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "#6E42E5",
                      fontWeight: 700,
                      textAlign: "center",
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
                display: "flex",
                gap: 4,
                marginTop: 6,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {/* 4.8 Rating Badge */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "#FFF8E1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(255, 179, 0, 0.15)",
                  }}
                >
                  <StarIcon sx={{ color: "#FFB300", fontSize: 24 }} />
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    sx={{
                      fontSize: "22px",
                      color: "#0F0F0F",
                      fontWeight: 700,
                      lineHeight: 1.1,
                    }}
                  >
                    4.8
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#757575",
                      fontWeight: 500,
                      mt: 0.2,
                    }}
                  >
                    Service Rating*
                  </Typography>
                </Box>
              </Box>

              {/* 12M+ Customers Badge */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "#E8EAF6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(63, 81, 181, 0.15)",
                  }}
                >
                  <PeopleIcon sx={{ color: "#3F51B5", fontSize: 24 }} />
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    sx={{
                      fontSize: "22px",
                      color: "#0F0F0F",
                      fontWeight: 700,
                      lineHeight: 1.1,
                    }}
                  >
                    12M+
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#757575",
                      fontWeight: 500,
                      mt: 0.2,
                    }}
                  >
                    Customers Globally*
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right 60% - Zigzag Images */}
          {banners.length > 0 && (
            <Box
              sx={{
                width: "100%",
                minWidth: 0,
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gridTemplateRows: `repeat(${Math.ceil(banners.length / 2)}, minmax(0, 1fr))`,
                gap: 2,
                height: { xs: "auto", md: "auto" },
                maxHeight: "100%",
                overflow: "hidden",
              }}
            >
              {banners.slice(0, 4).map((banner, i) => {
                const colStart = (i % 2) + 1;
                const rowStart = Math.floor(i / 2) + 1;
                return (
                  <Box
                    key={banner.id}
                    onClick={() => handleBannerClick(banner.redirect_url)}
                    sx={{
                      gridColumn: `${colStart} / ${colStart + 1}`,
                      gridRow: `${rowStart} / ${rowStart + 1}`,
                      borderRadius: "16px",
                      overflow: "hidden",
                      minHeight: 0,
                      height: { xs: "190px", sm: "230px", md: "270px" },
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                        "& .image-zoom": {
                          transform: "scale(1.05)",
                        }
                      },
                    }}
                  >
                    <Box className="image-zoom" sx={{ width: "100%", height: "100%", transition: "transform 0.5s ease" }}>
                      <ImageWithFallback
                        src={getBannerImageUrl(banner.image_path)}
                        alt={banner.title}
                        fallback="/assets/images/Image-alt.jpg"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>

      {/* Below: Services Grid and Sidebar */}
      <Box
        id="highest-in-demand-services"
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
                onClick={() => handleServiceClick(service.slug || String(service.id))}
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

          {/* View More / Show Less Button */}
          {filteredServices.length > 8 && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Button
                onClick={() => setShowAllServices(!showAllServices)}
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
                {showAllServices ? "Less" : "More"}
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
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          opacity: 0.9,
                        }
                      }}
                      onClick={() => {
                        const routeId = service.slug || service.category.toLowerCase().replace(/\s+/g, '-');
                        router.push(`/services/${routeId}`);
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

          {/* Full Width Banner */}
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
