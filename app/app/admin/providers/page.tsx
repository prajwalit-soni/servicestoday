"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import AdminBreadcrumbs from "../components/AdminBreadcrumbs";
import CustomDataTable from "../components/CustomDataTable";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import axiosClient from "../../lib/api";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ServiceProviderData {
  id: number;
  user_id: number;
  category_id: number | null;
  business_name: string;
  experience: number | null;
  rating: number;
  is_verified: boolean;
  latitude: number | null;
  longitude: number | null;
  about: string | null;
  profile_image_path: string | null;
  shop_image_path: string | null;
  phone?: string;
  email?: string;
  address?: string;
  gallery_images?: string[];
  services?: Array<{ name: string; price: number; description: string }>;
  availabilities?: Array<{ day: string; start: string; end: string }>;
  why_choose_us?: string;
  bank_name?: string;
  branch_name?: string;
  account_holder?: string;
  account_number?: string;
  ifsc_code?: string;
  account_type?: string;
}

export default function AdminProvidersPage() {
  const [providers, setProviders] = useState<ServiceProviderData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal State Hooks
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [editingProvider, setEditingProvider] = useState<ServiceProviderData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // File Upload states
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [shopImageFile, setShopImageFile] = useState<File | null>(null);
  const [galleryImg1File, setGalleryImg1File] = useState<File | null>(null);
  const [galleryImg2File, setGalleryImg2File] = useState<File | null>(null);
  const [galleryImg3File, setGalleryImg3File] = useState<File | null>(null);

  // Sub-lists States for dialog
  const [servicesOffered, setServicesOffered] = useState<Array<{ name: string; price: string; description: string }>>([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDesc, setNewServiceDesc] = useState("");

  const [operatingHours, setOperatingHours] = useState<Array<{ day: string; start: string; end: string }>>([
    { day: "Monday", start: "09:00", end: "21:00" },
    { day: "Tuesday", start: "09:00", end: "21:00" },
    { day: "Wednesday", start: "09:00", end: "21:00" },
    { day: "Thursday", start: "09:00", end: "21:00" },
    { day: "Friday", start: "09:00", end: "21:00" },
    { day: "Saturday", start: "10:00", end: "20:00" },
    { day: "Sunday", start: "10:00", end: "18:00" },
  ]);

  const [whyChooseUs, setWhyChooseUs] = useState<Array<{ title: string; subtitle: string; icon: string }>>([
    { title: "15+ Years", subtitle: "In Business", icon: "business" },
    { title: "10,000+", subtitle: "Happy Customers", icon: "customers" },
    { title: "Certified", subtitle: "Licensed Professionals", icon: "certified" },
  ]);

  // Form State for Add / Edit
  const [formValues, setFormValues] = useState({
    user_id: 101,
    category_id: "",
    business_name: "",
    experience: 5,
    latitude: 17.385,
    longitude: 78.486,
    about: "",
    rating: 4.5,
    is_verified: true,
    phone: "8234567890",
    email: "info@provider.com",
    address: "Hyderabad",
    bank_name: "",
    branch_name: "",
    account_holder: "",
    account_number: "",
    ifsc_code: "",
    account_type: "Current",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get("/public/categories");
      if (res.data?.success && Array.isArray(res.data?.data)) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  // Fetch providers
  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/admin/providers", {
        params: { limit: 100 },
      });
      if (res.data?.success && Array.isArray(res.data?.data)) {
        setProviders(res.data.data);
      }
    } catch (error: any) {
      console.error("Failed to load providers:", error);
      const errMsg = error.response?.data?.detail || error.message || "Failed to load providers list";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProviders();
  }, []);

  const clearFiles = () => {
    setProfileImageFile(null);
    setShopImageFile(null);
    setGalleryImg1File(null);
    setGalleryImg2File(null);
    setGalleryImg3File(null);
  };

  const handleEditProvider = (id: string | number) => {
    const idNum = Number(id);
    const provider = providers.find((p) => p.id === idNum);
    if (provider) {
      setEditingProvider(provider);
      clearFiles();
      setFormValues({
        user_id: provider.user_id,
        category_id: provider.category_id ? String(provider.category_id) : "",
        business_name: provider.business_name,
        experience: provider.experience || 0,
        latitude: provider.latitude || 17.385,
        longitude: provider.longitude || 78.486,
        about: provider.about || "",
        rating: provider.rating || 4.5,
        is_verified: provider.is_verified,
        phone: provider.phone || "",
        email: provider.email || "",
        address: provider.address || "",
        bank_name: provider.bank_name || "",
        branch_name: provider.branch_name || "",
        account_holder: provider.account_holder || "",
        account_number: provider.account_number || "",
        ifsc_code: provider.ifsc_code || "",
        account_type: provider.account_type || "Current",
      });

      // Load nested lists
      if (provider.services) {
        setServicesOffered(provider.services.map(s => ({
          name: s.name,
          price: String(s.price),
          description: s.description
        })));
      } else {
        setServicesOffered([]);
      }

      if (provider.availabilities && provider.availabilities.length > 0) {
        setOperatingHours(provider.availabilities);
      } else {
        setOperatingHours([
          { day: "Monday", start: "09:00", end: "21:00" },
          { day: "Tuesday", start: "09:00", end: "21:00" },
          { day: "Wednesday", start: "09:00", end: "21:00" },
          { day: "Thursday", start: "09:00", end: "21:00" },
          { day: "Friday", start: "09:00", end: "21:00" },
          { day: "Saturday", start: "10:00", end: "20:00" },
          { day: "Sunday", start: "10:00", end: "18:00" },
        ]);
      }

      if (provider.why_choose_us) {
        try {
          setWhyChooseUs(JSON.parse(provider.why_choose_us));
        } catch (e) {
          setWhyChooseUs([
            { title: "15+ Years", subtitle: "In Business", icon: "business" },
            { title: "10,000+", subtitle: "Happy Customers", icon: "customers" },
            { title: "Certified", subtitle: "Licensed Professionals", icon: "certified" },
          ]);
        }
      } else {
        setWhyChooseUs([
          { title: "15+ Years", subtitle: "In Business", icon: "business" },
          { title: "10,000+", subtitle: "Happy Customers", icon: "customers" },
          { title: "Certified", subtitle: "Licensed Professionals", icon: "certified" },
        ]);
      }

      setIsEditModalOpen(true);
    }
  };

  const handleDeleteTrigger = (id: string | number) => {
    setSelectedProviderId(String(id));
    setIsDeleteOpen(true);
  };

  const handleExecuteDelete = async () => {
    if (!selectedProviderId) return;

    setIsDeleting(true);
    try {
      const idNum = Number(selectedProviderId);
      await axiosClient.delete(`/admin/providers/${idNum}`);
      setProviders((prev) => prev.filter((p) => p.id !== idNum));
      toast.success("Service Provider deleted successfully!");
      setIsDeleteOpen(false);
      setSelectedProviderId(null);
    } catch (error: any) {
      console.error(error);
      const errMsg = error.response?.data?.detail || error.message || "Failed to delete service provider";
      toast.error(errMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  // Add / Delete service helper
  const addService = () => {
    if (!newServiceName || !newServicePrice) {
      toast.error("Service Name and Price are required");
      return;
    }
    setServicesOffered(prev => [
      ...prev,
      { name: newServiceName, price: newServicePrice, description: newServiceDesc || "Professional service package" }
    ]);
    setNewServiceName("");
    setNewServicePrice("");
    setNewServiceDesc("");
  };

  const removeService = (index: number) => {
    setServicesOffered(prev => prev.filter((_, idx) => idx !== index));
  };

  // Operating Hours helper
  const updateHour = (index: number, field: "start" | "end", value: string) => {
    setOperatingHours(prev => prev.map((h, idx) => idx === index ? { ...h, [field]: value } : h));
  };

  // Why choose us helper
  const updateWhyChooseUs = (index: number, field: "title" | "subtitle", value: string) => {
    setWhyChooseUs(prev => prev.map((w, idx) => idx === index ? { ...w, [field]: value } : w));
  };

  const cleanAssetUrl = (url: string | null) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const base = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    return `${base.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  };

  const handleFormSubmit = async (e: React.FormEvent, mode: "add" | "edit", onClose: () => void) => {
    e.preventDefault();
    if (!formValues.business_name) {
      toast.error("Business name is required");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("user_id", String(formValues.user_id));
      formData.append("business_name", formValues.business_name);
      if (formValues.category_id) {
        formData.append("category_id", String(formValues.category_id));
      }
      formData.append("experience", String(formValues.experience));
      formData.append("latitude", String(formValues.latitude));
      formData.append("longitude", String(formValues.longitude));
      formData.append("about", formValues.about);
      formData.append("rating", String(formValues.rating));
      formData.append("is_verified", String(formValues.is_verified));
      formData.append("phone", formValues.phone);
      formData.append("email", formValues.email);
      formData.append("address", formValues.address);
      if (formValues.bank_name) formData.append("bank_name", formValues.bank_name);
      if (formValues.branch_name) formData.append("branch_name", formValues.branch_name);
      if (formValues.account_holder) formData.append("account_holder", formValues.account_holder);
      if (formValues.account_number) formData.append("account_number", formValues.account_number);
      if (formValues.ifsc_code) formData.append("ifsc_code", formValues.ifsc_code);
      if (formValues.account_type) formData.append("account_type", formValues.account_type);

      // JSON stringified lists
      formData.append("services", JSON.stringify(servicesOffered));
      formData.append("availabilities", JSON.stringify(operatingHours));
      formData.append("why_choose_us", JSON.stringify(whyChooseUs));

      if (profileImageFile) {
        formData.append("profile_image", profileImageFile);
      }
      if (shopImageFile) {
        formData.append("shop_image", shopImageFile);
      }
      if (galleryImg1File) {
        formData.append("gallery_img_1", galleryImg1File);
      }
      if (galleryImg2File) {
        formData.append("gallery_img_2", galleryImg2File);
      }
      if (galleryImg3File) {
        formData.append("gallery_img_3", galleryImg3File);
      }

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      if (mode === "add") {
        await axiosClient.post("/admin/providers", formData, config);
        toast.success("Service Provider added successfully!");
      } else if (mode === "edit" && editingProvider) {
        await axiosClient.put(`/admin/providers/${editingProvider.id}`, formData, config);
        toast.success("Service Provider updated successfully!");
      }
      fetchProviders();
      onClose();
    } catch (error: any) {
      console.error(error);
      const errMsg = error.response?.data?.detail || error.message || "Failed to save service provider";
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Columns Configuration for Service Providers
  const columns = [
    { id: "id", label: "ID", width: "80px" },
    {
      id: "business_name",
      label: "Provider Info",
      width: "250px",
      render: (row: ServiceProviderData) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar 
            src={cleanAssetUrl(row.profile_image_path) || undefined} 
            sx={{ width: 36, height: 36, bgcolor: "#635BFF", fontSize: "15px" }}
          >
            {row.business_name ? row.business_name.charAt(0).toUpperCase() : "?"}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: "#212121" }}>
              {row.business_name}
            </Typography>
            <Typography sx={{ fontSize: "11px", color: "#757575", mt: 0.2 }}>
              Experience: {row.experience || 0} years
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: "category",
      label: "Category",
      width: "150px",
      render: (row: ServiceProviderData) => {
        const cat = categories.find((c) => c.id === row.category_id);
        return (
          <Typography sx={{ fontSize: "13.5px", fontWeight: 500, color: "#374151" }}>
            {cat ? cat.name : "Unassigned"}
          </Typography>
        );
      },
    },
    {
      id: "rating",
      label: "Rating",
      width: "100px",
      render: (row: ServiceProviderData) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography sx={{ fontSize: "13.5px", fontWeight: 600, color: "#B45309" }}>
            ⭐ {row.rating ? row.rating.toFixed(1) : "0.0"}
          </Typography>
        </Box>
      ),
    },
    {
      id: "is_verified",
      label: "Verification Status",
      width: "150px",
      render: (row: ServiceProviderData) => (
        <Box
          sx={{
            display: "inline-block",
            px: 1.5,
            py: 0.4,
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 600,
            bgcolor: row.is_verified ? "#E6F4EA" : "#FCE8E6",
            color: row.is_verified ? "#137333" : "#C5221F",
          }}
        >
          {row.is_verified ? "Verified" : "Pending"}
        </Box>
      ),
    },
  ];

  const filteredProviders = providers.filter((p) => {
    if (categoryFilter === "all") return true;
    return String(p.category_id) === categoryFilter;
  });

  const categoryFilterSelector = (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="category-filter-label" sx={{ fontSize: "13px", fontWeight: 500 }}>
        Category Filter
      </InputLabel>
      <Select
        labelId="category-filter-label"
        id="category-filter"
        value={categoryFilter}
        label="Category Filter"
        onChange={(e) => setCategoryFilter(e.target.value)}
        sx={{
          borderRadius: "20px",
          bgcolor: "#FAFAFA",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        <MenuItem value="all">All Categories</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={String(cat.id)}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderForm = (mode: "add" | "edit", onClose: () => void) => (
    <Box component="form" onSubmit={(e) => handleFormSubmit(e, mode, onClose)}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#1a1a1a" }}>
        {mode === "add" ? "Register New Service Provider" : "Update Provider Profile"}
      </Typography>

      <DialogContent dividers sx={{ maxHeight: "65vh", overflowY: "auto", px: 1 }}>
        <Grid container spacing={2.5}>
          {/* General Fields Section */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#635BFF", mb: 1 }}>
              General Information
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Business Name"
              name="business_name"
              value={formValues.business_name}
              onChange={handleFormChange}
              placeholder="e.g. Perfect Plumbing Solutions"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="form-category-label">Category</InputLabel>
              <Select
                labelId="form-category-label"
                id="form-category"
                value={formValues.category_id}
                label="Category"
                onChange={(e) => handleSelectChange("category_id", e.target.value)}
              >
                <MenuItem value="">Unassigned</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="User Owner ID"
              name="user_id"
              value={formValues.user_id}
              onChange={handleFormChange}
              placeholder="Owner ID"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Years of Experience"
              name="experience"
              value={formValues.experience}
              onChange={handleFormChange}
              placeholder="e.g. 5"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              inputProps={{ step: "0.1" }}
              label="Rating (⭐)"
              name="rating"
              value={formValues.rating}
              onChange={handleFormChange}
              placeholder="e.g. 4.5"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Contact Number"
              name="phone"
              value={formValues.phone}
              onChange={handleFormChange}
              placeholder="e.g. 8234567890"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formValues.email}
              onChange={handleFormChange}
              placeholder="e.g. info@provider.com"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Business Location Address"
              name="address"
              value={formValues.address}
              onChange={handleFormChange}
              placeholder="e.g. Banjara Hills, Hyderabad"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              inputProps={{ step: "any" }}
              label="Latitude"
              name="latitude"
              value={formValues.latitude}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              inputProps={{ step: "any" }}
              label="Longitude"
              name="longitude"
              value={formValues.longitude}
              onChange={handleFormChange}
            />
          </Grid>

          {/* Banking Details Section */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#635BFF", mb: 1 }}>
              Banking Details
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bank_name"
              value={formValues.bank_name || ""}
              onChange={handleFormChange}
              placeholder="e.g. State Bank of India"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Branch Name"
              name="branch_name"
              value={formValues.branch_name || ""}
              onChange={handleFormChange}
              placeholder="e.g. Main Branch"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Account Holder Name"
              name="account_holder"
              value={formValues.account_holder || ""}
              onChange={handleFormChange}
              placeholder="Holder Name"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Account Number"
              name="account_number"
              value={formValues.account_number || ""}
              onChange={handleFormChange}
              placeholder="Account Number"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="IFSC Code"
              name="ifsc_code"
              value={formValues.ifsc_code || ""}
              onChange={handleFormChange}
              placeholder="IFSC Code"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="form-account-type-label">Account Type</InputLabel>
              <Select
                labelId="form-account-type-label"
                id="form-account-type"
                value={formValues.account_type || "Current"}
                label="Account Type"
                onChange={(e) => handleSelectChange("account_type", e.target.value)}
              >
                <MenuItem value="Savings">Savings</MenuItem>
                <MenuItem value="Current">Current</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Upload & Previews Section */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#635BFF", mb: 1 }}>
              Cover & Profile Images
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{ py: 1.5, borderRadius: "8px", borderStyle: "dashed" }}
              >
                {profileImageFile ? `Profile Selected` : "Upload Profile Image"}
                <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, setProfileImageFile)} />
              </Button>
              {mode === "edit" && editingProvider?.profile_image_path && (
                <Avatar src={cleanAssetUrl(editingProvider.profile_image_path)} sx={{ width: 44, height: 44 }} />
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{ py: 1.5, borderRadius: "8px", borderStyle: "dashed" }}
              >
                {shopImageFile ? `Cover Selected` : "Upload Shop Cover Image"}
                <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, setShopImageFile)} />
              </Button>
              {mode === "edit" && editingProvider?.shop_image_path && (
                <Avatar variant="square" src={cleanAssetUrl(editingProvider.shop_image_path)} sx={{ width: 44, height: 44, borderRadius: 1 }} />
              )}
            </Box>
          </Grid>

          {/* Up to 3 gallery image uploads */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: "#635BFF" }}>
              Gallery Images (Maximum 3)
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    sx={{ py: 1, borderRadius: "8px", borderStyle: "dashed", fontSize: "0.75rem" }}
                  >
                    {galleryImg1File ? `Image 1 Chosen` : "Gallery Image 1"}
                    <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, setGalleryImg1File)} />
                  </Button>
                  {mode === "edit" && editingProvider?.gallery_images?.[0] && (
                    <img src={cleanAssetUrl(editingProvider.gallery_images[0])} alt="Gallery 1" style={{ width: "auto", height: 45, borderRadius: 4 }} />
                  )}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    sx={{ py: 1, borderRadius: "8px", borderStyle: "dashed", fontSize: "0.75rem" }}
                  >
                    {galleryImg2File ? `Image 2 Chosen` : "Gallery Image 2"}
                    <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, setGalleryImg2File)} />
                  </Button>
                  {mode === "edit" && editingProvider?.gallery_images?.[1] && (
                    <img src={cleanAssetUrl(editingProvider.gallery_images[1])} alt="Gallery 2" style={{ width: "auto", height: 45, borderRadius: 4 }} />
                  )}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    sx={{ py: 1, borderRadius: "8px", borderStyle: "dashed", fontSize: "0.75rem" }}
                  >
                    {galleryImg3File ? `Image 3 Chosen` : "Gallery Image 3"}
                    <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, setGalleryImg3File)} />
                  </Button>
                  {mode === "edit" && editingProvider?.gallery_images?.[2] && (
                    <img src={cleanAssetUrl(editingProvider.gallery_images[2])} alt="Gallery 3" style={{ width: "auto", height: 45, borderRadius: 4 }} />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Services Offered Section */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#635BFF", mb: 1 }}>
              Services Offered
            </Typography>
            <Paper elevation={1} sx={{ p: 2, bgcolor: "#FAFAFA", borderRadius: "12px", mb: 2 }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Service Name"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="e.g. Deep Home Cleaning"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <TextField
                    size="small"
                    fullWidth
                    type="number"
                    label="Price (₹)"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    placeholder="e.g. 1499"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Description"
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    placeholder="e.g. Professional cleaning"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 1 }} sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton color="primary" onClick={addService}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>

              {servicesOffered.length === 0 ? (
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>No services configured. Defaults will be used on user detail page.</Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {servicesOffered.map((item, idx) => (
                    <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "white", p: 1, borderRadius: 1, border: "1px solid #E5E7EB" }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.name} - ₹{item.price}</Typography>
                        <Typography variant="caption" sx={{ color: "#4B5563" }}>{item.description}</Typography>
                      </Box>
                      <IconButton size="small" color="error" onClick={() => removeService(idx)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Operating Hours Section */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#635BFF", mb: 1 }}>
              Operating Hours
            </Typography>
            <Paper elevation={1} sx={{ p: 2, bgcolor: "#FAFAFA", borderRadius: "12px", mb: 2 }}>
              <Grid container spacing={2}>
                {operatingHours.map((item, idx) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={idx} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography sx={{ minWidth: 90, fontSize: "13px", fontWeight: 600 }}>{item.day}</Typography>
                    <TextField
                      size="small"
                      label="Start Time"
                      value={item.start}
                      onChange={(e) => updateHour(idx, "start", e.target.value)}
                      placeholder="09:00"
                    />
                    <TextField
                      size="small"
                      label="End Time"
                      value={item.end}
                      onChange={(e) => updateHour(idx, "end", e.target.value)}
                      placeholder="21:00"
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Why Choose Us Section */}
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#635BFF", mb: 1 }}>
              Why Choose Us Points
            </Typography>
            <Paper elevation={1} sx={{ p: 2, bgcolor: "#FAFAFA", borderRadius: "12px", mb: 2 }}>
              <Grid container spacing={2}>
                {whyChooseUs.map((item, idx) => (
                  <Grid size={{ xs: 12 }} key={idx} sx={{ display: "flex", gap: 2 }}>
                    <Typography sx={{ minWidth: 100, alignSelf: "center", fontSize: "13px", fontWeight: 600 }}>Point {idx + 1}</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      label="Title (e.g. 15+ Years)"
                      value={item.title}
                      onChange={(e) => updateWhyChooseUs(idx, "title", e.target.value)}
                    />
                    <TextField
                      size="small"
                      fullWidth
                      label="Subtitle (e.g. In Business)"
                      value={item.subtitle}
                      onChange={(e) => updateWhyChooseUs(idx, "subtitle", e.target.value)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="About Description"
              name="about"
              value={formValues.about}
              onChange={handleFormChange}
              placeholder="Detail about the services offered, licensing, specialities..."
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.is_verified}
                  onChange={handleSwitchChange}
                  name="is_verified"
                  color="primary"
                />
              }
              label="Is Profile Verified (Verification Badge)"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 2, px: 1 }}>
        <Button variant="outlined" onClick={onClose} sx={{ borderRadius: "20px" }}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          variant="contained"
          sx={{ bgcolor: "#635BFF", color: "#FFFFFF", borderRadius: "20px", "&:hover": { bgcolor: "#4F46E5" } }}
        >
          {submitting ? "Saving..." : "Save Provider"}
        </Button>
      </Box>
    </Box>
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
      <AdminBreadcrumbs />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedProviderId(null);
        }}
        onConfirm={handleExecuteDelete}
        loading={isDeleting}
      />

      {/* Edit Dialog */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProvider(null);
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
        {editingProvider && renderForm("edit", () => setIsEditModalOpen(false))}
      </Dialog>

      {/* Core Custom Table */}
      <CustomDataTable
        data={filteredProviders}
        columns={columns}
        searchFields={["business_name", "about"]}
        searchPlaceholder="Search providers..."
        actions={["edit", "delete"]}
        onEdit={handleEditProvider}
        onDelete={handleDeleteTrigger}
        loading={loading}
        toolbarActions={categoryFilterSelector}
        addForm={(onClose) => {
          // Initialize values for addition form
          React.useEffect(() => {
            clearFiles();
            setServicesOffered([]);
            setOperatingHours([
              { day: "Monday", start: "09:00", end: "21:00" },
              { day: "Tuesday", start: "09:00", end: "21:00" },
              { day: "Wednesday", start: "09:00", end: "21:00" },
              { day: "Thursday", start: "09:00", end: "21:00" },
              { day: "Friday", start: "09:00", end: "21:00" },
              { day: "Saturday", start: "10:00", end: "20:00" },
              { day: "Sunday", start: "10:00", end: "18:00" },
            ]);
            setWhyChooseUs([
              { title: "15+ Years", subtitle: "In Business", icon: "business" },
              { title: "10,000+", subtitle: "Happy Customers", icon: "customers" },
              { title: "Certified", subtitle: "Licensed Professionals", icon: "certified" },
            ]);
            setFormValues({
              user_id: 101,
              category_id: "",
              business_name: "",
              experience: 5,
              latitude: 17.385,
              longitude: 78.486,
              about: "",
              rating: 4.5,
              is_verified: true,
              phone: "8234567890",
              email: "info@provider.com",
              address: "Hyderabad",
              bank_name: "",
              branch_name: "",
              account_holder: "",
              account_number: "",
              ifsc_code: "",
              account_type: "Current",
            });
          }, []);
          return renderForm("add", onClose);
        }}
      />
    </Box>
  );
}
