"use client";
import React, { useState } from "react";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const DRAWER_WIDTH = 260;
const MINI_DRAWER_WIDTH = 72;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  
  // State for Desktop Mini-Collapse Mode
  const [desktopOpen, setDesktopOpen] = useState(true);
  // State for Mobile Drawers
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    if (isDesktop) {
      setDesktopOpen(!desktopOpen); // Toggles mini vs full view on desktops
    } else {
      setMobileOpen(!mobileOpen); // Pops up standard overlay menu on smaller viewports
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      {/* Universal Top Navigation Header */}
      <Topbar onDrawerToggle={handleDrawerToggle} />

      {/* Responsive Structural Navigation Drawer */}
      <Sidebar 
        open={desktopOpen} 
        mobileOpen={mobileOpen} 
        onDrawerToggle={handleDrawerToggle} 
      />

      {/* Main Content Viewport Panel */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { 
            xs: "100%",
            md: `calc(100% - ${desktopOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH}px)` 
          },
          maxWidth: "100%",
          overflowX: "hidden",
          transition: "width 0.2s ease-in-out, margin 0.2s ease-in-out",
        }}
      >
        <Toolbar sx={{ minHeight: "64px" }} />
        {children}
      </Box>
    </Box>
  );
}
