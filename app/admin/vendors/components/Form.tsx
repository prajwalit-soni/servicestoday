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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

import { Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

// Services
import { StateService, ApiState } from "../../../lib/services/stateService";
import { DistrictService, ApiDistrict } from "../../../lib/services/districtService";
import { CityService, ApiCity } from "../../../lib/services/cityService";
import { WardService, ApiWard } from "../../../lib/services/wardService";
import { VikasKhandService, ApiVikasKhand } from "../../../lib/services/vikasKhandService";
import { GramPanchayatService, ApiGramPanchayat } from "../../../lib/services/gramPanchayatService";
import { VillageService, ApiVillage } from "../../../lib/services/villageService";
import { UserService } from "../../../lib/services/userService";

// Validation Schema for VendorRegister
const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().min(8, "Password should be of minimum 8 characters length"),
});

const occupationsList = [
  { id: 1, name: "Farmer" },
  { id: 2, name: "Teacher" },
  { id: 3, name: "Business" },
  { id: 4, name: "Other" }
];

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

const renderSelectPlaceholder = (value: unknown, placeholder: string) => {
  if (value !== undefined && value !== null && value !== "") {
    return String(value);
  }

  return (
    <Box component="span" sx={{ color: "#9CA3AF" }}>
      {placeholder}
    </Box>
  );
};

interface AddVendorFormProps {
  onSuccessClose?: (values?: any) => void;
  initialValues?: any;
  mode?: "add" | "edit";
}

