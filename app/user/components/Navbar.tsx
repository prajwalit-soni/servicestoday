"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Popover,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ClearIcon from "@mui/icons-material/Clear";

// Bottom Tab Icons (Mobile Only)
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";

import useCartStore from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import { services } from "../../lib/servicesData";

const getRandomAvatarColor = (alpha = 0.7) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { getTotalItems } = useCartStore();
  const { user, logout } = useAuthStore();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const matchingServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setMounted(true);
    setCartItemCount(getTotalItems());
  }, [getTotalItems]);

  // Menu State Hooks
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [locationAnchor, setLocationAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Booking Confirmed",
      description: "Your Plumbing Solutions booking BK-9051 has been accepted by partner EcoClean.",
      time: "10 mins ago",
      isUnread: true,
    },
    {
      id: "2",
      title: "Deep Cleaning Scheduled",
      description: "Your Professional Deep Cleaning booking BK-9042 is scheduled for tomorrow at 2:00 PM.",
      time: "2 hours ago",
      isUnread: true,
    },
    {
      id: "3",
      title: "Welcome to Shoptera!",
      description: "Explore top-rated local services. Need help? Check our Help Center or contact support.",
      time: "1 day ago",
      isUnread: false,
    },
  ]);

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleToggleNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: !n.isUnread } : n))
    );
  };
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [greeting, setGreeting] = useState("Good Morning");

  // Avatar Setup Details
  const userName = user?.name || "Sanju";
  const avatarSrc = "/assets/images/avatar.png";
  const avatarAlt = `${userName} avatar`;
  const avatarFallbackChildren =
    userName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "AB";
  const [avatarBgColor, setAvatarBgColor] = useState(
    "rgba(110, 101, 198, 0.7)",
  );

  const getTimeBasedGreeting = (): string => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  useEffect(() => {
    setGreeting(getTimeBasedGreeting());
    const frameId = requestAnimationFrame(() => {
      setAvatarBgColor(getRandomAvatarColor());
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  // Sync bottom navigation active indicators with real path strings
  const getActiveTabValue = () => {
    if (pathname === "/" || pathname?.includes("/home")) return 0;
    if (pathname?.includes("/services")) return 1;
    if (pathname?.includes("/help")) return 2;
    if (
      pathname?.includes("/profile") ||
      pathname?.includes("/auth/login") ||
      pathname?.includes("/auth/signup") ||
      pathname?.includes("/auth/forgot-password")
    )
      return 3;
    return 0;
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. ORIGINAL DESKTOP VIEW BAR (Displays exclusively on larger devices)      */}
      {/* ========================================================================= */}
      <AppBar
        position="sticky"
        sx={{
          display: { xs: "none", md: "block" }, // Hides completely on mobile displays
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          zIndex: 1000,
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 32px",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              width: 150,
              height: 50,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => router.push("/")}
          >
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>

          {/* Location Selector and Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ alignItems: "center", gap: 1, width: "100%" }}>
              <Button
                startIcon={<LocationOnIcon />}
                onClick={(e) => setLocationAnchor(e.currentTarget)}
                sx={{
                  color: "#333",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                Rajnandgaon , India
              </Button>
            </Box>

            <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
              <Box sx={{ flex: "none", mx: 4, position: "relative" }}>
                <TextField
                  placeholder="Search for services..."
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim() !== "") {
                      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
                      setShowSuggestions(false);
                    }
                  }}
                  sx={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "25px",
                    width: "300px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px",
                      "& fieldset": { borderColor: "transparent" },
                      "&:hover fieldset": { borderColor: "#667eea" },
                      "&.Mui-focused fieldset": { borderColor: "#667eea" },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#999" }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setSearchQuery("");
                            setShowSuggestions(false);
                          }}
                          size="small"
                          edge="end"
                        >
                          <ClearIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Desktop Suggestions Dropdown */}
                {showSuggestions && searchQuery.trim() !== "" && (
                  <Paper
                    elevation={4}
                    sx={{
                      position: "absolute",
                      top: "45px",
                      left: 0,
                      right: 0,
                      width: "300px",
                      bgcolor: "white",
                      borderRadius: "12px",
                      maxHeight: "350px",
                      overflowY: "auto",
                      border: "1px solid #E3E3E3",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                      zIndex: 1100,
                      p: 1,
                    }}
                  >
                    {matchingServices.length === 0 ? (
                      <Box sx={{ p: 2, textAlign: "center" }}>
                        <Typography sx={{ color: "#757575", fontSize: "13px" }}>
                          No matching services.
                        </Typography>
                      </Box>
                    ) : (
                      <List sx={{ p: 0 }}>
                        {matchingServices.map((service) => {
                          const categoryKey = service.category.toLowerCase().replace(/\s+/g, '-');
                          const detailId = categoryKey === 'beautician' ? 'salon' : categoryKey;
                          return (
                            <ListItemButton
                              key={service.id}
                              onClick={() => {
                                router.push(`/services/${detailId}`);
                                setShowSuggestions(false);
                              }}
                              sx={{
                                borderRadius: "8px",
                                mb: 0.5,
                                gap: 1.5,
                                display: "flex",
                                alignItems: "center",
                                p: 1,
                                "&:hover": {
                                  bgcolor: "rgba(110, 66, 229, 0.04)",
                                }
                              }}
                            >
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: "4px",
                                  overflow: "hidden",
                                  bgcolor: "#F5F5F5",
                                  flexShrink: 0,
                                }}
                              >
                                <img
                                  src={service.image}
                                  alt={service.name}
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                              </Box>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography noWrap sx={{ fontWeight: 600, fontSize: "13px", color: "#0F0F0F", textAlign: "left", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {service.name}
                                </Typography>
                                <Typography sx={{ fontSize: "11px", color: "#757575", textAlign: "left" }}>
                                  {service.category}
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                                <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#0F0F0F" }}>
                                  ₹{service.price}
                                </Typography>
                              </Box>
                            </ListItemButton>
                          );
                        })}
                      </List>
                    )}
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>
          </Box>

          {/* Action Icons Panel */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={(e) => setNotificationAnchor(e.currentTarget)}
              sx={{ color: "#333", "&:hover": { backgroundColor: "#f5f5f5" } }}
            >
              <Badge badgeContent={notifications.filter((n) => n.isUnread).length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              onClick={() => router.push("/cart")}
              sx={{ color: "#333", "&:hover": { backgroundColor: "#f5f5f5" } }}
            >
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {mounted && user ? (
              <IconButton
                onClick={(e) => setProfileAnchor(e.currentTarget)}
                sx={{ padding: 0 }}
              >
                <Avatar
                  src={avatarLoadError ? undefined : avatarSrc}
                  alt={avatarAlt}
                  imgProps={{ onError: () => setAvatarLoadError(true) }}
                  sx={{ width: 36, height: 36, bgcolor: avatarBgColor }}
                >
                  {avatarFallbackChildren || <PersonOutlineIcon />}
                </Avatar>
              </IconButton>
            ) : (
              <Button
                variant="contained"
                onClick={() => router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`)}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#FFFFFF",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 0.75,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5a6fd6 0%, #684291 100%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  }
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ========================================================================= */}
      {/* 2. REFACTORED MOBILE TOP BAR (Displays exclusively on mobile devices)    */}
      {/* ========================================================================= */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          display: { xs: "block", md: "none" }, // Hides completely on desktop monitors
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",

          color: "#FFFFFF",
          zIndex: 1100,
          px: 2,
          pt: 1.5,
          pb: 2,
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        {/* Row 1: App Status Bar Indicators (Location Left / Cart Right) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Box
            onClick={(e) => setLocationAnchor(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
            }}
          >
            <LocationOnIcon sx={{ color: "#FFFFFF", fontSize: "1.3rem" }} />
            <Box>
              {/* <Typography variant="caption" sx={{ display: "block", fontWeight: 700, opacity: 0.9, fontSize: "0.72rem", lineHeight: 1 }}>
                In 44 minutes
              </Typography> */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: "0.85rem" }}
                >
                  Rajnandgaon, India
                </Typography>
                <KeyboardArrowDownIcon
                  sx={{ fontSize: "1rem", opacity: 0.8 }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              onClick={(e) => setNotificationAnchor(e.currentTarget)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                p: 1,
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
              }}
            >
              <Badge badgeContent={notifications.filter((n) => n.isUnread).length} color="error">
                <NotificationsIcon sx={{ fontSize: "1.3rem" }} />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => router.push("/cart")}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                p: 1,
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
              }}
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon sx={{ fontSize: "1.3rem" }} />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        {/* Row 2: Full-Width Context Search Input Box */}
        <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
          <Box sx={{ width: "100%", position: "relative" }}>
            <TextField
              placeholder="Search for services..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim() !== "") {
                  router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
                  setShowSuggestions(false);
                }
              }}
              sx={{
                backgroundColor: "#f8f9fa",
                borderRadius: "25px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#667eea" },
                  "&.Mui-focused fieldset": { borderColor: "#667eea" },
                },
                width: "100%",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#999" }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setSearchQuery("");
                        setShowSuggestions(false);
                      }}
                      size="small"
                      edge="end"
                    >
                      <ClearIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Mobile Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() !== "" && (
              <Paper
                elevation={4}
                sx={{
                  position: "absolute",
                  top: "45px",
                  left: 0,
                  right: 0,
                  bgcolor: "white",
                  borderRadius: "12px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  border: "1px solid #E3E3E3",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  zIndex: 1100,
                  p: 1,
                }}
              >
                {matchingServices.length === 0 ? (
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography sx={{ color: "#757575", fontSize: "13px" }}>
                      No matching services.
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {matchingServices.map((service) => {
                      const categoryKey = service.category.toLowerCase().replace(/\s+/g, '-');
                      const detailId = categoryKey === 'beautician' ? 'salon' : categoryKey;
                      return (
                        <ListItemButton
                          key={service.id}
                          onClick={() => {
                            router.push(`/services/${detailId}`);
                            setShowSuggestions(false);
                          }}
                          sx={{
                            borderRadius: "8px",
                            mb: 0.5,
                            gap: 1.5,
                            display: "flex",
                            alignItems: "center",
                            p: 1,
                            "&:hover": {
                              bgcolor: "rgba(110, 66, 229, 0.04)",
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "4px",
                              overflow: "hidden",
                              bgcolor: "#F5F5F5",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={service.image}
                              alt={service.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography noWrap sx={{ fontWeight: 600, fontSize: "13px", color: "#0F0F0F", textAlign: "left", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {service.name}
                            </Typography>
                            <Typography sx={{ fontSize: "11px", color: "#757575", textAlign: "left" }}>
                              {service.category}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#0F0F0F" }}>
                              ₹{service.price}
                            </Typography>
                          </Box>
                        </ListItemButton>
                      );
                    })}
                  </List>
                )}
              </Paper>
            )}
          </Box>
        </ClickAwayListener>
      </AppBar>

      {/* ========================================================================= */}
      {/* BOTTOM NAV: Persistent Application Navigation Drawer Layer (Mobile Only) */}
      {/* ========================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #e0e0e0",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
          display: { xs: "block", md: "none" }, // Strictly hides on desktop monitors
        }}
      >
        <BottomNavigation
          showLabels
          value={getActiveTabValue()}
          onChange={(event, newValue) => {
            if (newValue === 0) router.push("/");
            if (newValue === 1) router.push("/services");
            if (newValue === 2) router.push("/help");
            if (newValue === 3) {
              if (mounted && user) {
                router.push("/profile");
              } else {
                router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
              }
            }
          }}
          sx={{
            height: 60,
            "& .MuiBottomNavigationAction-root": {
              minWidth: "auto",
              padding: "6px 0",
              color: "#000000",
              "&.Mui-selected": {
                color: "#6E65C6",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",

                "& .MuiSvgIcon-root": {
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                },
              },
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "0.72rem",
              fontWeight: 500,
              mt: 0.5,
              "&.Mui-selected": {
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#6E65C6",
              },
            },
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Services"
            icon={
              <Badge color="error" variant="dot" overlap="circular">
                <StorefrontIcon />
              </Badge>
            }
          />
          <BottomNavigationAction label="Help" icon={<HelpOutlineIcon />} />

          <BottomNavigationAction
            label={mounted && user ? "Profile" : "Login"}
            icon={
              mounted && user ? (
                <Avatar
                  src={avatarLoadError ? undefined : avatarSrc}
                  alt={avatarAlt}
                  imgProps={{ onError: () => setAvatarLoadError(true) }}
                  sx={{ width: 24, height: 24, bgcolor: avatarBgColor, fontSize: "0.75rem" }}
                >
                  {avatarFallbackChildren || <PersonOutlineIcon />}
                </Avatar>
              ) : (
                <PersonOutlineIcon />
              )
            }
          />
        </BottomNavigation>
      </Box>

      {/* Profile Dropdown Popover */}
      <Popover
        open={Boolean(profileAnchor)}
        anchorEl={profileAnchor}
        onClose={() => setProfileAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 290,
              borderRadius: "16px",
              boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
              mt: 1.5,
              border: "1px solid #e3e8ef",
              p: 2.5,
            },
          },
        }}
      >
        {/* Account Presentation Greeting Header Box */}
        <Box sx={{ mb: 2, pl: 0.5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#121926", fontSize: "1rem" }}
          >
            {greeting} {""}
            <Box component="span" sx={{ fontWeight: 400 }}>
              {userName}
            </Box>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#697586", fontSize: "0.825rem", mt: 0.2, textTransform: "capitalize" }}
          >
            {user?.role}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5, borderColor: "#e3e8ef" }} />

        {/* Dropdown Navigation Actions Row Group */}
        <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
          {user?.role === "admin" && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setProfileAnchor(null);
                  router.push("/admin");
                }}
                sx={{
                  borderRadius: "12px",
                  py: 1.2,
                  px: 2,
                  color: "#364152",
                  "& .MuiListItemIcon-root": { color: "#364152" },
                  "&:hover": {
                    backgroundColor: "#f3e5f5",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Admin Dashboard"
                  primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {(user?.role === "vendor" || user?.role === "partner") && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setProfileAnchor(null);
                  router.push("/vendor");
                }}
                sx={{
                  borderRadius: "12px",
                  py: 1.2,
                  px: 2,
                  color: "#364152",
                  "& .MuiListItemIcon-root": { color: "#364152" },
                  "&:hover": {
                    backgroundColor: "#f3e5f5",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <SettingsOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Vendor Dashboard"
                  primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setProfileAnchor(null);
                router.push("/profile");
              }}
              sx={{
                borderRadius: "12px",
                py: 1.2,
                px: 2,
                color: "#364152",
                "& .MuiListItemIcon-root": { color: "#364152" },
                "&:hover": {
                  backgroundColor: "#f3e5f5",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Social Profile"
                primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 400 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setProfileAnchor(null);
                logout();
              }}
              sx={{
                borderRadius: "12px",
                py: 1.2,
                px: 2,
                color: "#364152",
                "& .MuiListItemIcon-root": { color: "#364152" },
                "&:hover": {
                  backgroundColor: "#f3e5f5",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 400 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      {/* Website Notifications Popover */}
      <Popover
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={() => setNotificationAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              borderRadius: "16px",
              boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
              mt: 1.5,
              border: "1px solid #e3e8ef",
              p: 2.5,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#121926", fontSize: "0.95rem" }}>
            Notifications
          </Typography>
          {notifications.some((n) => n.isUnread) && (
            <MuiLink
              component="button"
              variant="caption"
              underline="hover"
              onClick={handleMarkAllNotificationsRead}
              sx={{ color: "#635BFF", fontWeight: 600, textTransform: "none", cursor: "pointer", border: "none", bgcolor: "transparent" }}
            >
              Mark all as read
            </MuiLink>
          )}
        </Box>
        <Divider sx={{ mb: 1 }} />
        <List sx={{ p: 0, maxHeight: 300, overflowY: "auto" }}>
          {notifications.map((notif) => (
            <React.Fragment key={notif.id}>
              <ListItemButton
                onClick={() => handleToggleNotificationRead(notif.id)}
                sx={{
                  borderRadius: "8px",
                  p: 1.2,
                  mb: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  bgcolor: notif.isUnread ? "rgba(99, 91, 255, 0.03)" : "transparent",
                  "&:hover": { bgcolor: "#f9f9fb" },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: notif.isUnread ? "#121926" : "#697586", fontSize: "0.825rem" }}>
                    {notif.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                    {notif.time}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: notif.isUnread ? "#374151" : "#888888", fontSize: "0.775rem", lineHeight: 1.4, textAlign: "left" }}>
                  {notif.description}
                </Typography>
              </ListItemButton>
              <Divider sx={{ my: 0.5 }} />
            </React.Fragment>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default Navbar;
