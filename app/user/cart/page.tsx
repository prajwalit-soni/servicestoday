"use client";

import React, { useState } from "react";
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
import { Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

// Validation Schema for VendorRegister
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
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

const renderSelectPlaceholder = (value: unknown, placeholder: string) => {
  if (typeof value === "string" && value) {
    return value;
  }

  return (
    <Box component="span" sx={{ color: "#9CA3AF" }}>
      {placeholder}
    </Box>
  );
};

const states = ["Madhya Pradesh", "Maharashtra", "Uttar Pradesh"];
const districts = ["District 1", "District 2"];
const cities = ["City 1", "City 2"];
const wards = ["Ward 1", "Ward 2"];
const blocks = ["Block 1", "Block 2"];
const panchayats = ["Panchayat 1", "Panchayat 2"];
const villages = ["Village 1", "Village 2"];
const occupations = ["Farmer", "Teacher", "Business"];

export default function VendorRegister() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");

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
      agreeTerms: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // TODO: Add your custom VendorRegister backend logic here
      console.log("VendorRegister Data Submitted:", values);
      toast.success("Account created successfully");
      router.push("/auth/login");
    },
  });

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
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#E2D9F3",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { xs: "flex-start", md: "center" },
          px: { xs: 1.5, sm: 2, md: 4 },
          py: { xs: 2, sm: 4, md: 6 },
          fontFamily: "sans-serif",
        }}
      >
        {/* Main Card Wrapper */}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "640px", md: "820px" },
            backgroundColor: "white",
            borderRadius: { xs: "18px", sm: "24px", md: "32px" },
            p: { xs: 2, sm: 3, md: 4 },
            boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
            boxSizing: "border-box",
          }}
        >
          {/* Right Side: Form Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: { xs: 0, sm: 2, md: 4 },
              py: { xs: 1, sm: 2, md: 3 },
            }}
          >
            {/* Heading */}
            <Box
              sx={{
                textAlign: { xs: "center", sm: "left" },
                mb: { xs: 3, md: 4 },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  mb: 0.5,
                  fontSize: { xs: "26px", sm: "32px", md: "34px" },
                  lineHeight: 1.15,
                }}
              >
                Create Account
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#9CA3AF", fontWeight: 500 }}
              >
                Join us by entering your details below
              </Typography>
            </Box>

            {/* Input Fields */}
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...commonTextFieldProps}
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...commonTextFieldProps}
                  label="Email"
                  placeholder="example@gmail.com"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...commonTextFieldProps}
                  label="Phone Number"
                  placeholder="Enter 10-digit mobile number"
                  {...formik.getFieldProps("phone")}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
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
                  helperText={formik.touched.password && formik.errors.password}
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

            <Grid
              container
              spacing={{ xs: 2, sm: 3, md: 4 }}
              sx={{ mt: { xs: 3, md: 6 } }}
            >
              <Grid size={12}>
                <Typography
                  sx={{
                    mb: { xs: 1.5, sm: 2 },
                    color: "#374151",
                  }}
                >
                  Area Type
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 1.5, sm: 2 },
                  }}
                >
                  <Box
                    onClick={() => formik.setFieldValue("area_type", "urban")}
                    sx={{
                      flex: 1,
                      p: { xs: 1.5, sm: 2 },
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
                      p: { xs: 1.5, sm: 2 },
                      cursor: "pointer",
                      borderRadius: "16px",
                      textAlign: "center",
                      border:
                        formik.values.area_type === "rural"
                          ? "2px solid #7C3AED"
                          : "1px solid #E5E7EB",
                      background:
                        formik.values.area_type === "rural"
                          ? "#F5F3FF"
                          : "#fff",
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
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      variant="standard"
                      label="State"
                      value={formik.values.state_id}
                      onChange={(e) =>
                        formik.setFieldValue("state_id", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) =>
                          renderSelectPlaceholder(value, "Select state"),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "#9CA3AF",
                          fontWeight: 600,
                          fontSize: "14px",
                        },
                      }}
                    >
                      {states.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      variant="standard"
                      label="District"
                      value={formik.values.district_id}
                      onChange={(e) =>
                        formik.setFieldValue("district_id", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) =>
                          renderSelectPlaceholder(value, "Select district"),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "#9CA3AF",
                          fontWeight: 600,
                          fontSize: "14px",
                        },
                      }}
                    >
                      {districts.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      variant="standard"
                      label="City"
                      value={formik.values.city_id}
                      onChange={(e) =>
                        formik.setFieldValue("city_id", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) =>
                          renderSelectPlaceholder(value, "Select city"),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "#9CA3AF",
                          fontWeight: 600,
                          fontSize: "14px",
                        },
                      }}
                    >
                      {cities.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      variant="standard"
                      label="Ward"
                      value={formik.values.ward_id}
                      onChange={(e) =>
                        formik.setFieldValue("ward_id", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (value) =>
                          renderSelectPlaceholder(value, "Select ward"),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "#9CA3AF",
                          fontWeight: 600,
                          fontSize: "14px",
                        },
                      }}
                    >
                      {wards.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}

              {formik.values.area_type === "rural" && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>State</InputLabel>
                      <Select
                        value={formik.values.state_id_r}
                        onChange={(e) =>
                          formik.setFieldValue("state_id_r", e.target.value)
                        }
                        displayEmpty
                        renderValue={(value) =>
                          renderSelectPlaceholder(value, "Select state")
                        }
                      >
                        {states.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>District</InputLabel>
                      <Select
                        value={formik.values.district_id_r}
                        onChange={(e) =>
                          formik.setFieldValue("district_id_r", e.target.value)
                        }
                        displayEmpty
                        renderValue={(value) =>
                          renderSelectPlaceholder(value, "Select district")
                        }
                      >
                        {districts.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>Vikas Khand</InputLabel>
                      <Select
                        value={formik.values.vikas_khand_id}
                        onChange={(e) =>
                          formik.setFieldValue("vikas_khand_id", e.target.value)
                        }
                        displayEmpty
                        renderValue={(value) =>
                          renderSelectPlaceholder(value, "Select vikas khand")
                        }
                      >
                        {blocks.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>Gram Panchayat</InputLabel>
                      <Select
                        value={formik.values.gram_panchayat_id}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "gram_panchayat_id",
                            e.target.value,
                          )
                        }
                        displayEmpty
                        renderValue={(value) =>
                          renderSelectPlaceholder(
                            value,
                            "Select gram panchayat",
                          )
                        }
                      >
                        {panchayats.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel>Village</InputLabel>
                      <Select
                        value={formik.values.gram_id}
                        onChange={(e) =>
                          formik.setFieldValue("gram_id", e.target.value)
                        }
                        displayEmpty
                        renderValue={(value) =>
                          renderSelectPlaceholder(value, "Select village")
                        }
                      >
                        {villages.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>

            <Grid
              container
              spacing={{ xs: 2, sm: 3, md: 4 }}
              sx={{ mt: { xs: 3, md: 6 } }}
            >
              <Grid size={12}>
                <TextField
                  {...commonTextFieldProps}
                  label="Address"
                  placeholder="House no, street, landmark"
                  multiline
                  rows={3}
                  {...formik.getFieldProps("address")}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...commonTextFieldProps}
                  label="PIN Code"
                  placeholder="Enter 6-digit PIN code"
                  {...formik.getFieldProps("pin_no")}
                  error={formik.touched.pin_no && Boolean(formik.errors.pin_no)}
                  helperText={formik.touched.pin_no && formik.errors.pin_no}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  variant="standard"
                  label="Occupation"
                  value={formik.values.occupation_id}
                  onChange={(e) =>
                    formik.setFieldValue("occupation_id", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) =>
                      renderSelectPlaceholder(value, "Select occupation"),
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#9CA3AF",
                      fontWeight: 600,
                      fontSize: "14px",
                    },
                  }}
                >
                  {occupations.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  {...commonTextFieldProps}
                  label="Latitude"
                  placeholder="Click Get Location"
                  value={formik.values.latitude}
                  disabled
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
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
                    width: { xs: "100%", sm: "auto" },
                    minWidth: { sm: 170 },
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
                  <Typography
                    variant="caption"
                    sx={{ display: "block", mt: 1, color: "#6B7280" }}
                  >
                    {locationStatus}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Terms and Conditions Checkbox */}
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
              sx={{
                alignItems: "flex-start",
                mt: { xs: 2, sm: 3 },
                mb: { xs: 2, sm: 3 },
                mx: 0,
              }}
              label={
                <Typography
                  variant="body2"
                  sx={{ color: "#4B5563", fontSize: "13px", fontWeight: 500 }}
                >
                  I agree to the Terms & Conditions
                </Typography>
              }
            />
            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#111827",
                color: "white",
                textTransform: "none",
                borderRadius: "14px",
                py: { xs: 1.5, sm: 2 },
                fontSize: "15px",
                fontWeight: 600,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                "&:hover": { backgroundColor: "#1f2937" },
              }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Redirection Link */}
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 500,
              mt: { xs: 2.5, sm: 3 },
              px: { xs: 1, sm: 0 },
            }}
          >
            Already have an account?{" "}
            <Link
              href="/auth/login"
              underline="hover"
              sx={{ color: "#7C3AED", fontWeight: 600, ml: 0.5 }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