export default function AddVendorForm({ onSuccessClose, initialValues, mode = "add" }: AddVendorFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");

  // Location lists
  const [statesList, setStatesList] = useState<ApiState[]>([]);
  const [districtsList, setDistrictsList] = useState<ApiDistrict[]>([]);
  const [citiesList, setCitiesList] = useState<ApiCity[]>([]);
  const [wardsList, setWardsList] = useState<ApiWard[]>([]);
  const [vikasKhandsList, setVikasKhandsList] = useState<ApiVikasKhand[]>([]);
  const [gramPanchayatsList, setGramPanchayatsList] = useState<ApiGramPanchayat[]>([]);
  const [villagesList, setVillagesList] = useState<ApiVillage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      area_type: initialValues?.area_type || "urban",
      state_id: initialValues?.state_id || "",
      district_id: initialValues?.district_id || "",
      city_id: initialValues?.city_id || "",
      ward_id: initialValues?.ward_id || "",
      vikas_khand_id: initialValues?.vikas_khand_id || "",
      gram_panchayat_id: initialValues?.gram_panchayat_id || "",
      gram_id: initialValues?.gram_id || "",
      address: initialValues?.address || "",
      pin_no: initialValues?.pin_no || "",
      occupation_id: initialValues?.occupation_id || "",
      latitude: initialValues?.latitude || "",
      longitude: initialValues?.longitude || "",
      password: initialValues?.password || "",
      agreeTerms: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        email_verified_at: new Date().toISOString(),
        is_active: true,
        role: "vendor",
        state_id: Number(values.state_id || 0),
        city_id: Number(values.city_id || 0),
        district_id: Number(values.district_id || 0),
        gram_panchayat: values.area_type === "rural" ? "Example Panchayat" : "",
        address: values.address,
        pin_no: values.pin_no,
        occupation_id: Number(values.occupation_id || 0),
        area_type: values.area_type,
        latitude: Number(values.latitude || 0),
        longitude: Number(values.longitude || 0),
        ward_id: Number(values.ward_id || 0),
        vikas_khand_id: Number(values.vikas_khand_id || 0),
        gram_panchayat_id: Number(values.gram_panchayat_id || 0),
        gram_id: Number(values.gram_id || 0),
        remember_token: "",
        password: values.password || "dummy-password",
      };

      try {
        let responseData;
        if (mode === "edit") {
          responseData = await UserService.update(Number(initialValues?.id), payload);
          toast.success("Vendor updated successfully!");
        } else {
          responseData = await UserService.register(payload);
          toast.success("Vendor registered successfully!");
        }
        if (onSuccessClose) {
          onSuccessClose(responseData || payload);
        }
      } catch (err: any) {
        console.error("Failed to submit vendor form:", err);
        const errMsg = err.response?.data?.detail || err.response?.data?.message || err.message || "Failed to save vendor";
        toast.error(errMsg);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Load initial states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await StateService.getAll();
        setStatesList(data);
      } catch (err) {
        console.error("Failed to load states:", err);
      }
    };
    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    if (!formik.values.state_id) {
      setDistrictsList([]);
      return;
    }
    const fetchDistricts = async () => {
      try {
        const data = await DistrictService.getAll({ state_id: Number(formik.values.state_id) });
        setDistrictsList(data);
      } catch (err) {
        console.error("Failed to load districts:", err);
      }
    };
    fetchDistricts();
  }, [formik.values.state_id]);

  // Fetch cities/blocks when district changes
  useEffect(() => {
    if (!formik.values.district_id) {
      setCitiesList([]);
      setVikasKhandsList([]);
      return;
    }
    const districtIdNum = Number(formik.values.district_id);
    const stateIdNum = Number(formik.values.state_id);

    const fetchCitiesAndBlocks = async () => {
      try {
        if (formik.values.area_type === "urban") {
          const citiesData = await CityService.getAll({ state_id: stateIdNum, districtid: districtIdNum });
          setCitiesList(citiesData);
        } else {
          const blocksData = await VikasKhandService.getAll({ district_id: districtIdNum });
          setVikasKhandsList(blocksData);
        }
      } catch (err) {
        console.error("Failed to load cities/blocks:", err);
      }
    };
    fetchCitiesAndBlocks();
  }, [formik.values.district_id, formik.values.state_id, formik.values.area_type]);

  // Fetch wards when city changes
  useEffect(() => {
    if (!formik.values.city_id) {
      setWardsList([]);
      return;
    }
    const fetchWards = async () => {
      try {
        const data = await WardService.getAll({ city_id: Number(formik.values.city_id) });
        setWardsList(data);
      } catch (err) {
        console.error("Failed to load wards:", err);
      }
    };
    fetchWards();
  }, [formik.values.city_id]);

  // Fetch gram panchayats when block changes
  useEffect(() => {
    if (!formik.values.vikas_khand_id) {
      setGramPanchayatsList([]);
      return;
    }
    const fetchGP = async () => {
      try {
        const data = await GramPanchayatService.getAll({ vikas_khand_id: Number(formik.values.vikas_khand_id) });
        setGramPanchayatsList(data);
      } catch (err) {
        console.error("Failed to load gram panchayats:", err);
      }
    };
    fetchGP();
  }, [formik.values.vikas_khand_id]);

  // Fetch villages when gp changes
  useEffect(() => {
    if (!formik.values.gram_panchayat_id) {
      setVillagesList([]);
      return;
    }
    const fetchVillages = async () => {
      try {
        const data = await VillageService.getAll({ panchayat_id: Number(formik.values.gram_panchayat_id) });
        setVillagesList(data);
      } catch (err) {
        console.error("Failed to load villages:", err);
      }
    };
    fetchVillages();
  }, [formik.values.gram_panchayat_id]);


  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported by this browser.");
      return;
    }

    setIsGettingLocation(true);
    setLocationStatus(
      "Allow location permission to get latitude and longitude.",
    );

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
      },
    );
  };

  return (
    <>
  
      {/* Heading */}
      <Box sx={{ textAlign: { xs: "center", md: "left" },  px: { xs: 3, md: 3 }, mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
        >
          {mode === "edit" ? "Edit Account" : "Add Account"}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#9CA3AF", fontWeight: 500 }}
        >
          {mode === "edit" ? "Edit account details below" : "Add Account by entering your details below"}
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          overflow: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, md: 3 },
            py: 3,
          }}
        >
          {/* Input Fields */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...commonTextFieldProps}
                label="Full Name"
                placeholder="Enter your full name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && typeof formik.errors.name === "string" ? formik.errors.name : ""}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...commonTextFieldProps}
                label="Email"
                placeholder="example@gmail.com"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && typeof formik.errors.email === "string" ? formik.errors.email : ""}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...commonTextFieldProps}
                label="Phone Number"
                placeholder="Enter 10-digit mobile number"
                {...formik.getFieldProps("phone")}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && typeof formik.errors.phone === "string" ? formik.errors.phone : ""}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...commonTextFieldProps}
                name="password"
                label="Password"
                placeholder="Create a password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && typeof formik.errors.password === "string" ? formik.errors.password : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: 20 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 10 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                sx={{
                  mb: 2,
                  color: "#374151",
                }}
              >
                Area Type
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Box
                  onClick={() => formik.setFieldValue("area_type", "urban")}
                  sx={{
                    flex: 1,
                    p: 2,
                    cursor: "pointer",
                    borderRadius: "16px",
                    textAlign: "center",
                    border:
                      formik.values.area_type === "urban"
                        ? "2px solid #7C3AED"
                        : "1px solid #E5E7EB",
                    color:
                      formik.values.area_type === "urban"
                        ? " #7C3AED"
                        : " #7C3AED",
                  }}
                >
                  <Typography fontSize={28}>🏙️</Typography>

                  <Typography>Urban</Typography>
                </Box>

                <Box
                  onClick={() => formik.setFieldValue("area_type", "rural")}
                  sx={{
                    flex: 1,
                    p: 2,
                    cursor: "pointer",
                    borderRadius: "16px",
                    textAlign: "center",
                    border:
                      formik.values.area_type === "rural"
                        ? "2px solid #7C3AED"
                        : "1px solid #E5E7EB",
                    background:
                      formik.values.area_type === "rural" ? "#F5F3FF" : "#fff",
                    color:
                      formik.values.area_type === "urban"
                        ? " #7C3AED"
                        : " #7C3AED",
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
                  <TextField
                    select
                    fullWidth
                    variant="standard"
                    label="State"
                    value={formik.values.state_id}
                    onChange={(e) => {
                      formik.setFieldValue("state_id", e.target.value);
                      formik.setFieldValue("district_id", "");
                      formik.setFieldValue("city_id", "");
                      formik.setFieldValue("ward_id", "");
                    }}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) =>
                        renderSelectPlaceholder(
                          statesList.find((st) => st.state_id === Number(value))?.state_title || value,
                          "Select state"
                        ),
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#9CA3AF",
                        fontWeight: 600,
                        fontSize: "14px",
                      },
                    }}
                  >
                    {statesList.map((st) => (
                      <MenuItem key={st.state_id} value={st.state_id}>
                        {st.state_title}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={12}>
                  <TextField
                    select
                    fullWidth
                    variant="standard"
                    label="District"
                    value={formik.values.district_id}
                    onChange={(e) => {
                      formik.setFieldValue("district_id", e.target.value);
                      formik.setFieldValue("city_id", "");
                      formik.setFieldValue("ward_id", "");
                    }}
                    disabled={!formik.values.state_id}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) =>
                        renderSelectPlaceholder(
                          districtsList.find((d) => d.districtid === Number(value))?.district_title || value,
                          "Select district"
                        ),
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#9CA3AF",
                        fontWeight: 600,
                        fontSize: "14px",
                      },
                    }}
                  >
                    {districtsList.map((dst) => (
                      <MenuItem key={dst.districtid} value={dst.districtid}>
                        {dst.district_title}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={12}>
                  <TextField
                    select
                    fullWidth
                    variant="standard"
                    label="City"
                    value={formik.values.city_id}
                    onChange={(e) => {
                      formik.setFieldValue("city_id", e.target.value);
                      formik.setFieldValue("ward_id", "");
                    }}
                    disabled={!formik.values.district_id}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) =>
                        renderSelectPlaceholder(
                          citiesList.find((c) => c.id === Number(value))?.name || value,
                          "Select city"
                        ),
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#9CA3AF",
                        fontWeight: 600,
                        fontSize: "14px",
                      },
                    }}
                  >
                    {citiesList.map((ct) => (
                      <MenuItem key={ct.id} value={ct.id}>
                        {ct.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={12}>
                  <TextField
                    select
                    fullWidth
                    variant="standard"
                    label="Ward"
                    value={formik.values.ward_id}
                    onChange={(e) => formik.setFieldValue("ward_id", e.target.value)}
                    disabled={!formik.values.city_id}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (value) =>
                        renderSelectPlaceholder(
                          wardsList.find((w) => w.id === Number(value))?.city_ward_name || value,
                          "Select ward"
                        ),
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#9CA3AF",
                        fontWeight: 600,
                        fontSize: "14px",
                      },
                    }}
                  >
                    {wardsList.map((wd) => (
                      <MenuItem key={wd.id} value={wd.id}>
                        {wd.city_ward_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </>
            )}

            {formik.values.area_type === "rural" && (
              <>
                <Grid size={12}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel shrink>State</InputLabel>
                    <Select
                      value={formik.values.state_id}
                      onChange={(e) => {
                        formik.setFieldValue("state_id", e.target.value);
                        formik.setFieldValue("district_id", "");
                        formik.setFieldValue("vikas_khand_id", "");
                        formik.setFieldValue("gram_panchayat_id", "");
                        formik.setFieldValue("gram_id", "");
                      }}
                      displayEmpty
                      renderValue={(value) =>
                        renderSelectPlaceholder(
                          statesList.find((st) => st.state_id === Number(value))?.state_title || value,
                          "Select state"
                        )
                      }
                    >
                      {statesList.map((st) => (
                        <MenuItem key={st.state_id} value={st.state_id}>
                          {st.state_title}
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
                      onChange={(e) => {
                        formik.setFieldValue("district_id", e.target.value);
                        formik.setFieldValue("vikas_khand_id", "");
                        formik.setFieldValue("gram_panchayat_id", "");
                        formik.setFieldValue("gram_id", "");
                      }}
                      disabled={!formik.values.state_id}
                      displayEmpty
                      renderValue={(value) =>
                        renderSelectPlaceholder(
                          districtsList.find((d) => d.districtid === Number(value))?.district_title || value,
                          "Select district"
                        )
                      }
                    >
                      {districtsList.map((dst) => (
                        <MenuItem key={dst.districtid} value={dst.districtid}>
                          {dst.district_title}
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
                      onChange={(e) => {
                        formik.setFieldValue("vikas_khand_id", e.target.value);
                        formik.setFieldValue("gram_panchayat_id", "");
                        formik.setFieldValue("gram_id", "");
                      }}
                      disabled={!formik.values.district_id}
                      displayEmpty
                      renderValue={(value) =>
                        renderSelectPlaceholder(
                          vikasKhandsList.find((vk) => vk.id === Number(value))?.vikas_khand_name || value,
                          "Select vikas khand"
                        )
                      }
                    >
                      {vikasKhandsList.map((vk) => (
                        <MenuItem key={vk.id} value={vk.id}>
                          {vk.vikas_khand_name}
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
                      onChange={(e) => {
                        formik.setFieldValue("gram_panchayat_id", e.target.value);
                        formik.setFieldValue("gram_id", "");
                      }}
                      disabled={!formik.values.vikas_khand_id}
                      displayEmpty
                      renderValue={(value) =>
                        renderSelectPlaceholder(
                          gramPanchayatsList.find((gp) => gp.id === Number(value))?.panchayat_name || value,
                          "Select gram panchayat"
                        )
                      }
                    >
                      {gramPanchayatsList.map((gp) => (
                        <MenuItem key={gp.id} value={gp.id}>
                          {gp.panchayat_name}
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
                      disabled={!formik.values.gram_panchayat_id}
                      displayEmpty
                      renderValue={(value) =>
                        renderSelectPlaceholder(
                          villagesList.find((vil) => vil.id === Number(value))?.villages_name || value,
                          "Select village"
                        )
                      }
                    >
                      {villagesList.map((vil) => (
                        <MenuItem key={vil.id} value={vil.id}>
                          {vil.villages_name}
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
                helperText={formik.touched.address && typeof formik.errors.address === "string" ? formik.errors.address : ""}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                {...commonTextFieldProps}
                label="PIN Code"
                placeholder="Enter 6-digit PIN code"
                {...formik.getFieldProps("pin_no")}
                error={formik.touched.pin_no && Boolean(formik.errors.pin_no)}
                helperText={formik.touched.pin_no && typeof formik.errors.pin_no === "string" ? formik.errors.pin_no : ""}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                select
                fullWidth
                variant="standard"
                label="Occupation"
                value={formik.values.occupation_id}
                onChange={(e) => formik.setFieldValue("occupation_id", e.target.value)}
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) =>
                    renderSelectPlaceholder(
                      occupationsList.find((occ) => occ.id === Number(value))?.name || value,
                      "Select occupation"
                    ),
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#9CA3AF",
                    fontWeight: 600,
                    fontSize: "14px",
                  },
                }}
              >
                {occupationsList.map((occ) => (
                  <MenuItem key={occ.id} value={occ.id}>
                    {occ.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...commonTextFieldProps}
                label="Latitude"
                placeholder="Click Get Location"
                value={formik.values.latitude}
                
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                {...commonTextFieldProps}
                label="Longitude"
                placeholder="Click Get Location"
                value={formik.values.longitude}
                
              />
            </Grid>

      
          </Grid>

          {/* Terms and Conditions Checkbox */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              my: 4,
            }}
          >
         
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            sx={{
              backgroundColor: "#635BFF",
              color: "white",
              textTransform: "none",
              borderRadius: "14px",
              py: 1.4,
              px: 7,
              fontSize: "15px",
              fontWeight: 600,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
              "&:hover": { backgroundColor: "#635BFF" },
            }}
          >
            {isSubmitting ? "Saving..." : mode === "edit" ? "Save Changes" : "Sign Up"}
          </Button>
          </Box>
        </Box>

      </Box>
    </>
  );
}
