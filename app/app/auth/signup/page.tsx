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
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

// Validation Schema for Signup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

import { useAuthStore } from "../../store/useAuthStore";

export default function Signup() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [showPassword, setShowPassword] = useState(false);

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      agreeTerms: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Map fields to register API payload with working schema defaults
      const registerPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        email_verified_at: "2026-06-22T17:27:43.016Z",
        is_active: true,
        role: "user",
        state_id: 0,
        city_id: 0,
        district_id: 0,
        gram_panchayat: "string",
        address: "string",
        pin_no: "string",
        occupation_id: 0,
        area_type: "string",
        latitude: 0,
        longitude: 0,
        ward_id: 0,
        vikas_khand_id: 0,
        gram_panchayat_id: 0,
        gram_id: 0,
        remember_token: "string",
        password: values.password,
      };

      const result = await register(registerPayload);
      if (result.success) {
        toast.success("Account created successfully");
        router.push("/auth/login");
      } else {
        toast.error(result.error || "Registration failed");
      }
    },
  });

  return (
    <>
      {/* Heading */}
      <Box sx={{ textAlign: { xs: "center", md: "left" }, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}>
          Create Account
        </Typography>
        <Typography variant="caption" sx={{ color: "#9CA3AF", fontWeight: 500 }}>
          Join us by entering your details below
        </Typography>
      </Box>

      {/* Input Fields */}
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 3, "& .MuiInputLabel-root": { color: "#9CA3AF", fontWeight: 600, fontSize: "14px" } }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          placeholder="Example@gmail.com"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 3, "& .MuiInputLabel-root": { color: "#9CA3AF", fontWeight: 600, fontSize: "14px" } }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone Number"
          name="phone"
          placeholder="Enter 10-digit mobile number"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          sx={{ mb: 3, "& .MuiInputLabel-root": { color: "#9CA3AF", fontWeight: 600, fontSize: "14px" } }}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="At least 8 characters"
          variant="standard"
          InputLabelProps={{ shrink: true }}
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
          sx={{ mb: 2, "& .MuiInputLabel-root": { color: "#9CA3AF", fontWeight: 600, fontSize: "14px" } }}
        />

        {/* Terms and Conditions Checkbox */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox 
                name="agreeTerms"
                checked={formik.values.agreeTerms} 
                onChange={formik.handleChange}
                sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#7C3AED" } }} 
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "13px", fontWeight: 500 }}>
                I agree to the Terms & Conditions
              </Typography>
            }
          />
        </Box>

        {/* Submit Button */}
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
            py: 1.5,
            fontSize: "15px",
            fontWeight: 600,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
            "&:hover": { backgroundColor: "#1f2937" }
          }}
        >
          {isLoading || formik.isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </Box>

      {/* Redirection Link */}
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 4, 
          color: "#6B7280", 
          textAlign: "center", 
          fontSize: "14px", 
          fontWeight: 500 
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

    </>
  );
}
