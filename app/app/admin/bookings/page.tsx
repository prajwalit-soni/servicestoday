"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  Tooltip,
  Divider,
} from "@mui/material";
import CustomDataTable, { Column } from "../components/CustomDataTable";
import axiosClient from "../../lib/api";
import { toast } from "react-toastify";

// Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Customer Details Dialog State
  const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState<any>(null);
  const [loadingCustomerDetails, setLoadingCustomerDetails] = useState(false);

  const handleViewCustomerDetails = async (userId: number) => {
    setCustomerDetailsOpen(true);
    setLoadingCustomerDetails(true);
    setSelectedCustomerDetails(null);
    try {
      const res = await axiosClient.get(`/users/${userId}`);
      setSelectedCustomerDetails(res.data);
    } catch (err) {
      console.error("Error fetching customer details:", err);
      toast.error("Failed to load customer details");
    } finally {
      setLoadingCustomerDetails(false);
    }
  };

  // Selections for form dropdowns
  const [users, setUsers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Modals
  const [dispatchOpen, setDispatchOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [editServices, setEditServices] = useState<any[]>([]);
  
  // Full Edit Form State
  const [editForm, setEditForm] = useState({
    bookingId: null,
    userId: "",
    categoryId: "",
    serviceId: "",
    providerId: "",
    bookingDate: "",
    bookingTime: "10:00",
    totalAmount: "",
    companyCommission: "",
    notes: "",
    status: "pending",
  });

  // Dispatch Form State
  const [dispatchForm, setDispatchForm] = useState({
    userId: "",
    categoryId: "",
    serviceId: "",
    dispatchType: "broadcast", // 'broadcast' or 'direct'
    providerId: "",
    bookingDate: "",
    bookingTime: "10:00",
    totalAmount: "",
    companyCommission: "",
    notes: "",
  });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (statusFilter) params.status_val = statusFilter;
      if (dateFilter) params.booking_date = dateFilter;
      
      const response = await axiosClient.get("/bookings/admin", { params });
      if (response.data && response.data.success) {
        setBookings(response.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching admin bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, dateFilter]);

  // Load auxiliary lists on mount
  useEffect(() => {
    // 1. Users
    axiosClient.get("/users")
      .then(res => {
        const list = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setUsers(list.filter((u: any) => u.role === "user"));
      })
      .catch(err => console.error("Error fetching users:", err));

    // 2. Categories
    axiosClient.get("/public/categories")
      .then(res => {
        if (res.data && res.data.success) {
          const flattenCategories = (list: any[]): any[] => {
            let result: any[] = [];
            list.forEach(cat => {
              result.push({ id: cat.id, name: cat.name });
              if (cat.children && cat.children.length > 0) {
                result = result.concat(flattenCategories(cat.children));
              }
            });
            return result;
          };
          setCategories(flattenCategories(res.data.data || []));
        }
      })
      .catch(err => console.error("Error fetching categories:", err));

    // 3. Providers (fetch with limit=100 to ensure we load providers for assignment)
    axiosClient.get("/admin/providers", { params: { limit: 100 } })
      .then(res => {
        if (res.data && res.data.success) {
          setProviders(res.data.data || []);
        }
      })
      .catch(err => console.error("Error fetching providers:", err));
  }, []);

  // Fetch services when selected category changes
  useEffect(() => {
    if (!dispatchForm.categoryId) {
      setServices([]);
      return;
    }
    axiosClient.get("/public/services", { params: { category_id: dispatchForm.categoryId, limit: 100 } })
      .then(res => {
        if (res.data && res.data.success) {
          setServices(res.data.data || []);
        } else {
          setServices([]);
        }
      })
      .catch(err => {
        console.error("Error fetching category services:", err);
        setServices([]);
      });
  }, [dispatchForm.categoryId]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this booking?")) return;
    try {
      await axiosClient.delete(`/bookings/admin/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  // Fetch services when edit category changes
  useEffect(() => {
    if (!editForm.categoryId) {
      setEditServices([]);
      return;
    }
    axiosClient.get("/public/services", { params: { category_id: editForm.categoryId, limit: 100 } })
      .then(res => {
        if (res.data && res.data.success) {
          setEditServices(res.data.data || []);
        } else {
          setEditServices([]);
        }
      })
      .catch(err => {
        console.error("Error fetching category services:", err);
        setEditServices([]);
      });
  }, [editForm.categoryId]);

  const handleEditClick = (booking: any) => {
    setSelectedBooking(booking);
    setEditForm({
      bookingId: booking.id,
      userId: String(booking.user_id),
      categoryId: String(booking.category_id || ""),
      serviceId: String(booking.service_id || ""),
      providerId: String(booking.provider_id || ""),
      bookingDate: booking.booking_date || "",
      bookingTime: booking.booking_time ? booking.booking_time.slice(0, 5) : "10:00",
      totalAmount: String(booking.total_amount || ""),
      companyCommission: String(booking.company_commission !== undefined && booking.company_commission !== null ? booking.company_commission : ""),
      notes: booking.notes || "",
      status: booking.status || "pending",
    });
    setEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.bookingId) return;
    try {
      const payload = {
        provider_id: parseInt(editForm.providerId),
        service_id: parseInt(editForm.serviceId),
        booking_date: editForm.bookingDate,
        booking_time: editForm.bookingTime,
        total_amount: parseFloat(editForm.totalAmount),
        company_commission: editForm.companyCommission ? parseFloat(editForm.companyCommission) : 0.0,
        notes: editForm.notes,
        status: editForm.status
      };
      const response = await axiosClient.put(`/bookings/admin/${editForm.bookingId}`, payload);
      if (response.data && response.data.success) {
        setEditOpen(false);
        fetchBookings();
      }
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Failed to update booking.");
    }
  };

  const handleDispatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        user_id: parseInt(dispatchForm.userId),
        category_id: parseInt(dispatchForm.categoryId),
        service_id: parseInt(dispatchForm.serviceId),
        address_id: 1, // Default address stub
        booking_date: dispatchForm.bookingDate,
        booking_time: dispatchForm.bookingTime,
        total_amount: parseFloat(dispatchForm.totalAmount),
        company_commission: dispatchForm.companyCommission ? parseFloat(dispatchForm.companyCommission) : 0.0,
        notes: dispatchForm.notes,
        provider_id: dispatchForm.dispatchType === "direct" && dispatchForm.providerId ? parseInt(dispatchForm.providerId) : null
      };

      const response = await axiosClient.post("/bookings/admin/service-request", payload);
      if (response.data && response.data.success) {
        setDispatchOpen(false);
        setDispatchForm({
          userId: "",
          categoryId: "",
          serviceId: "",
          dispatchType: "broadcast",
          providerId: "",
          bookingDate: "",
          bookingTime: "10:00",
          totalAmount: "",
          companyCommission: "",
          notes: "",
        });
        fetchBookings();
      }
    } catch (err) {
      console.error("Error dispatching service request:", err);
      alert("Failed to dispatch service request. Make sure category has registered providers.");
    }
  };

  const columns: Column[] = [
    { id: "booking_no", label: "Booking ID", width: "120px" },
    {
      id: "customer_name",
      label: "Customer",
      width: "160px",
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "#635BFF",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" }
            }}
            onClick={() => handleViewCustomerDetails(row.user_id)}
          >
            {row.customer_name}
          </Typography>
          <Tooltip title="View Customer Details">
            <IconButton
              size="small"
              onClick={() => handleViewCustomerDetails(row.user_id)}
              sx={{ p: 0.25 }}
            >
              <InfoOutlinedIcon fontSize="small" sx={{ fontSize: "16px", color: "#9E9E9E" }} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
    {
      id: "provider_name",
      label: "Direct Provider",
      width: "250px",
      render: (row) => (
        <Box>
          <Typography component="div" variant="body2" sx={{ fontWeight: 600 }}>
            {row.provider_name || <Chip label="Broadcast (Unassigned)" size="small" variant="outlined" color="warning" />}
          </Typography>
          {row.provider_name && row.provider_address && (
            <Typography variant="caption" color="text.secondary" display="block" sx={{ whiteSpace: "normal" }}>
              {row.provider_address}
            </Typography>
          )}
        </Box>
      )
    },
    { id: "service_name", label: "Service Type", width: "160px" },
    { id: "total_amount", label: "Total Amount", width: "120px", render: (row) => `₹${row.total_amount}` },
    { id: "company_commission", label: "Commission (Co.)", width: "140px", render: (row) => `₹${row.company_commission ?? 0}` },
    { id: "vendor_amount", label: "Vendor Share", width: "120px", render: (row) => `₹${row.vendor_amount ?? 0}` },
    { id: "booking_date", label: "Scheduled", width: "180px", render: (row) => `${row.booking_date} @ ${row.booking_time}` },
    {
      id: "status",
      label: "Status",
      width: "120px",
      render: (row) => {
        let color: "warning" | "info" | "success" | "error" | "default" = "default";
        if (row.status === "pending") color = "warning";
        else if (row.status === "accepted") color = "info";
        else if (row.status === "completed") color = "success";
        else if (row.status === "cancelled") color = "error";
        return <Chip label={row.status.toUpperCase()} size="small" color={color} />;
      }
    },
    {
      id: "actions",
      label: "Actions",
      width: "140px",
      render: (row) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit Booking Details">
            <IconButton size="small" onClick={() => handleEditClick(row)}>
              <EditOutlinedIcon fontSize="small" sx={{ color: "#635BFF" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Permanently Delete">
            <IconButton size="small" onClick={() => handleDelete(row.id)}>
              <DeleteOutlineIcon fontSize="small" sx={{ color: "#EF4444" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, pb: 4 }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="#111827" sx={{ mb: 0.5 }}>
            Bookings & Dispatch
          </Typography>
          <Typography variant="body2" color="#6B7280" fontWeight={500}>
            Monitor active work orders, update statuses, or broadcast new dispatch requests to relevant providers.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDispatchOpen(true)}
          sx={{
            bgcolor: "#635BFF",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            "&:hover": { bgcolor: "#4F46E5" }
          }}
        >
          Dispatch Service Request
        </Button>
      </Box>

      {/* Filter Bar */}
      <Card sx={{ mb: 4, borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "none" }}>
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <Typography variant="subtitle2" fontWeight={600} color="#374151">Filters:</Typography>
            
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="date"
              size="small"
              label="Schedule Date"
              InputLabelProps={{ shrink: true }}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              sx={{ minWidth: 160 }}
            />

            {(statusFilter || dateFilter) && (
              <Button 
                variant="text" 
                size="small"
                onClick={() => { setStatusFilter(""); setDateFilter(""); }}
                sx={{ textTransform: "none", color: "#EF4444" }}
              >
                Clear Filters
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: "16px", border: "1px solid #EAEAEA", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#635BFF" }} />
            </Box>
          ) : (
            <CustomDataTable
              columns={columns}
              data={bookings}
            />
          )}
        </CardContent>
      </Card>

      {/* Dispatch Modal */}
      <Dialog open={dispatchOpen} onClose={() => setDispatchOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Dispatch New Service Request</DialogTitle>
        <form onSubmit={handleDispatchSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Target Customer</InputLabel>
                  <Select
                    value={dispatchForm.userId}
                    label="Target Customer"
                    onChange={(e) => setDispatchForm(prev => ({ ...prev, userId: e.target.value }))}
                  >
                    {users.map(u => (
                      <MenuItem key={u.id} value={u.id}>{u.name} ({u.email})</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={6}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Service Category</InputLabel>
                  <Select
                    value={dispatchForm.categoryId}
                    label="Service Category"
                    onChange={(e) => setDispatchForm(prev => ({ ...prev, categoryId: e.target.value, serviceId: "" }))}
                  >
                    {categories.map(c => (
                      <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={6}>
                <FormControl fullWidth required size="small" disabled={!dispatchForm.categoryId}>
                  <InputLabel>Specific Service</InputLabel>
                  <Select
                    value={dispatchForm.serviceId}
                    label="Specific Service"
                    onChange={(e) => {
                      const sId = e.target.value;
                      const selectedSvc = services.find(s => String(s.id) === String(sId));
                      const price = selectedSvc ? String(selectedSvc.price) : "";
                      const comm = price ? (parseFloat(price) * 0.15).toFixed(2) : "";
                      setDispatchForm(prev => ({ 
                        ...prev, 
                        serviceId: sId, 
                        totalAmount: price,
                        companyCommission: comm
                      }));
                    }}
                  >
                    {services.map(s => (
                      <MenuItem key={s.id} value={s.id}>{s.title} (₹{s.price})</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Dispatch Strategy</InputLabel>
                  <Select
                    value={dispatchForm.dispatchType}
                    label="Dispatch Strategy"
                    onChange={(e) => setDispatchForm(prev => ({ ...prev, dispatchType: e.target.value, providerId: "" }))}
                  >
                    <MenuItem value="broadcast">Broadcast to All Category Vendors (Sends Notifications)</MenuItem>
                    <MenuItem value="direct">Directly Assign to Specific Vendor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {dispatchForm.dispatchType === "direct" && (
                <Grid size={12}>
                  <FormControl fullWidth required size="small">
                    <InputLabel>Choose Vendor</InputLabel>
                    <Select
                      value={dispatchForm.providerId}
                      label="Choose Vendor"
                      onChange={(e) => setDispatchForm(prev => ({ ...prev, providerId: e.target.value }))}
                    >
                      {providers
                        .filter(p => p.category_id === parseInt(dispatchForm.categoryId))
                        .map(p => (
                          <MenuItem key={p.id} value={p.id}>{p.business_name} (Rating: {p.rating})</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid size={6}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label="Scheduled Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={dispatchForm.bookingDate}
                  onChange={(e) => setDispatchForm(prev => ({ ...prev, bookingDate: e.target.value }))}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  required
                  type="time"
                  label="Scheduled Time"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={dispatchForm.bookingTime}
                  onChange={(e) => setDispatchForm(prev => ({ ...prev, bookingTime: e.target.value }))}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Amount (₹)"
                  size="small"
                  value={dispatchForm.totalAmount}
                  onChange={(e) => {
                    const amt = e.target.value;
                    const comm = amt ? (parseFloat(amt) * 0.15).toFixed(2) : "";
                    setDispatchForm(prev => ({ ...prev, totalAmount: amt, companyCommission: comm }));
                  }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Company Commission (₹)"
                  size="small"
                  value={dispatchForm.companyCommission}
                  onChange={(e) => setDispatchForm(prev => ({ ...prev, companyCommission: e.target.value }))}
                />
              </Grid>

              {dispatchForm.totalAmount && (
                <Grid size={12}>
                  <Box sx={{ p: 2, bgcolor: "#F9FAFB", borderRadius: "8px", border: "1px solid #E5E7EB" }}>
                    <Typography variant="body2" sx={{ color: "#4B5563", fontWeight: 500 }}>
                      Payout Breakdown (15% Co. share by default):
                    </Typography>
                    <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
                        Company Commission: ₹{parseFloat(dispatchForm.companyCommission || "0").toFixed(2)}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#10B981" }}>
                        Vendor Share: ₹{(parseFloat(dispatchForm.totalAmount) - parseFloat(dispatchForm.companyCommission || "0")).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              )}

              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Dispatch Notes / Instructions"
                  size="small"
                  value={dispatchForm.notes}
                  onChange={(e) => setDispatchForm(prev => ({ ...prev, notes: e.target.value }))}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setDispatchOpen(false)} sx={{ textTransform: "none", color: "#4B5563" }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ textTransform: "none", bgcolor: "#635BFF", "&:hover": { bgcolor: "#4F46E5" } }}>
              Confirm Dispatch
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Edit Booking Modal */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Edit Booking {selectedBooking?.booking_no}</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControl fullWidth required size="small" disabled>
                  <InputLabel>Customer (Non-editable)</InputLabel>
                  <Select
                    value={editForm.userId}
                    label="Customer (Non-editable)"
                  >
                    {users.map(u => (
                      <MenuItem key={u.id} value={String(u.id)}>{u.name} ({u.email})</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={6}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Service Category</InputLabel>
                  <Select
                    value={editForm.categoryId}
                    label="Service Category"
                    onChange={(e) => setEditForm(prev => ({ ...prev, categoryId: e.target.value, serviceId: "", providerId: "" }))}
                  >
                    {categories.map(c => (
                      <MenuItem key={c.id} value={String(c.id)}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={6}>
                <FormControl fullWidth required size="small" disabled={!editForm.categoryId}>
                  <InputLabel>Specific Service</InputLabel>
                  <Select
                    value={editForm.serviceId}
                    label="Specific Service"
                    onChange={(e) => {
                      const sId = e.target.value;
                      const selectedSvc = editServices.find(s => String(s.id) === String(sId));
                      const price = selectedSvc ? String(selectedSvc.price) : "";
                      const comm = price ? (parseFloat(price) * 0.15).toFixed(2) : "";
                      setEditForm(prev => ({ 
                        ...prev, 
                        serviceId: sId, 
                        totalAmount: price,
                        companyCommission: comm
                      }));
                    }}
                  >
                    {editServices.map(s => (
                      <MenuItem key={s.id} value={String(s.id)}>{s.title} (₹{s.price})</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth required size="small" disabled={!editForm.categoryId}>
                  <InputLabel>Choose Vendor</InputLabel>
                  <Select
                    value={editForm.providerId}
                    label="Choose Vendor"
                    onChange={(e) => setEditForm(prev => ({ ...prev, providerId: e.target.value }))}
                  >
                    {providers
                      .filter(p => p.category_id === parseInt(editForm.categoryId))
                      .map(p => (
                        <MenuItem key={p.id} value={String(p.id)}>{p.business_name} (Rating: {p.rating})</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label="Scheduled Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={editForm.bookingDate}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bookingDate: e.target.value }))}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  required
                  type="time"
                  label="Scheduled Time"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={editForm.bookingTime}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bookingTime: e.target.value }))}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Amount (₹)"
                  size="small"
                  value={editForm.totalAmount}
                  onChange={(e) => {
                    const amt = e.target.value;
                    const comm = amt ? (parseFloat(amt) * 0.15).toFixed(2) : "";
                    setEditForm(prev => ({ ...prev, totalAmount: amt, companyCommission: comm }));
                  }}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Company Commission (₹)"
                  size="small"
                  value={editForm.companyCommission}
                  onChange={(e) => setEditForm(prev => ({ ...prev, companyCommission: e.target.value }))}
                />
              </Grid>
              
              <Grid size={12}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Booking Status</InputLabel>
                  <Select
                    value={editForm.status}
                    label="Booking Status"
                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="accepted">Accepted</MenuItem>
                    <MenuItem value="ongoing">Ongoing</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {editForm.totalAmount && (
                <Grid size={12}>
                  <Box sx={{ p: 2, bgcolor: "#F9FAFB", borderRadius: "8px", border: "1px solid #E5E7EB" }}>
                    <Typography variant="body2" sx={{ color: "#4B5563", fontWeight: 500 }}>
                      Payout Breakdown (Customized Share):
                    </Typography>
                    <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
                        Company Commission: ₹{parseFloat(editForm.companyCommission || "0").toFixed(2)}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#10B981" }}>
                        Vendor Share: ₹{(parseFloat(editForm.totalAmount) - parseFloat(editForm.companyCommission || "0")).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              )}

              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Instructions / Notes"
                  size="small"
                  value={editForm.notes}
                  onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setEditOpen(false)} sx={{ textTransform: "none", color: "#4B5563" }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ textTransform: "none", bgcolor: "#635BFF", "&:hover": { bgcolor: "#4F46E5" } }}>
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Customer Details Dialog */}
      <Dialog
        open={customerDetailsOpen}
        onClose={() => setCustomerDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px" } }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Customer Details</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {loadingCustomerDetails ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={36} sx={{ color: "#635BFF" }} />
            </Box>
          ) : selectedCustomerDetails ? (
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid size={12}>
                <Typography variant="caption" color="text.secondary">Full Name</Typography>
                <Typography variant="body1" fontWeight={600}>{selectedCustomerDetails.name}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Email Address</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedCustomerDetails.email}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedCustomerDetails.phone || "N/A"}</Typography>
              </Grid>
              <Grid size={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid size={12}>
                <Typography variant="caption" color="text.secondary">Address</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedCustomerDetails.address || "N/A"}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">PIN Code</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedCustomerDetails.pin_no || "N/A"}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="caption" color="text.secondary">Area Type</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedCustomerDetails.area_type || "N/A"}</Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" color="text.secondary">State</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedCustomerDetails.state_name || "N/A"}</Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" color="text.secondary">District</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedCustomerDetails.district_name || "N/A"}</Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" color="text.secondary">City</Typography>
                <Typography variant="body1" fontWeight={500}>{selectedCustomerDetails.city_name || "N/A"}</Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
              Failed to load customer details.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setCustomerDetailsOpen(false)}
            variant="contained"
            sx={{
              bgcolor: "#635BFF",
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              "&:hover": { bgcolor: "#4E46DD" }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
