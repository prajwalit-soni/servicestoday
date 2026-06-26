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
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filter, setFilter] = useState("all");

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

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
          <Badge variant="dot" color="error">
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
                All Notification
              </Typography>
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
                01
              </Box>
            </Box>
            <MuiLink component="button" variant="body2" underline="hover" sx={{ color: "#2196f3", fontWeight: 500, fontSize: "0.85rem" }}>
              Mark as all read
            </MuiLink>
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
              <MenuItem value="all">All Notification</MenuItem>
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="important">Important</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider />

        {/* Scrollable Message List Content Area */}
        <List sx={{ p: 0, maxHeight: 340, overflowY: "auto", "&::-webkit-scrollbar": { width: '4px' } }}>
          
          {/* List Row Item 1: User Notification */}
          <ListItem alignItems="flex-start" sx={{ px: 2.5, py: 2, "&:hover": { bgcolor: "#f8fafc" } }}>
            <ListItemAvatar sx={{ mt: 0.5 }}>
              <Avatar src="https://unsplash.com" sx={{ width: 40, height: 40, border: "2px solid #ffb300" }} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#121926" }}>John Doe</Typography>
                  <Typography variant="caption" sx={{ color: "#9e9e9e" }}>2 min ago</Typography>
                </Box>
              }
              secondary={
                <Box sx={{ mt: 0.5 }}>
                  <Typography variant="body2" sx={{ color: "#697586", lineHeight: 1.4 }}>
                    It is a long established fact that a reader will be distracted
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
                    <Chip label="Unread" size="small" sx={{ bgcolor: "#ffebee", color: "#f44336", fontWeight: 500, fontSize: "0.75rem", height: 22 }} />
                    <Chip label="New" size="small" sx={{ bgcolor: "#fff8e1", color: "#ffb300", fontWeight: 500, fontSize: "0.75rem", height: 22 }} />
                  </Box>
                </Box>
              }
            />
          </ListItem>
          <Divider component="li" />

          {/* List Row Item 2: Store Verification Alert */}
          <ListItem alignItems="flex-start" sx={{ px: 2.5, py: 2, "&:hover": { bgcolor: "#f8fafc" } }}>
            <ListItemAvatar sx={{ mt: 0.5 }}>
              <Avatar sx={{ bgcolor: "#b9f6ca", color: "#00c853", width: 40, height: 40 }}>
                <StorefrontOutlinedIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#121926" }}>Store Verification Done</Typography>
                  <Typography variant="caption" sx={{ color: "#9e9e9e" }}>2 min ago</Typography>
                </Box>
              }
              secondary={
                <Box sx={{ mt: 0.5 }}>
                  <Typography variant="body2" sx={{ color: "#697586", lineHeight: 1.4 }}>
                    We have successfully received your request.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
                    <Chip label="Unread" size="small" sx={{ bgcolor: "#ffebee", color: "#f44336", fontWeight: 500, fontSize: "0.75rem", height: 22 }} />
                  </Box>
                </Box>
              }
            />
          </ListItem>
          <Divider component="li" />

          {/* List Row Item 3: Core Mail Notification */}
          <ListItem alignItems="flex-start" sx={{ px: 2.5, py: 2, "&:hover": { bgcolor: "#f8fafc" } }}>
            <ListItemAvatar sx={{ mt: 0.5 }}>
              <Avatar sx={{ bgcolor: "#e3f2fd", color: "#2196f3", width: 40, height: 40 }}>
                <MailOutlineIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#121926" }}>Check Your Mail.</Typography>
                  <Typography variant="caption" sx={{ color: "#9e9e9e" }}>2 min ago</Typography>
                </Box>
              }
              secondary={
                <Typography variant="body2" sx={{ color: "#697586", lineHeight: 1.4, mt: 0.5 }}>
                  All done! Now check your inbox as you're in
                </Typography>
              }
            />
          </ListItem>
        </List>

        {/* Bottom Panel Actions Footer */}
        <Box sx={{ p: 1.5, textAlign: "center", borderTop: "1px solid #e3e8ef" }}>
          <Button fullWidth size="small" sx={{ color: "#2196f3", fontWeight: 600, textTransform: "capitalize", fontSize: "0.875rem" }}>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}
