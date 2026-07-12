"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";

const DRAWER_WIDTH = 280;

const menuItems = [
  { label: "Home", icon: HomeIcon, path: "/" },
  { label: "Table", icon: TableChartIcon, path: "/table" },
  { label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
];

const authItems = [
  { label: "Login", icon: LoginIcon, path: "/auth/login" },
  { label: "Sign Up", icon: PersonAddIcon, path: "/auth/signup" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1976d2",
              mb: 1,
            }}
          >
            Shoptera
          </Typography>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Admin Dashboard
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="caption"
          sx={{
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            mb: 1,
          }}
        >
          Menu
        </Typography>

        <List sx={{ flex: 1, p: 0 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    backgroundColor: active ? "rgba(25, 118, 210, 0.08)" : "transparent",
                    color: active ? "#1976d2" : "inherit",
                    borderRight: active ? "3px solid #1976d2" : "none",
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.04)",
                    },
                    borderRadius: "8px",
                    mr: 1,
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="caption"
          sx={{
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#999",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            mb: 1,
          }}
        >
          Account
        </Typography>

        <List sx={{ p: 0 }}>
          {authItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    backgroundColor: active ? "rgba(25, 118, 210, 0.08)" : "transparent",
                    color: active ? "#1976d2" : "inherit",
                    borderRight: active ? "3px solid #1976d2" : "none",
                    "&:hover": {
                      backgroundColor: "rgba(25, 118, 210, 0.04)",
                    },
                    borderRadius: "8px",
                    mr: 1,
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}