"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Grid, Select, MenuItem, FormControl, InputLabel, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import axiosClient from "../../lib/api";
import { useAuthStore } from "../../store/useAuthStore";

// Validation Schema for VendorRegister
const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  role: Yup.string().required("Account type is required"),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

const commonTextFieldProps = {
  variant: "standard" as const,
  fullWidth: true,
  margin: "normal" as const,
  InputLabelProps: { shrink: true },
  sx: {
    mb: 2,
    "& .MuiInputLabel-root": {
      color: "#9CA3AF",
      fontWeight: 600,
      fontSize: "14px",
    },
  },
};

const renderSelectPlaceholder = (value: unknown, placeholder: string, list: { id: any; title: string }[]) => {
  if (value !== "" && value !== undefined && value !== null) {
    const matched = list.find((item) => String(item.id) === String(value));
    if (matched) return matched.title;
    return String(value);
  }

  return (
    <Box component="span" sx={{ color: "#9CA3AF" }}>
      {placeholder}
    </Box>
  );
};

const occupations = [
  { id: 1, name: "Farmer" },
  { id: 2, name: "Teacher" },
  { id: 3, name: "Business" },
  { id: 4, name: "Other" },
];

export default function VendorRegister() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");

  // Cascading lists states
  const [statesList, setStatesList] = useState<{ state_title: string; state_id: number }[]>([]);
  const [districtsList, setDistrictsList] = useState<{ district_title: string; districtid: number }[]>([]);
  const [citiesList, setCitiesList] = useState<{ name: string; id: number }[]>([]);
  const [wardsList, setWardsList] = useState<{ city_ward_name: string; id: number }[]>([]);
  const [blocksList, setBlocksList] = useState<{ vikas_khand_name: string; id: number }[]>([]);
  const [panchayatsList, setPanchayatsList] = useState<{ panchayat_name: string; id: number }[]>([]);
  const [villagesList, setVillagesList] = useState<{ villages_name: string; id: number }[]>([]);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axiosClient.get("/states/");
        setStatesList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, []);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      area_type: "urban",
      state_id: "",
      district_id: "",
      city_id: "",
      ward_id: "",
      state_id_r: "",
      district_id_r: "",
      vikas_khand_id: "",
      gram_panchayat_id: "",
      gram_id: "",
      address: "",
      pin_no: "",
      occupation_id: "",
      latitude: "",
      longitude: "",
      password: "",
      role: "vendor",
      agreeTerms: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const isUrban = values.area_type === "urban";
      const selectedStateId = isUrban ? parseInt(values.state_id) : parseInt(values.state_id_r);
      const selectedDistrictId = isUrban ? parseInt(values.district_id) : parseInt(values.district_id_r);

      const selectedPanchayatName = !isUrban
        ? panchayatsList.find((p) => String(p.id) === String(values.gram_panchayat_id))?.panchayat_name || ""
        : "";

      const registerPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        is_active: true,
        role: values.role || "vendor",
        state_id: selectedStateId || 1,
        district_id: selectedDistrictId || 1,
        city_id: isUrban ? parseInt(values.city_id) || 1 : 1,
        ward_id: isUrban ? parseInt(values.ward_id) || 1 : 1,
        gram_panchayat: isUrban ? "N/A" : selectedPanchayatName || "N/A",
        address: values.address,
        pin_no: values.pin_no,
        occupation_id: parseInt(values.occupation_id) || 1,
        area_type: values.area_type,
        latitude: parseFloat(values.latitude) || 23.5,
        longitude: parseFloat(values.longitude) || 77.4,
        vikas_khand_id: !isUrban ? parseInt(values.vikas_khand_id) || 1 : 1,
        gram_panchayat_id: !isUrban ? parseInt(values.gram_panchayat_id) || 1 : 1,
        gram_id: !isUrban ? parseInt(values.gram_id) || 1 : 1,
      };

      const result = await register(registerPayload);
      if (result.success) {
        toast.success(`${values.role === "partner" ? "Partner" : "Vendor"} registered successfully!`);
        router.push("/auth/login");
      } else {
        toast.error(result.error || `${values.role === "partner" ? "Partner" : "Vendor"} registration failed`);
      }
    },
  });

  const handleStateChange = async (stateId: string) => {
    const isUrban = formik.values.area_type === "urban";
    const stateIdNum = parseInt(stateId);

    if (isUrban) {
      formik.setFieldValue("state_id", stateId);
      formik.setFieldValue("district_id", "");
      formik.setFieldValue("city_id", "");
      formik.setFieldValue("ward_id", "");
    } else {
      formik.setFieldValue("state_id_r", stateId);
      formik.setFieldValue("district_id_r", "");
      formik.setFieldValue("vikas_khand_id", "");
      formik.setFieldValue("gram_panchayat_id", "");
      formik.setFieldValue("gram_id", "");
    }

    setDistrictsList([]);
    setCitiesList([]);
    setWardsList([]);
    setBlocksList([]);
    setPanchayatsList([]);
    setVillagesList([]);

    if (stateIdNum) {
      try {
        const res = await axiosClient.get(`/api/districts?page=1&limit=1000&state_id=${stateIdNum}&status=1`);
        setDistrictsList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching districts:", err);
      }
    }
  };

  const handleDistrictChange = async (districtId: string) => {
    const isUrban = formik.values.area_type === "urban";
    const districtIdNum = parseInt(districtId);
    const currentStateId = parseInt(isUrban ? formik.values.state_id : formik.values.state_id_r);

    if (isUrban) {
      formik.setFieldValue("district_id", districtId);
      formik.setFieldValue("city_id", "");
      formik.setFieldValue("ward_id", "");
      setCitiesList([]);
      setWardsList([]);

      if (districtIdNum) {
        try {
          const res = await axiosClient.get(
            `/api/districts/${districtIdNum}/cities`
          );
          setCitiesList(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
          console.error("Error fetching cities:", err);
        }
      }
    } else {
      formik.setFieldValue("district_id_r", districtId);
      formik.setFieldValue("vikas_khand_id", "");
      formik.setFieldValue("gram_panchayat_id", "");
      formik.setFieldValue("gram_id", "");
      setBlocksList([]);
      setPanchayatsList([]);
      setVillagesList([]);

      if (districtIdNum) {
        try {
          const res = await axiosClient.get(`/api/vikas-khand?page=1&limit=1000&district_id=${districtIdNum}`);
          const data = Array.isArray(res.data) ? res.data : [];
          setBlocksList(data.filter((item: any) => item.district_id === districtIdNum || data));
        } catch (err) {
          console.error("Error fetching blocks:", err);
        }
      }
    }
  };

  const handleCityChange = async (cityId: string) => {
    formik.setFieldValue("city_id", cityId);
    formik.setFieldValue("ward_id", "");
    setWardsList([]);

    const cityIdNum = parseInt(cityId);
    if (cityIdNum) {
      try {
        const res = await axiosClient.get(`/api/city-wards?page=1&limit=1000&city_id=${cityIdNum}`);
        const data = Array.isArray(res.data) ? res.data : [];
        const filtered = data.filter((item: any) => item.city_id === cityIdNum);
        setWardsList(filtered.length > 0 ? filtered : data);
      } catch (err) {
        console.error("Error fetching wards:", err);
      }
    }
  };

  const handleBlockChange = async (blockId: string) => {
    formik.setFieldValue("vikas_khand_id", blockId);
    formik.setFieldValue("gram_panchayat_id", "");
    formik.setFieldValue("gram_id", "");
    setPanchayatsList([]);
    setVillagesList([]);

    const blockIdNum = parseInt(blockId);
    if (blockIdNum) {
      try {
        const res = await axiosClient.get(`/api/gram-panchayats?page=1&limit=1000&vikas_khand_id=${blockIdNum}`);
        const data = Array.isArray(res.data) ? res.data : [];
        const filtered = data.filter((item: any) => item.vikas_khand_id === blockIdNum);
        setPanchayatsList(filtered.length > 0 ? filtered : data);
      } catch (err) {
        console.error("Error fetching panchayats:", err);
      }
    }
  };

  const handlePanchayatChange = async (panchayatId: string) => {
    formik.setFieldValue("gram_panchayat_id", panchayatId);
    formik.setFieldValue("gram_id", "");
    setVillagesList([]);

    const panchayatIdNum = parseInt(panchayatId);
    const districtIdNum = parseInt(formik.values.district_id_r);
    const blockIdNum = parseInt(formik.values.vikas_khand_id);

    if (panchayatIdNum) {
      try {
        const res = await axiosClient.get(
          `/api/villages?page=1&limit=1000&district_id=${districtIdNum}&vikas_khand_id=${blockIdNum}&panchayat_id=${panchayatIdNum}&status=1`
        );
        const data = Array.isArray(res.data) ? res.data : [];
        const filtered = data.filter((item: any) => item.panchayat_id === panchayatIdNum);
        setVillagesList(filtered.length > 0 ? filtered : data);
      } catch (err) {
        console.error("Error fetching villages:", err);
      }
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported by this browser.");
      return;
    }

    setIsGettingLocation(true);
    setLocationStatus("Allow location permission to get latitude and longitude.");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        formik.setFieldValue("latitude", position.coords.latitude.toFixed(6));
        formik.setFieldValue("longitude", position.coords.longitude.toFixed(6));
        setLocationStatus("Location fetched successfully.");
        setIsGettingLocation(false);
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location permission denied. Please allow location access."
            : "Unable to fetch location. Please try again.";

        setLocationStatus(message);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Lists formatted for placeholder render lookups
  const statesLookup = statesList.map((s) => ({ id: s.state_id, title: s.state_title }));
  const districtsLookup = districtsList.map((d) => ({ id: d.districtid, title: d.district_title }));
  const citiesLookup = citiesList.map((c) => ({ id: c.id, title: c.name }));
  const wardsLookup = wardsList.map((w) => ({ id: w.id, title: w.city_ward_name }));
  const blocksLookup = blocksList.map((b) => ({ id: b.id, title: b.vikas_khand_name }));
  const panchayatsLookup = panchayatsList.map((p) => ({ id: p.id, title: p.panchayat_name }));
  const villagesLookup = villagesList.map((v) => ({ id: v.id, title: v.villages_name }));
  const occupationsLookup = occupations.map((o) => ({ id: o.id, title: o.name }));

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#E2D9F3",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          fontFamily: "sans-serif",
        }}
      >
        {/* Back Button Outside Card */}
        <Box 
          onClick={handleBack}
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            cursor: "pointer", 
            alignSelf: "center",
            width: "100%",
            maxWidth: "700px",
            mb: 2, 
            color: "#5B21B6",
            transition: "color 0.2s",
            "&:hover": { color: "#4C1D95" }
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "20px", mr: 0.5 }} />
          <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
            Back
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            width: "100%",
            maxWidth: "700px",
            backgroundColor: "white",
            borderRadius: "32px",
            p: 3,
            boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
            minHeight: "580px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: { xs: 2, md: 6 },
              py: 3,
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}>
                Create Account
              </Typography>
              <Typography variant="caption" sx={{ color: "#9CA3AF", fontWeight: 500 }}>
                Join us as a Partner / Vendor by entering your details below
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={6}>
                <TextField
                  {...commonTextFieldProps}
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  {...commonTextFieldProps}
                  label="Email"
                  placeholder="example@gmail.com"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  {...commonTextFieldProps}
                  label="Phone Number"
                  placeholder="Enter 10-digit mobile number"
                  {...formik.getFieldProps("phone")}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  {...commonTextFieldProps}
                  name="password"
                  label="Password"
                  placeholder="Create a password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={6}>
                <FormControl fullWidth variant="standard" sx={{ mt: 1.5, "& .MuiInputLabel-root": { color: "#9CA3AF", fontWeight: 600, fontSize: "14px" } }}>
                  <InputLabel shrink id="role-select-label" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    Account Type
                    <Tooltip title="Vendors work with the platform, while Partners operate as independent individuals." arrow placement="top">
                      <InfoOutlinedIcon sx={{ color: "#9CA3AF", fontSize: "14px", cursor: "help" }} />
                    </Tooltip>
                  </InputLabel>
                  <Select
                    labelId="role-select-label"
                    name="role"
                    value={formik.values.role}
                    onChange={(e) => formik.setFieldValue("role", e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="vendor">Vendor</MenuItem>
                    <MenuItem value="partner">Partner</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ mt: 10 }}>
              <Grid size={6}>
                <Typography sx={{ mb: 2, color: "#374151" }}>Area Type</Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    onClick={() => {
                      formik.setFieldValue("area_type", "urban");
                      setDistrictsList([]);
                      setCitiesList([]);
                      setWardsList([]);
                    }}
                    sx={{
                      flex: 1,
                      p: 2,
                      cursor: "pointer",
                      borderRadius: "16px",
                      textAlign: "center",
                      border: formik.values.area_type === "urban" ? "2px solid #7C3AED" : "1px solid #E5E7EB",
                      background: formik.values.area_type === "urban" ? "#F5F3FF" : "#fff",
                      color: "#7C3AED",
                    }}
                  >
                    <Typography fontSize={28}>🏙️</Typography>
                    <Typography>Urban</Typography>
                  </Box>

                  <Box
                    onClick={() => {
                      formik.setFieldValue("area_type", "rural");
                      setDistrictsList([]);
                      setBlocksList([]);
                      setPanchayatsList([]);
                      setVillagesList([]);
                    }}
                    sx={{
                      flex: 1,
                      p: 2,
                      cursor: "pointer",
                      borderRadius: "16px",
                      textAlign: "center",
                      border: formik.values.area_type === "rural" ? "2px solid #7C3AED" : "1px solid #E5E7EB",
                      background: formik.values.area_type === "rural" ? "#F5F3FF" : "#fff",
                      color: "#7C3AED",
                    }}
                  >
                    <Typography fontSize={28}>🌾</Typography>
                    <Typography>Rural</Typography>
                  </Box>
                </Box>
              </Grid>

              {formik.values.area_type === "urban" && (
                <>
                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>State</InputLabel>
                      <Select
                        value={formik.values.state_id}
                        onChange={(e) => handleStateChange(e.target.value as string)}
                        displayEmpty
                        renderValue={(value) => renderSelectPlaceholder(value, "Select state", statesLookup)}
                      >
                        {statesList.map((item) => (
                          <MenuItem key={item.state_id} value={item.state_id}>
                            {item.state_title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>District</InputLabel>
                      <Select
                        value={formik.values.district_id}
                        onChange={(e) => handleDistrictChange(e.target.value as string)}
                        displayEmpty
                        disabled={!formik.values.state_id}
                        renderValue={(value) => renderSelectPlaceholder(value, "Select district", districtsLookup)}
                      >
                        {districtsList.map((item) => (
                          <MenuItem key={item.districtid} value={item.districtid}>
                            {item.district_title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>City</InputLabel>
                      <Select
                        value={formik.values.city_id}
                        onChange={(e) => handleCityChange(e.target.value as string)}
                        displayEmpty
                        disabled={!formik.values.district_id}
                        renderValue={(value) => renderSelectPlaceholder(value, "Select city", citiesLookup)}
                      >
                        {citiesList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>Ward</InputLabel>
                      <Select
                        value={formik.values.ward_id}
                        onChange={(e) => formik.setFieldValue("ward_id", e.target.value)}
                        displayEmpty
                        disabled={!formik.values.city_id}
                        renderValue={(value) => renderSelectPlaceholder(value, "Select ward", wardsLookup)}
                      >
                        {wardsList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.city_ward_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {formik.values.area_type === "rural" && (
                <>
                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>State</InputLabel>
                      <Select
                        value={formik.values.state_id_r}
                        onChange={(e) => handleStateChange(e.target.value as string)}
                        displayEmpty
                        renderValue={(value) => renderSelectPlaceholder(value, "Select state", statesLookup)}
                      >
                        {statesList.map((item) => (
                          <MenuItem key={item.state_id} value={item.state_id}>
                            {item.state_title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>District</InputLabel>
                      <Select
                        value={formik.values.district_id_r}
                        onChange={(e) => handleDistrictChange(e.target.value as string)}
                        displayEmpty
                        disabled={!formik.values.state_id_r}
                        renderValue={(value) => renderSelectPlaceholder(value, "Select district", districtsLookup)}
                      >
                        {districtsList.map((item) => (
                          <MenuItem key={item.districtid} value={item.districtid}>
                            {item.district_title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>Vikas Khand</InputLabel>
                      <Select
                        value={formik.values.vikas_khand_id}
                        onChange={(e) => handleBlockChange(e.target.value as string)}
                        displayEmpty
                        disabled={!formik.values.district_id_r}
                        renderValue={(value) => renderSelectPlaceholder(value, "Select vikas khand", blocksLookup)}
                      >
                        {blocksList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.vikas_khand_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>Gram Panchayat</InputLabel>
                      <Select
                        value={formik.values.gram_panchayat_id}
                        onChange={(e) => handlePanchayatChange(e.target.value as string)}
                        displayEmpty
                        disabled={!formik.values.vikas_khand_id}
                        renderValue={(value) => renderSelectPlaceholder(value, "Select gram panchayat", panchayatsLookup)}
                      >
                        {panchayatsList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.panchayat_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={12}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel shrink>Village</InputLabel>
                      <Select
                        value={formik.values.gram_id}
                        onChange={(e) => formik.setFieldValue("gram_id", e.target.value)}
                        displayEmpty
                        disabled={!formik.values.gram_panchayat_id}
                        renderValue={(value) => renderSelectPlaceholder(value, "Select village", villagesLookup)}
                      >
                        {villagesList.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.villages_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>

            <Grid container spacing={4} sx={{ mt: 10 }}>
              <Grid size={12}>
                <TextField
                  {...commonTextFieldProps}
                  label="Address"
                  placeholder="House no, street, landmark"
                  multiline
                  rows={3}
                  {...formik.getFieldProps("address")}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  {...commonTextFieldProps}
                  label="PIN Code"
                  placeholder="Enter 6-digit PIN code"
                  {...formik.getFieldProps("pin_no")}
                  error={formik.touched.pin_no && Boolean(formik.errors.pin_no)}
                  helperText={formik.touched.pin_no && formik.errors.pin_no}
                />
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel shrink>Occupation</InputLabel>
                  <Select
                    value={formik.values.occupation_id}
                    onChange={(e) => formik.setFieldValue("occupation_id", e.target.value)}
                    displayEmpty
                    renderValue={(value) => renderSelectPlaceholder(value, "Select occupation", occupationsLookup)}
                  >
                    {occupations.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 6, md: 6 }}>
                <TextField
                  {...commonTextFieldProps}
                  label="Latitude"
                  placeholder="Click Get Location"
                  value={formik.values.latitude}
                  disabled
                />
              </Grid>

              <Grid size={{ xs: 6, md: 6 }}>
                <TextField
                  {...commonTextFieldProps}
                  label="Longitude"
                  placeholder="Click Get Location"
                  value={formik.values.longitude}
                  disabled
                />
              </Grid>

              <Grid size={12}>
                <Button
                  startIcon={<LocationOnOutlinedIcon />}
                  variant="outlined"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  sx={{
                    minWidth: 170,
                    height: 42,
                    px: 2.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#7C3AED",
                    borderColor: "#D8B4FE",
                    backgroundColor: "#FAF5FF",
                    "&:hover": {
                      backgroundColor: "#F3E8FF",
                      borderColor: "#A855F7",
                    },
                  }}
                >
                  {isGettingLocation ? "Getting Location..." : "Get Location"}
                </Button>
                {locationStatus && (
                  <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#6B7280" }}>
                    {locationStatus}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  checked={formik.values.agreeTerms}
                  onChange={formik.handleChange}
                  sx={{
                    color: "#D1D5DB",
                    "&.Mui-checked": { color: "#7C3AED" },
                    py: 2,
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "13px", fontWeight: 500 }}>
                  I agree to the Terms & Conditions
                </Typography>
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading || formik.isSubmitting}
              sx={{
                backgroundColor: "#111827",
                color: "white",
                textTransform: "none",
                borderRadius: "14px",
                py: 2,
                fontSize: "15px",
                fontWeight: 600,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                "&:hover": { backgroundColor: "#1f2937" },
              }}
            >
              {isLoading || formik.isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 500,
              mt: 2,
            }}
          >
            Already have an account?{" "}
            <Link href="/auth/login" underline="hover" sx={{ color: "#7C3AED", fontWeight: 600, ml: 0.5 }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
