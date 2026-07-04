"use client";
import React, { useState } from "react";
import {
  IconButton,
  Box,
  Badge,
  Tooltip,
  Popover,
  Typography,
  Link as MuiLink,
  Select,
  MenuItem,
  FormControl,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  isImportant: boolean;
  type: "request" | "payment" | "system";
}

export default function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "New Service Assignment",
      description: "Booking BK-9042: Professional Deep Cleaning requested by customer Sanju today at 2:00 PM.",
      time: "5 min ago",
      isUnread: true,
      isImportant: true,
      type: "request",
    },
    {
      id: "2",
      title: "Payout Disbursed Successfully",
      description: "Weekly settlement payout of ₹8,400 has been transferred to your registered bank account.",
      time: "2 hours ago",
      isUnread: true,
      isImportant: false,
      type: "payment",
    },
    {
      id: "3",
      title: "KYC Documents Approved",
      description: "Congratulations! Your Trade License identity verification has been approved. Your listings are now active.",
      time: "1 day ago",
      isUnread: false,
      isImportant: false,
      type: "system",
    },
  ]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: !n.isUnread } : n))
    );
  };

  const isOpen = Boolean(anchorEl);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return notif.isUnread;
    if (filter === "important") return notif.isImportant;
    return true;
  });

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const getIcon = (type: "request" | "payment" | "system") => {
    switch (type) {
      case "request":
        return (
          <Avatar sx={{ bgcolor: "#e8eaf6", color: "#3f51b5", width: 40, height: 40 }}>
            <AssignmentOutlinedIcon fontSize="small" />
          </Avatar>
        );
      case "payment":
        return (
          <Avatar sx={{ bgcolor: "#fff8e1", color: "#ffb300", width: 40, height: 40 }}>
            <PaymentOutlinedIcon fontSize="small" />
          </Avatar>
        );
      case "system":
        return (
          <Avatar sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", width: 40, height: 40 }}>
            <VerifiedUserOutlinedIcon fontSize="small" />
          </Avatar>
        );
    }
  };

  return (
    <>
      {/* Trigger Bell Button */}
      <Tooltip title="Notifications" arrow slotProps={{ tooltip: { sx: { bgcolor: "#1e293b" } } }}>
        <IconButton
          onClick={handleOpen}
          sx={{
            color: "#ffb300",
            backgroundColor: isOpen ? "#ffb300" : "#fff8e1",
            borderRadius: "12px",
            transition: "all 0.2s ease-in-out",
            "&:hover": { backgroundColor: "#ffe082" },
            "& .MuiSvgIcon-root": {
              color: isOpen ? "#ffffff" : "#ffb300"
            }
          }}
        >
          <Badge badgeContent={unreadCount} color="error" variant="dot">
            <NotificationsNoneIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Popover Card Floating Menu */}
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 360,
              maxWidth: "100%",
              borderRadius: "16px",
              boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
              mt: 1.5,
              border: "1px solid #e3e8ef",
              overflow: "hidden"
            }
          }
        }}
      >
        {/* Dropdown Header Area */}
        <Box sx={{ p: 2.5, pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#121926" }}>
                Notifications
              </Typography>
              {unreadCount > 0 && (
                <Box
                  sx={{
                    backgroundColor: "#ffb300",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    px: 1.2,
                    py: 0.3,
                    borderRadius: "12px",
                  }}
                >
                  {String(unreadCount).padStart(2, "0")}
                </Box>
              )}
            </Box>
            {unreadCount > 0 && (
              <MuiLink
                component="button"
                variant="body2"
                underline="hover"
                onClick={handleMarkAllRead}
                sx={{ color: "#2196f3", fontWeight: 500, fontSize: "0.85rem", border: "none", bgcolor: "transparent", cursor: "pointer" }}
              >
                Mark all as read
              </MuiLink>
            )}
          </Box>

          {/* Inline Selection Dropdown */}
          <FormControl fullWidth size="small">
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{
                borderRadius: "8px",
                backgroundColor: "#fafafa",
                "& .MuiSelect-select": { fontSize: "0.9rem", color: "#121926", py: 1 }
              }}
            >
              <MenuItem value="all">All Notifications</MenuItem>
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="important">Important</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider />

        {/* Scrollable Message List Content Area */}
        <List sx={{ p: 0, maxHeight: 340, overflowY: "auto", "&::-webkit-scrollbar": { width: '4px' } }}>
          {filteredNotifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                No notifications found.
              </Typography>
            </Box>
          ) : (
            filteredNotifications.map((notif) => (
              <React.Fragment key={notif.id}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => handleToggleRead(notif.id)}
                  sx={{
                    px: 2.5,
                    py: 2,
                    cursor: "pointer",
                    bgcolor: notif.isUnread ? "rgba(255, 179, 0, 0.03)" : "transparent",
                    "&:hover": { bgcolor: "#f8fafc" },
                    transition: "background-color 0.2s"
                  }}
                >
                  <ListItemAvatar sx={{ mt: 0.5 }}>
                    {getIcon(notif.type)}
                  </ListItemAvatar>
                  <ListItemText
                    component="div"
                    primary={
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="subtitle2" component="span" sx={{ fontWeight: 600, color: notif.isUnread ? "#121926" : "#697586" }}>
                          {notif.title}
                        </Typography>
                        <Typography variant="caption" component="span" sx={{ color: "#9e9e9e" }}>
                          {notif.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }} component="div">
                        <Typography variant="body2" component="div" sx={{ color: notif.isUnread ? "#212121" : "#888888", lineHeight: 1.4, fontSize: "0.825rem" }}>
                          {notif.description}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }} component="div">
                          {notif.isUnread && (
                            <Chip label="Unread" size="small" sx={{ bgcolor: "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: "0.65rem", height: 18, borderRadius: "4px" }} />
                          )}
                          {notif.isImportant && (
                            <Chip label="Important" size="small" sx={{ bgcolor: "#e8eaf6", color: "#1a237e", fontWeight: 600, fontSize: "0.65rem", height: 18, borderRadius: "4px" }} />
                          )}
                          <Chip label={notif.type.toUpperCase()} size="small" sx={{ bgcolor: "#f5f5f5", color: "#616161", fontWeight: 600, fontSize: "0.65rem", height: 18, borderRadius: "4px" }} />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>

        {/* Bottom Panel Actions Footer */}
        <Box sx={{ p: 1.5, textAlign: "center", borderTop: "1px solid #e3e8ef" }}>
          <Button fullWidth size="small" sx={{ color: "#2196f3", fontWeight: 600, textTransform: "none", fontSize: "0.85rem" }}>
            View All Notifications
          </Button>
        </Box>
      </Popover>
    </>
  );
}
