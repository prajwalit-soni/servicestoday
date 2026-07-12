"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";

// Icons
import CategoryIcon from "@mui/icons-material/Category";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Custom admin components
import AdminBreadcrumbs from "../components/AdminBreadcrumbs";
import CustomDataTable from "../components/CustomDataTable";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

// Toast alerts
import { toast } from "react-toastify";

// API Services
import { CategoryService, ApiCategory } from "../../lib/services/categoryService";
import { BannerService, ApiBanner } from "../../lib/services/bannerService";

export default function WebsiteDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  // States for CRUD datasets
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [banners, setBanners] = useState<ApiBanner[]>([]);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  // Dialog management
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State Values
  const [formValues, setFormValues] = useState<any>({});

  // File Upload states
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryIcon, setCategoryIcon] = useState<File | null>(null);
  const [categoryBannerImage, setCategoryBannerImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    resetFormFiles();
  };

  const resetFormFiles = () => {
    setCategoryImage(null);
    setCategoryIcon(null);
    setCategoryBannerImage(null);
    setBannerImage(null);
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [categoriesRes, bannersRes] = await Promise.allSettled([
        CategoryService.getAll(),
        BannerService.getAll(),
      ]);

      if (categoriesRes.status === "fulfilled" && categoriesRes.value) {
        const rawRes = categoriesRes.value as any;
        const rawCategories = Array.isArray(rawRes)
          ? rawRes
          : (rawRes.data || []);

        // Map flat categories list from backend, identifying subcategories by parent status
        const flatCategories: ApiCategory[] = rawCategories.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          description: item.description || "",
          sort_order: item.sort_order,
          parent_id: item.parent_id,
          is_active: item.is_active,
          image: item.image_path || item.image,
          icon: item.icon_path || item.icon,
          banner_image: item.banner_image_path || item.banner_image,
          parent_name: item.parent ? item.parent.name : "Root",
          price: item.price,
          discount_price: item.discount_price,
          location: item.location,
          description_sections: item.description_sections,
        }));
        setCategories(flatCategories);
      } else {
        const reason = categoriesRes.status === "rejected" ? categoriesRes.reason : null;
        console.warn("Backend categories API returned 502 Bad Gateway or is offline:", reason?.message || reason);
        toast.error("Failed to load backend categories (Server Offline 502).");
      }

      if (bannersRes.status === "fulfilled" && bannersRes.value) {
        const rawBannersRes = bannersRes.value as any;
        const rawBanners = Array.isArray(rawBannersRes)
          ? rawBannersRes
          : (rawBannersRes.data || []);
        setBanners(rawBanners);
      }
    } catch (err) {
      // Silently catch general errors
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const getStatusChip = (status: any) => {
    const normalized = String(status).toLowerCase();
    const isActive = normalized === "active" || normalized === "true" || normalized === "1" || status === true;
    return (
      <Chip
        label={isActive ? "Active" : "Inactive"}
        size="small"
        sx={{
          bgcolor: isActive ? "#E6F4EA" : "#FCE8E6",
          color: isActive ? "#137333" : "#C5221F",
          fontWeight: 600,
          fontSize: "11px",
          borderRadius: "8px",
        }}
      />
    );
  };

  const getImageUrl = (url: string | undefined) => {
    if (!url) return undefined;
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  // --- Columns Configuration ---

  const categoryColumns = [
    { id: "id", label: "Category ID", width: "100px" },
    {
      id: "image",
      label: "Image",
      width: "80px",
      render: (r: ApiCategory) => (
        <Avatar
          variant="rounded"
          src={getImageUrl(r.image)}
          sx={{ width: 44, height: 44, bgcolor: "#F3E5F5" }}
        >
          <CategoryIcon sx={{ color: "#635BFF" }} />
        </Avatar>
      ),
    },
    {
      id: "name",
      label: "Category Name",
      width: "220px",
      render: (r: ApiCategory) => <Box sx={{ fontWeight: 600, color: "#111827" }}>{r.name}</Box>,
    },
    { id: "slug", label: "Slug", width: "180px" },
    { id: "sort_order", label: "Sort Order", width: "110px", align: "center" as const },
    {
      id: "is_active",
      label: "Status",
      width: "120px",
      render: (r: ApiCategory) => getStatusChip(r.is_active),
    },
  ];

  const subcategoryColumns = [
    { id: "id", label: "Subcategory ID", width: "100px" },
    {
      id: "image",
      label: "Image",
      width: "80px",
      render: (r: ApiCategory) => (
        <Avatar
          variant="rounded"
          src={getImageUrl(r.image)}
          sx={{ width: 44, height: 44, bgcolor: "#F3E5F5" }}
        >
          <CategoryIcon sx={{ color: "#635BFF" }} />
        </Avatar>
      ),
    },
    {
      id: "name",
      label: "Subcategory Name",
      width: "220px",
      render: (r: ApiCategory) => <Box sx={{ fontWeight: 600, color: "#111827" }}>{r.name}</Box>,
    },
    { id: "slug", label: "Slug", width: "180px" },
    {
      id: "parent_name",
      label: "Parent Category",
      width: "200px",
      render: (r: ApiCategory) => {
        const parent = categories.find((c) => c.id === Number(r.parent_id));
        return parent ? parent.name : "Unknown Parent";
      },
    },
    {
      id: "price",
      label: "Price",
      width: "100px",
      render: (r: ApiCategory) => <Box sx={{ color: "#4B5563" }}>{r.price !== null && r.price !== undefined ? `₹${r.price}` : "-"}</Box>,
    },
    {
      id: "discount_price",
      label: "Discount Price",
      width: "120px",
      render: (r: ApiCategory) => <Box sx={{ color: "#4B5563" }}>{r.discount_price !== null && r.discount_price !== undefined ? `₹${r.discount_price}` : "-"}</Box>,
    },
    {
      id: "location",
      label: "Location",
      width: "140px",
      render: (r: ApiCategory) => <Box sx={{ color: "#4B5563" }}>{r.location || "-"}</Box>,
    },
    { id: "sort_order", label: "Sort Order", width: "110px", align: "center" as const },
    {
      id: "is_active",
      label: "Status",
      width: "120px",
      render: (r: ApiCategory) => getStatusChip(r.is_active),
    },
  ];

  const bannerColumns = [
    { id: "id", label: "Banner ID", width: "100px" },
    {
      id: "image",
      label: "Banner Image Preview",
      width: "150px",
      render: (r: ApiBanner) => (
        <Box
          component="img"
          src={getImageUrl(r.image_path || r.image)}
          sx={{
            width: 120,
            height: 50,
            objectFit: "cover",
            borderRadius: "6px",
            border: "1px solid #EAEAEA",
            backgroundColor: "#F3E5F5",
          }}
          alt={r.title}
        />
      ),
    },
    {
      id: "title",
      label: "Banner Title",
      width: "250px",
      render: (r: ApiBanner) => <Box sx={{ fontWeight: 600, color: "#111827" }}>{r.title}</Box>,
    },
    { id: "redirect_url", label: "Redirect URL", width: "220px" },
    {
      id: "status",
      label: "Status",
      width: "120px",
      render: (r: ApiBanner) => getStatusChip(r.status),
    },
  ];

  // --- CRUD Event Handlers ---

  const handleOpenAdd = () => {
    setFormMode("add");
    setSelectedRowId(null);
    resetFormFiles();
    if (activeTab === 0) {
      setFormValues({
        name: "",
        slug: "",
        description: "",
        sort_order: 0,
        parent_id: "",
        is_active: "true",
      });
    } else if (activeTab === 1) {
      const rootCategories = categories.filter((c) => c.parent_id === null || c.parent_id === undefined || String(c.parent_id) === "");
      const defaultParentId = rootCategories.length > 0 ? String(rootCategories[0].id) : "";
      setFormValues({
        name: "",
        slug: "",
        description: "",
        sort_order: 0,
        parent_id: defaultParentId,
        is_active: "true",
        price: "",
        discount_price: "",
        location: "",
        description_sections: [],
      });
    } else {
      setFormValues({
        title: "",
        redirect_url: "",
        status: "Active",
      });
    }
    setIsFormOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setFormMode("edit");
    setSelectedRowId(id);
    resetFormFiles();
    const idNum = Number(id);

    if (activeTab === 0 || activeTab === 1) {
      const row = categories.find((c) => c.id === idNum);
      if (row) {
        let parsedSections = [];
        if (row.description_sections) {
          try {
            parsedSections = typeof row.description_sections === 'string'
              ? JSON.parse(row.description_sections)
              : row.description_sections;
          } catch (e) {
            console.error("Error parsing description sections:", e);
          }
        }

        setFormValues({
          ...row,
          is_active: String(row.is_active),
          parent_id: row.parent_id !== null ? String(row.parent_id) : "",
          price: row.price !== null && row.price !== undefined ? row.price : "",
          discount_price: row.discount_price !== null && row.discount_price !== undefined ? row.discount_price : "",
          location: row.location || "",
          description_sections: parsedSections,
        });
        setIsFormOpen(true);
      }
    } else {
      const row = banners.find((b) => b.id === idNum);
      if (row) {
        setFormValues({ ...row });
        setIsFormOpen(true);
      }
    }
  };

  const handleDeleteTrigger = (id: string) => {
    setSelectedRowId(id);
    setIsDeleteOpen(true);
  };

  const executeDelete = async () => {
    if (!selectedRowId) return;
    setIsDeleting(true);
    try {
      const idNum = Number(selectedRowId);
      if (activeTab === 0 || activeTab === 1) {
        await CategoryService.delete(idNum);
        // Optimistic UI fallback
        setCategories((prev) => prev.filter((c) => c.id !== idNum));
      } else {
        await BannerService.delete(idNum);
        // Optimistic UI fallback
        setBanners((prev) => prev.filter((b) => b.id !== idNum));
      }
      toast.success("Record deleted successfully!");
      await fetchAllData();
    } catch (err: any) {
      console.error("Failed to delete record:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to delete record");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
      setSelectedRowId(null);
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();

      if (activeTab === 0 || activeTab === 1) {
        // Category Form Data
        formData.append("name", formValues.name || "");
        formData.append("slug", formValues.slug || "");
        formData.append("description", formValues.description || "");
        formData.append("sort_order", String(formValues.sort_order || 0));
        formData.append("is_active", String(formValues.is_active === "true"));

        if (formValues.parent_id !== "" && formValues.parent_id !== undefined) {
          formData.append("parent_id", String(formValues.parent_id));
        }

        if (activeTab === 1) {
          if (formValues.price !== undefined && formValues.price !== "") {
            formData.append("price", String(formValues.price));
          }
          if (formValues.discount_price !== undefined && formValues.discount_price !== "") {
            formData.append("discount_price", String(formValues.discount_price));
          }
          if (formValues.location !== undefined && formValues.location !== null) {
            formData.append("location", formValues.location);
          }
          if (formValues.description_sections !== undefined && formValues.description_sections !== null) {
            formData.append("description_sections", JSON.stringify(formValues.description_sections));
          }
        }

        if (categoryImage) formData.append("image", categoryImage);
        if (categoryIcon) formData.append("icon", categoryIcon);
        if (categoryBannerImage) formData.append("banner_image", categoryBannerImage);

        if (formMode === "add") {
          const newCategory = await CategoryService.create(formData);
          toast.success("Category created successfully!");
          setCategories((prev) => [...prev, newCategory]);
        } else {
          const updatedCategory = await CategoryService.update(Number(selectedRowId), formData);
          toast.success("Category updated successfully!");
          setCategories((prev) =>
            prev.map((c) => (c.id === Number(selectedRowId) ? updatedCategory : c))
          );
        }
      } else {
        // Banner Form Data
        formData.append("title", formValues.title || "");
        formData.append("redirect_url", formValues.redirect_url || "");
        formData.append("status", formValues.status ? formValues.status.toLowerCase() : "active");

        if (bannerImage) formData.append("image", bannerImage);

        if (formMode === "add") {
          const newBanner = await BannerService.create(formData);
          toast.success("Banner created successfully!");
          setBanners((prev) => [...prev, newBanner]);
        } else {
          const updatedBanner = await BannerService.update(Number(selectedRowId), formData);
          toast.success("Banner updated successfully!");
          setBanners((prev) =>
            prev.map((b) => (b.id === Number(selectedRowId) ? updatedBanner : b))
          );
        }
      }

      setIsFormOpen(false);
      resetFormFiles();
      await fetchAllData();
    } catch (err: any) {
      console.error("Failed to save website config:", err);
      const errMsg = err.response?.data?.detail || err.response?.data?.message || err.message || "Failed to save record";
      toast.error(errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  // --- Dynamic Summary Metrics computation ---

  const getMetrics = () => {
    if (activeTab === 0) {
      const rootCats = categories.filter((c) => c.parent_id === null || c.parent_id === undefined || String(c.parent_id) === "");
      return {
        total: rootCats.length,
        active: rootCats.filter((c) => c.is_active === true || String(c.is_active) === "true").length,
        inactive: rootCats.filter((c) => c.is_active === false || String(c.is_active) === "false").length,
        labelActive: "Active Categories",
        labelInactive: "Inactive Categories",
        labelTotal: "Total Categories",
      };
    } else if (activeTab === 1) {
      const subCats = categories.filter((c) => c.parent_id !== null && c.parent_id !== undefined && String(c.parent_id) !== "");
      return {
        total: subCats.length,
        active: subCats.filter((c) => c.is_active === true || String(c.is_active) === "true").length,
        inactive: subCats.filter((c) => c.is_active === false || String(c.is_active) === "false").length,
        labelActive: "Active Subcategories",
        labelInactive: "Inactive Subcategories",
        labelTotal: "Total Subcategories",
      };
    } else {
      return {
        total: banners.length,
        active: banners.filter((b) => b.status?.toLowerCase() === "active").length,
        inactive: banners.filter((b) => b.status?.toLowerCase() === "inactive").length,
        labelActive: "Active Banners",
        labelInactive: "Inactive Banners",
        labelTotal: "Total Banners",
      };
    }
  };

  const metrics = getMetrics();

  const getTableProps = () => {
    if (activeTab === 0) {
      return {
        data: categories.filter((c) => c.parent_id === null || c.parent_id === undefined || String(c.parent_id) === ""),
        columns: categoryColumns,
        searchFields: ["name", "slug", "description"],
        searchPlaceholder: "Search categories by name or description...",
        minWidth: 1000,
      };
    } else if (activeTab === 1) {
      return {
        data: categories.filter((c) => c.parent_id !== null && c.parent_id !== undefined && String(c.parent_id) !== ""),
        columns: subcategoryColumns,
        searchFields: ["name", "slug", "description"],
        searchPlaceholder: "Search subcategories by name or description...",
        minWidth: 1000,
      };
    } else {
      return {
        data: banners,
        columns: bannerColumns,
        searchFields: ["title", "redirect_url"],
        searchPlaceholder: "Search banners by title or redirect url...",
        minWidth: 800,
      };
    }
  };

  const tableProps = getTableProps();

  const getFilePreview = (file: File | null, existingUrl: string | undefined) => {
    if (file) {
      return URL.createObjectURL(file);
    }
    if (existingUrl) {
      return getImageUrl(existingUrl);
    }
    return "";
  };

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

      {/* Metrics Row */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
              border: "1px solid #EAEAEA",
            }}
          >
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Typography sx={{ color: "#757575", fontSize: "13px", fontWeight: 500 }} gutterBottom>
                {metrics.labelTotal}
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#111827", mt: 0.5 }}>
                {metrics.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
              border: "1px solid #EAEAEA",
            }}
          >
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Typography sx={{ color: "#137333", fontSize: "13px", fontWeight: 500 }} gutterBottom>
                {metrics.labelActive}
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#137333", mt: 0.5 }}>
                {metrics.active}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
              border: "1px solid #EAEAEA",
            }}
          >
            <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
              <Typography sx={{ color: "#C5221F", fontSize: "13px", fontWeight: 500 }} gutterBottom>
                {metrics.labelInactive}
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#C5221F", mt: 0.5 }}>
                {metrics.inactive}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Menu */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #EAEAEA",
          p: 1.5,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: "48px",
            "& .MuiTabs-indicator": {
              backgroundColor: "#635BFF",
              height: "3px",
              borderRadius: "3px",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              color: "#5C6B73",
              px: 3,
              py: 1.5,
              minHeight: "48px",
              transition: "all 0.2s ease",
              "&.Mui-selected": {
                color: "#635BFF",
                fontWeight: 600,
              },
              "&:hover": {
                color: "#635BFF",
                opacity: 0.8,
              },
            },
          }}
        >
          <Tab icon={<CategoryIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Categories" />
          <Tab icon={<CategoryIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Subcategories" />
          <Tab icon={<ViewCarouselIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Banners" />
        </Tabs>
      </Box>

      {/* Custom Data Table */}
      <CustomDataTable
        data={tableProps.data}
        columns={tableProps.columns}
        searchFields={tableProps.searchFields}
        searchPlaceholder={tableProps.searchPlaceholder}
        actions={["edit", "delete"]}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteTrigger}
        minWidth={tableProps.minWidth}
        loading={isLoading}
        toolbarActions={
          <Button
            onClick={handleOpenAdd}
            variant="contained"
            sx={{
              backgroundColor: "#635BFF",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "10px",
              fontSize: "13.5px",
              fontWeight: 600,
              px: 3,
              py: 1,
              width: "auto",
              "&:hover": { backgroundColor: "#4F46E5" },
            }}
          >
            Add {activeTab === 0 ? "Category" : activeTab === 1 ? "Subcategory" : "Banner"}
          </Button>
        }
      />

      {/* Add / Edit Form Dialog Modal */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#111827", pb: 1 }}>
          {formMode === "add" ? "Add New" : "Edit"} {activeTab === 0 ? "Category" : activeTab === 1 ? "Subcategory" : "Banner"}
        </DialogTitle>
        <DialogContent dividers sx={{ borderTop: "1px solid #EAEAEA", borderBottom: "1px solid #EAEAEA", py: 3 }}>
          <Box component="form" onSubmit={handleSaveForm} id="website-crud-form">
            <Grid container spacing={3}>
              {/* Category & Subcategory Form */}
              {(activeTab === 0 || activeTab === 1) && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={activeTab === 0 ? "Category Name" : "Subcategory Name"}
                      placeholder={activeTab === 0 ? "e.g. Dairy & Bakery" : "e.g. Fresh Milk"}
                      value={formValues.name || ""}
                      onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Slug"
                      placeholder={activeTab === 0 ? "e.g. dairy-bakery" : "e.g. fresh-milk"}
                      value={formValues.slug || ""}
                      onChange={(e) => setFormValues({ ...formValues, slug: e.target.value })}
                      required
                    />
                  </Grid>
                  {(activeTab === 1 || (formMode === "edit" && formValues.parent_id)) && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth required>
                        <InputLabel>Parent Category</InputLabel>
                        <Select
                          value={formValues.parent_id !== undefined && formValues.parent_id !== "" ? Number(formValues.parent_id) : ""}
                          label="Parent Category"
                          onChange={(e) => setFormValues({ ...formValues, parent_id: e.target.value })}
                          required
                        >
                          <MenuItem value="" disabled>Select Parent Category</MenuItem>
                          {categories
                            .filter((c) => (c.parent_id === null || c.parent_id === undefined || String(c.parent_id) === "") && c.id !== Number(selectedRowId))
                            .map((c) => (
                              <MenuItem key={c.id} value={c.id}>
                                {c.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Sort Order"
                      value={formValues.sort_order || 0}
                      onChange={(e) => setFormValues({ ...formValues, sort_order: Number(e.target.value) })}
                      required
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Description"
                      placeholder="Enter description of the category..."
                      value={formValues.description || ""}
                      onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.is_active || "true"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, is_active: e.target.value })}
                      >
                        <MenuItem value="true">Active</MenuItem>
                        <MenuItem value="false">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {activeTab === 1 && (
                    <>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Price"
                          placeholder="e.g. 499"
                          value={formValues.price !== undefined ? formValues.price : ""}
                          onChange={(e) => setFormValues({ ...formValues, price: e.target.value !== "" ? Number(e.target.value) : "" })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Discount Price"
                          placeholder="e.g. 399"
                          value={formValues.discount_price !== undefined ? formValues.discount_price : ""}
                          onChange={(e) => setFormValues({ ...formValues, discount_price: e.target.value !== "" ? Number(e.target.value) : "" })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          label="Location"
                          placeholder="e.g. Hyderabad"
                          value={formValues.location || ""}
                          onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                        />
                      </Grid>

                      {/* Multiple Description Sections */}
                      <Grid size={12}>
                        <Box sx={{ border: "1px solid #EAEAEA", borderRadius: "12px", p: 2, mt: 1, bgcolor: "#FAFAFA" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#374151", mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Description Sections (View Details popup content)</span>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                const currentSections = formValues.description_sections || [];
                                setFormValues({
                                  ...formValues,
                                  description_sections: [...currentSections, { header: "", details: [] }]
                                });
                              }}
                              sx={{ textTransform: "none" }}
                            >
                              Add Description Section
                            </Button>
                          </Typography>

                          {(formValues.description_sections || []).length === 0 ? (
                            <Typography variant="body2" sx={{ color: "#757575", fontStyle: "italic", textAlign: "center", py: 2 }}>
                              No description sections added. Click button to add dynamic sections (e.g. "What we provide", "Benefits", "How it works").
                            </Typography>
                          ) : (
                            <Stack spacing={2}>
                              {(formValues.description_sections || []).map((sec: any, idx: number) => (
                                <Box key={idx} sx={{ border: "1px solid #D1D5DB", borderRadius: "8px", p: 2, bgcolor: "#FFFFFF", position: "relative" }}>
                                  <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 10 }}>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Section Header"
                                        placeholder="e.g. What we provide, Benefits, How it works"
                                        value={sec.header || ""}
                                        onChange={(e) => {
                                          const updated = [...(formValues.description_sections || [])];
                                          updated[idx].header = e.target.value;
                                          setFormValues({ ...formValues, description_sections: updated });
                                        }}
                                        required
                                      />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 2 }} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                      <Button
                                        color="error"
                                        size="small"
                                        onClick={() => {
                                          const updated = (formValues.description_sections || []).filter((_: any, i: number) => i !== idx);
                                          setFormValues({ ...formValues, description_sections: updated });
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Grid>
                                    <Grid size={12}>
                                      <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        size="small"
                                        label="Section Details (one bullet point per line)"
                                        placeholder="Trained and certified professionals&#10;100% hygienic and sanitized equipment&#10;Premium quality products"
                                        value={Array.isArray(sec.details) ? sec.details.join("\n") : (sec.details || "")}
                                        onChange={(e) => {
                                          const lines = e.target.value.split("\n").filter(line => line.trim() !== "");
                                          const updated = [...(formValues.description_sections || [])];
                                          updated[idx].details = lines;
                                          setFormValues({ ...formValues, description_sections: updated });
                                        }}
                                        required
                                      />
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))}
                            </Stack>
                          )}
                        </Box>
                      </Grid>
                    </>
                  )}

                  {/* File Uploads for Category */}
                  <Grid size={12}>
                    <Typography variant="subtitle2" sx={{ color: "#374151", mb: 1, fontWeight: 600 }}>
                      Category Images
                    </Typography>
                    <Grid container spacing={3}>
                      {/* Image Upload */}
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box
                          sx={{
                            border: "1px dashed #D1D5DB",
                            borderRadius: "12px",
                            p: 2,
                            textAlign: "center",
                            bgcolor: "#FAFAFA",
                            cursor: "pointer",
                            position: "relative",
                            minHeight: "160px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          component="label"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setCategoryImage(e.target.files[0]);
                              }
                            }}
                          />
                          {getFilePreview(categoryImage, formValues.image) ? (
                            <Box
                              component="img"
                              src={getFilePreview(categoryImage, formValues.image)}
                              sx={{ width: "100%", height: 100, objectFit: "cover", borderRadius: "8px" }}
                            />
                          ) : (
                            <>
                              <CloudUploadIcon sx={{ color: "#9CA3AF", fontSize: 36, mb: 1 }} />
                              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                                Category Image
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Grid>

                      {/* Icon Upload */}
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box
                          sx={{
                            border: "1px dashed #D1D5DB",
                            borderRadius: "12px",
                            p: 2,
                            textAlign: "center",
                            bgcolor: "#FAFAFA",
                            cursor: "pointer",
                            position: "relative",
                            minHeight: "160px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          component="label"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setCategoryIcon(e.target.files[0]);
                              }
                            }}
                          />
                          {getFilePreview(categoryIcon, formValues.icon) ? (
                            <Box
                              component="img"
                              src={getFilePreview(categoryIcon, formValues.icon)}
                              sx={{ width: 60, height: 60, objectFit: "cover", borderRadius: "50%" }}
                            />
                          ) : (
                            <>
                              <CloudUploadIcon sx={{ color: "#9CA3AF", fontSize: 36, mb: 1 }} />
                              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                                Category Icon
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Grid>

                      {/* Banner Image Upload */}
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Box
                          sx={{
                            border: "1px dashed #D1D5DB",
                            borderRadius: "12px",
                            p: 2,
                            textAlign: "center",
                            bgcolor: "#FAFAFA",
                            cursor: "pointer",
                            position: "relative",
                            minHeight: "160px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          component="label"
                        >
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setCategoryBannerImage(e.target.files[0]);
                              }
                            }}
                          />
                          {getFilePreview(categoryBannerImage, formValues.banner_image) ? (
                            <Box
                              component="img"
                              src={getFilePreview(categoryBannerImage, formValues.banner_image)}
                              sx={{ width: "100%", height: 100, objectFit: "cover", borderRadius: "8px" }}
                            />
                          ) : (
                            <>
                              <CloudUploadIcon sx={{ color: "#9CA3AF", fontSize: 36, mb: 1 }} />
                              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                                Banner Image
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Banner Form */}
              {activeTab === 2 && (
                <>
                  <Grid size={12}>
                    <TextField
                      fullWidth
                      label="Banner Title"
                      placeholder="e.g. Mega Discount Offer"
                      value={formValues.title || ""}
                      onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Redirect URL"
                      placeholder="e.g. /categories/electronics"
                      value={formValues.redirect_url || ""}
                      onChange={(e) => setFormValues({ ...formValues, redirect_url: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formValues.status ? formValues.status.toLowerCase() : "active"}
                        label="Status"
                        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Banner Image Upload */}
                  <Grid size={12}>
                    <Typography variant="subtitle2" sx={{ color: "#374151", mb: 1, fontWeight: 600 }}>
                      Banner Image File
                    </Typography>
                    <Box
                      sx={{
                        border: "1px dashed #D1D5DB",
                        borderRadius: "12px",
                        p: 3,
                        textAlign: "center",
                        bgcolor: "#FAFAFA",
                        cursor: "pointer",
                        position: "relative",
                        minHeight: "180px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      component="label"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setBannerImage(e.target.files[0]);
                          }
                        }}
                      />
                      {getFilePreview(bannerImage, formValues.image_path || formValues.image) ? (
                        <Box
                          component="img"
                          src={getFilePreview(bannerImage, formValues.image_path || formValues.image)}
                          sx={{ width: "100%", maxHeight: 150, objectFit: "contain", borderRadius: "8px" }}
                        />
                      ) : (
                        <>
                          <CloudUploadIcon sx={{ color: "#9CA3AF", fontSize: 44, mb: 1 }} />
                          <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
                            Click to upload or drag image here
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                            PNG, JPG, JPEG up to 5MB
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={() => setIsFormOpen(false)}
            variant="outlined"
            disabled={isSaving}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              color: "#374151",
              borderColor: "#D1D5DB",
              "&:hover": { borderColor: "#9CA3AF" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="website-crud-form"
            variant="contained"
            disabled={isSaving}
            sx={{
              backgroundColor: "#635BFF",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              "&:hover": { backgroundColor: "#4F46E5" },
            }}
          >
            {isSaving ? "Saving..." : "Save Record"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedRowId(null);
        }}
        onConfirm={executeDelete}
        loading={isDeleting}
      />
    </Box>
  );
}
