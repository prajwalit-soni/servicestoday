"use client";
import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Box, Avatar, Badge, ButtonBase, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import TranslateIcon from "@mui/icons-material/Translate";
import SensorsIcon from "@mui/icons-material/Sensors";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

interface TopbarProps {
  onDrawerToggle: () => void;
}

export default function Topbar({ onDrawerToggle }: TopbarProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);

  // Avatar Setup Details

  const getRandomAvatarColor = (alpha = 0.7) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const userName = "Sanju";
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

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setAvatarBgColor(getRandomAvatarColor());
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  // Sync state if user exits fullscreen using the ESC key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Native Browser Fullscreen handler
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#121926",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: "1px solid #e3e8ef",
      }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", minHeight: "64px", px: 2 }}
      >
        {/* Left Side: Logo & Menu Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                           color: "#5e35b1",

                letterSpacing: "0.5px",
              }}
            >
           Shoptera
            </Box>
          </Box>

          <IconButton
            onClick={onDrawerToggle}
            edge="start"
            sx={{
              color: "#5e35b1",
              backgroundColor: "#ede7f6",
              borderRadius: "8px",
              padding: "6px",
              "&:hover": { backgroundColor: "#d1c4e9" },
              ml: { xs: 1, md: 11 }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Right Side: Quick Action Row & Profile Pill */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Notification Icon Box */}
           <NotificationDropdown />



          {/* Dynamic Fullscreen Toggle with Conditional Tooltip */}
          <Tooltip 
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"} 
            arrow 
            slotProps={{ tooltip: { sx: { bgcolor: "#1e293b" } } }}
          >
            <IconButton
              onClick={toggleFullscreen}
              sx={{
                color: "#2196f3",
                backgroundColor: "#e3f2fd",
                borderRadius: "12px",
                "&:hover": { backgroundColor: "#bbdefb" },
              }}
            >
              {isFullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

          {/* Combined User Account & Settings Pill Button */}
           <ProfileDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
