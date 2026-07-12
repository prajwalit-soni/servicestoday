"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
  Chip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CampaignIcon from "@mui/icons-material/Campaign";
import AdminBreadcrumbs from "../components/AdminBreadcrumbs";
import CustomDataTable from "../components/CustomDataTable";
import { UserService, type UserVendorData } from "../../lib/services/userService";
import axiosClient from "../../lib/api";
import { toast } from "react-toastify";

interface NotificationRecord {
  id: number;
  user_id: number;
  user_name: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [users, setUsers] = useState<UserVendorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSendModal, setOpenSendModal] = useState(false);
  const [sending, setSending] = useState(false);

  // Form State
  const [form, setForm] = useState({
    userId: "",
    title: "",
    message: ""
  });

  // Pagination
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/admin/notifications", {
        params: { page, limit }
      });
      if (res.data?.success && res.data?.data) {
        setNotifications(res.data.data.notifications || []);
        setTotalCount(res.data.data.total_count || 0);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await UserService.getAll(0, 100);
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userId || !form.title || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSending(true);
    try {
      const payload = {
        user_id: parseInt(form.userId),
        title: form.title,
        message: form.message,
        is_read: false
      };
      
      const res = await axiosClient.post("/admin/notifications", payload);
      if (res.data?.success) {
        toast.success(res.data.message || "Notification sent successfully!");
        setOpenSendModal(false);
        setForm({ userId: "", title: "", message: "" });
        fetchNotifications();
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  const columns = [
    { id: "id", label: "ID", width: "80px" },
    {
      id: "user_name",
      label: "Recipient",
      width: "200px",
      render: (row: NotificationRecord) => (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {row.user_name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ID: {row.user_id}
          </Typography>
        </Box>
      )
    },
    { id: "title", label: "Title", width: "220px" },
    { id: "message", label: "Message", width: "350px" },
    {
      id: "is_read",
      label: "Status",
      width: "120px",
      render: (row: NotificationRecord) => (
        <Chip
          label={row.is_read ? "Read" : "Unread"}
          size="small"
          color={row.is_read ? "default" : "warning"}
          sx={{ fontWeight: 600 }}
        />
      )
    },
    {
      id: "created_at",
      label: "Date Sent",
      width: "180px",
      render: (row: NotificationRecord) =>
        row.created_at ? new Date(row.created_at).toLocaleString() : "-"
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
      <AdminBreadcrumbs />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
            Notifications & Broadcasts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, send, and broadcast system notifications to consumers and service providers.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenSendModal(true)}
          sx={{ bgcolor: "#635BFF", textTransform: "none", "&:hover": { bgcolor: "#4F46E5" }, borderRadius: "8px" }}
        >
          Send Notification
        </Button>
      </Box>

      <Box sx={{ bgcolor: "white", borderRadius: "16px", p: 3, border: "1px solid #E5E7EB" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#635BFF" }} />
          </Box>
        ) : (
          <CustomDataTable
            data={notifications}
            columns={columns}
            searchPlaceholder="Search sent notifications..."
            searchFields={["title", "message", "user_name"]}
          />
        )}
      </Box>

      {/* Send Notification Modal */}
      <Dialog open={openSendModal} onClose={() => setOpenSendModal(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle sx={{ fontWeight: 700, pb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <CampaignIcon sx={{ color: "#635BFF" }} /> Send New Notification
        </DialogTitle>
        <form onSubmit={handleSendNotification}>
          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={3}>
              <FormControl fullWidth required size="small">
                <InputLabel>Select Recipient</InputLabel>
                <Select
                  value={form.userId}
                  label="Select Recipient"
                  onChange={(e) => setForm(prev => ({ ...prev, userId: e.target.value }))}
                >
                  <MenuItem value="0" sx={{ fontWeight: 600, color: "#635BFF" }}>
                    📣 Broadcast to All Users & Vendors
                  </MenuItem>
                  {users.map(u => (
                    <MenuItem key={u.id} value={String(u.id)}>
                      {u.name} ({u.role?.toUpperCase()}) - {u.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                required
                label="Notification Title"
                placeholder="e.g. System Maintenance, New Offer..."
                size="small"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              />

              <TextField
                fullWidth
                required
                multiline
                rows={4}
                label="Notification Message"
                placeholder="Enter the notification message details..."
                size="small"
                value={form.message}
                onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenSendModal(false)} sx={{ textTransform: "none", color: "#6B7280" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={sending}
              sx={{ bgcolor: "#635BFF", textTransform: "none", "&:hover": { bgcolor: "#4F46E5" }, borderRadius: "8px" }}
            >
              {sending ? "Sending..." : "Send Notification"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
