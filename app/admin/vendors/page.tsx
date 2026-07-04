"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdminBreadcrumbs from "../components/AdminBreadcrumbs";
import CustomDataTable from "../components/CustomDataTable";
import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import AddVendorForm from "./components/Form";
import { UserService, type UserVendorData } from "../../lib/services/userService";
import { toast } from "react-toastify";


export type { UserVendorData };

export default function DashboardHome() {
  const router = useRouter();

  // Local state arrays to allow interface updates following a deletion or edit
  const [vendors, setVendors] = useState<UserVendorData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Modal State Hooks
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [editingVendor, setEditingVendor] = useState<UserVendorData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch all users/vendors
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UserService.getAll();
      setVendors(data);
    } catch (error: any) {
      console.error("Failed to load users:", error);
      const errMsg = error.response?.data?.detail || error.response?.data?.message || error.message || "Failed to load users list";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Redirections
  const handleViewVendor = (id: string | number) => {
    router.push(`/admin/vendors/details?id=${id}`);
  };

  const handleEditVendor = (id: string | number) => {
    const idNum = Number(id);
    const vendor = vendors.find((v) => v.id === idNum);
    if (vendor) {
      setEditingVendor(vendor);
      setIsEditModalOpen(true);
    }
  };

  // Trigger Hook to capture selected ID and display modal overlay
  const handleDeleteTrigger = (id: string | number) => {
    setSelectedVendorId(String(id));
    setIsDeleteOpen(true);
  };

  const handleExecuteDelete = async () => {
    if (!selectedVendorId) return;

    setIsDeleting(true);
    try {
      const idNum = Number(selectedVendorId);
      await UserService.delete(idNum);
      setVendors((prev) =>
        prev.filter((vendor) => vendor.id !== idNum),
      );
      toast.success("User deleted successfully!");
      setIsDeleteOpen(false);
      setSelectedVendorId(null);
    } catch (error: any) {
      console.error(error);
      const errMsg = error.response?.data?.detail || error.response?.data?.message || error.message || "Failed to delete user";
      toast.error(errMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Column definitions for CustomDataTable
  const columns = [
    { id: "id", label: "ID", width: "80px" },
    {
      id: "name",
      label: "Account Info",
      width: "220px",
      render: (row: UserVendorData) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#635BFF", fontSize: "14px" }}>
            {row.name ? row.name.charAt(0).toUpperCase() : "?"}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: "13.5px",
                fontWeight: 600,
                color: "#212121",
                lineHeight: 1.2,
              }}
            >
              {row.name}
            </Typography>
            <Typography sx={{ fontSize: "11px", color: "#757575", mt: 0.2 }}>
              {row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { id: "phone", label: "Number", width: "130px" },
    {
      id: "is_active",
      label: "Status",
      width: "120px",
      render: (row: UserVendorData) => (
        <Box
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.4,
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 600,
            bgcolor: row.is_active ? "#E6F4EA" : "#FCE8E6",
            color: row.is_active ? "#137333" : "#C5221F",
          }}
        >
          {row.is_active ? "Active" : "Inactive"}
        </Box>
      ),
    },
    {
      id: "role",
      label: "Role",
      width: "120px",
      render: (row: UserVendorData) => {
        const role = row.role?.toLowerCase() || "";
        let bgcolor = "#F3F4F6";
        let color = "#374151";
        if (role === "vendor") {
          bgcolor = "#E0F2FE";
          color = "#0369A1";
        } else if (role === "partner") {
          bgcolor = "#F5F3FF";
          color = "#6D28D9";
        } else if (role === "admin") {
          bgcolor = "#FEF3C7";
          color = "#B45309";
        } else if (role === "user") {
          bgcolor = "#ECFDF5";
          color = "#047857";
        }
        return (
          <Box
            sx={{
              display: "inline-block",
              px: 1.5,
              py: 0.4,
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "capitalize",
              bgcolor,
              color,
            }}
          >
            {row.role}
          </Box>
        );
      },
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    if (roleFilter === "all") return true;
    return vendor.role?.toLowerCase() === roleFilter.toLowerCase();
  });

  const roleFilterSelector = (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id="role-filter-label" sx={{ fontSize: "13px", fontWeight: 500 }}>
        Role Filter
      </InputLabel>
      <Select
        labelId="role-filter-label"
        id="role-filter"
        value={roleFilter}
        label="Role Filter"
        onChange={(e) => setRoleFilter(e.target.value)}
        sx={{
          borderRadius: "20px",
          bgcolor: "#FAFAFA",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        <MenuItem value="all">All Roles</MenuItem>
        <MenuItem value="vendor">Vendor</MenuItem>
        <MenuItem value="partner">Partner</MenuItem>
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
      }}
    >
      {/* Breadcrumbs */}
      <AdminBreadcrumbs />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedVendorId(null);
        }}
        onConfirm={handleExecuteDelete}
        loading={isDeleting}
      />

      {/* Edit Vendor Dialog */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingVendor(null);
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: { xs: 2, sm: 4 },
            boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
          },
        }}
      >
        {editingVendor && (
          <AddVendorForm
            mode="edit"
            initialValues={editingVendor}
            onSuccessClose={() => {
              fetchUsers();
              setIsEditModalOpen(false);
              setEditingVendor(null);
            }}
          />
        )}
      </Dialog>

      {/* Core Custom Table Element Container */}
      <CustomDataTable
        data={filteredVendors}
        columns={columns}
        searchFields={["name", "email", "phone", "address"]}
        actions={["view", "edit", "delete"]}
        onView={handleViewVendor}
        onEdit={handleEditVendor}
        onDelete={handleDeleteTrigger}
        loading={loading}
        toolbarActions={roleFilterSelector}
        addForm={(onClose) => (
          <AddVendorForm
            mode="add"
            onSuccessClose={() => {
              fetchUsers();
              onClose();
            }}
          />
        )}
      />
    </Box>
  );
}
