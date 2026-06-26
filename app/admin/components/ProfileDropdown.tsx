"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Box,
  Avatar,
  ButtonBase,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function ProfileDropdown() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  // 1. Popover State Anchor Definitions
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);

  // 2. Your Avatar Setup and Custom State Details
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [avatarBgColor, setAvatarBgColor] = useState(
    "rgba(110, 101, 198, 0.7)",
  );
  const [greeting, setGreeting] = useState("Good Morning"); // Dynamic Greeting State

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

  const getRandomAvatarColor = (alpha = 0.7) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Helper function to calculate real-time contextual greetings

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

  // 3. Popover Actions Click Handlers
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Target Custom Avatar Interactive Trigger Base Element */}
      <ButtonBase
        onClick={handleOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: isOpen ? "#2196f3" : "#e3f2fd",
          borderRadius: "30px",
          pl: 0.6,
          pr: 2,
          py: 0.6,
          transition: "all 0.2s ease-in-out",

          "& .MuiSvgIcon-root": {
            color: isOpen ? "#ffffff" : "#2196f3",
            fontSize: "20px",
            transition: "color 0.2s ease-in-out",
          },

          "&:hover": {
            backgroundColor: "#2196f3",
            boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)",
            "& .MuiSvgIcon-root": {
              color: "#ffffff",
            },
          },
        }}
      >
        {/* Avatar inside Yellow Circle Backdrop */}
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            backgroundColor: "#ffb300",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Avatar
            src={avatarLoadError ? undefined : avatarSrc}
            alt={avatarAlt}
            imgProps={{ onError: () => setAvatarLoadError(true) }}
            sx={{
              width: 30,
              height: 30,
              bgcolor: avatarBgColor,
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            {avatarFallbackChildren || <PersonOutlineIcon />}
          </Avatar>
        </Box>

        <SettingsOutlinedIcon />
      </ButtonBase>

      {/* Floating Dashboard Card Panel Context View */}
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          {/* List Item 1: Account Settings (Active Style Accent) */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                console.log("Account Settings Navigation Action");
                handleClose();
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
                primary="Account settings"
                primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>

          {/* List Item 2: Social Profile Row */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                console.log("Social Profile Navigation Action");
                handleClose();
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

          {/* List Item 3: System Sign out Logout Row */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                logout();
                handleClose();
                router.push("/auth/login");
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
    </>
  );
}
