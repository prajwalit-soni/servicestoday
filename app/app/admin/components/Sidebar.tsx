"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";

// Icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import { useAuthStore } from "../../store/useAuthStore";

const DRAWER_WIDTH = 260;
const MINI_DRAWER_WIDTH = 72;

interface SidebarProps {
  open: boolean;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export default function Sidebar({ open, mobileOpen, onDrawerToggle }: SidebarProps) {
  const pathname = usePathname();
  const { role } = useAuthStore();

  const menuGroups = (role === "vendor" || role === "partner") ? [
    {
      title: "",
      items: [
        { text: "Dashboard", route: "/vendor", icon: <DashboardOutlinedIcon fontSize="small" /> },
        { text: "Service Requests", route: "/vendor/requests", icon: <ReceiptLongOutlinedIcon fontSize="small" /> },
        { text: "Settings", route: "/vendor/settings", icon: <SettingsOutlinedIcon fontSize="small" /> },
      ],
    },
  ] : [
    {
      title: "Dashboard",
      items: [
        { text: "Dashboard", route: "/admin", icon: <DashboardOutlinedIcon fontSize="small" /> },
        { text: "Service Providers", route: "/admin/providers", icon: <StorefrontIcon fontSize="small" /> },
        { text: "Users & Vendors", route: "/admin/vendors", icon: <AssignmentIndOutlinedIcon fontSize="small" /> },
        { text: "Locations", route: "/admin/vendors/locations", icon: <LocationOnOutlinedIcon fontSize="small" /> },
        { text: "Bookings", route: "/admin/bookings", icon: <ReceiptLongOutlinedIcon fontSize="small" /> },
      ],
    },
    {
      title: "Application",
      items: [
        { text: "Website", route: "/admin/website", icon: <PeopleOutlinedIcon fontSize="small" /> },
        { text: "Notifications", route: "/admin/notifications", icon: <NotificationsOutlinedIcon fontSize="small" /> },
      ],
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        pt: "80px",
        px: open ? 2 : 1,
        transition: "padding 0.2s ease-in-out",
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "5px"
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent"
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
          borderRadius: "10px",
          transition: "background-color 0.3s ease-in-out"
        },
        "&:hover": {
          "&::-webkit-scrollbar-thumb": {
            background: "#dbd9f5"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#c5c1f0"
          }
        }
      }}
    >
      {menuGroups.map((group, groupIndex) => (
        <Box key={groupIndex} sx={{ mt: 2.5 }}>
          {open && (
            <Typography
              variant="caption"
              sx={{
                px: 1.5,
                fontWeight: 600,
                color: "#364152",
                textTransform: "capitalize",
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
                display: "block",
              }}
            >
              {group.title}
            </Typography>
          )}

          <List sx={{ mt: 0.5, p: 0 }}>
            {group.items.map((item) => {
              const isActive = pathname === item.route;

              const itemButtonContent = (
                <ListItemButton
                  component={Link}
                  href={item.route}
                  onClick={() => mobileOpen && onDrawerToggle()}
                  sx={{
                    borderRadius: "8px",
                    py: 1.2,
                    px: open ? 1.5 : 0,
                    justifyContent: open ? "initial" : "center",
                    // Active vs default route text color
                    // color: isActive ? "#4527a0" : "#4b5563",
                    // Assigned your specific #d1c4e9 background token color
                    backgroundColor: isActive ? "#f3e5f5" : "transparent",
                    "&:hover": {
                      backgroundColor: isActive ? "#d1c4e9" : "#f3e5f5",
                      // color: isActive ? "#4527a0" : "#1e293b",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? "36px" : "auto",
                      justifyContent: "center",
                      // Active icon color set slightly darker to make it pop inside the background color
                      // color: isActive ? "#4527a0" : "#6b7280",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {open && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                        // fontWeight: isActive ? 600 : 400,
                      }}
                    />
                  )}
                </ListItemButton>
              );

              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                  {!open ? (
                    <Tooltip title={item.text} placement="right" arrow>
                      {itemButtonContent}
                    </Tooltip>
                  ) : (
                    itemButtonContent
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH },
        flexShrink: { md: 0 },
        transition: "width 0.2s ease-in-out"
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH, borderRight: "none" },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
            transition: "width 0.2s ease-in-out",
            overflowX: "hidden",
            borderRight: "1px solid #e3e8ef",
            backgroundColor: "#ffffff"
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
