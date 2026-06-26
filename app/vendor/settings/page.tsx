"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Slider,
  InputAdornment,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";

// Icons
import BusinessIcon from "@mui/icons-material/Business";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const STEPS = [
  { label: "Business Details", icon: <BusinessIcon /> },
  { label: "Pricing & Area", icon: <RoomServiceOutlinedIcon /> },
  { label: "Location Map", icon: <MapOutlinedIcon /> },
  { label: "Bank Details", icon: <AccountBalanceOutlinedIcon /> },
  { label: "KYC Documents", icon: <DescriptionOutlinedIcon /> },
];

const STATE_LIST = [
  "Chhattisgarh",
  "Madhya Pradesh",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
];

const AVAILABLE_SERVICES = [
  "AC Repair & Service",
  "Pest Control",
  "Professional Deep Cleaning",
  "Plumbing Solutions",
  "Home Painting",
  "Electrician Services",
  "Lawn Care & Gardening",
  "Carpentry & Woodwork",
  "Appliance Repair",
];

export default function VendorSettings() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    // Step 1: Business details
    businessName: "EcoClean & Repair Services Ltd",
    category: "Home Services",
    gstin: "22AAAAA0000A1Z5",
    regNumber: "REG-991204-CH",
    supportEmail: "info@ecocleanrepair.com",
    supportPhone: "9876543210",
    
    // Step 2: Pricing and coverage
    primaryCity: "Korba",
    serviceRadius: 25,
    minOrderValue: 500,
    baseCallOutFee: 150,
    hourlyRate: 350,
    servicesOffered: ["AC Repair & Service", "Professional Deep Cleaning", "Plumbing Solutions"] as string[],

    // Step 3: Location mapping
    streetAddress: "45, VIP Road, Near City Plaza, Transport Nagar",
    zipCode: "495677",
    state: "Chhattisgarh",
    district: "Korba",
    latitude: "22.3597",
    longitude: "82.7501",

    // Step 4: Banking Account
    bankName: "State Bank of India",
    branchName: "VIP Road Korba Branch",
    accountHolder: "EcoClean & Repair Services Ltd",
    accountNumber: "39485769201",
    ifscCode: "SBIN0004561",
    accountType: "Current",

    // Step 5: Document names
    panFileName: "pan_card_doc.pdf",
    aadharFileName: "aadhar_card_doc.pdf",
    gstFileName: "gst_certificate_doc.pdf",
    regFileName: "",
  });

  // Local validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleServiceToggle = (serviceName: string) => {
    const current = [...formData.servicesOffered];
    const index = current.indexOf(serviceName);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(serviceName);
    }
    handleInputChange("servicesOffered", current);
  };

  // Detect Location Mockup
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Geolocation is not supported by your browser.");
      return;
    }
    setDetectingLocation(true);
    setLocationMessage("Acquiring GPS signals...");
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
        setLocationMessage("Location updated successfully!");
        setDetectingLocation(false);
      },
      (error) => {
        setFormData((prev) => ({
          ...prev,
          latitude: "22.359700",
          longitude: "82.750100",
        }));
        setLocationMessage("Acquired backup location (GPS timeout).");
        setDetectingLocation(false);
      },
      { timeout: 8000 }
    );
  };

  // Mock File Selection
  const selectMockFile = (fieldName: string, defaultName: string) => {
    handleInputChange(fieldName, defaultName);
  };

  // Simple Step-level Validation
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.businessName) newErrors.businessName = "Business name is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.supportEmail) newErrors.supportEmail = "Support email is required";
      if (!formData.supportPhone) newErrors.supportPhone = "Support phone is required";
      else if (!/^\d{10}$/.test(formData.supportPhone)) newErrors.supportPhone = "Phone must be exactly 10 digits";
    }
    if (step === 1) {
      if (!formData.primaryCity) newErrors.primaryCity = "Primary city is required";
      if (formData.servicesOffered.length === 0) newErrors.servicesOffered = "Select at least one service";
    }
    if (step === 2) {
      if (!formData.streetAddress) newErrors.streetAddress = "Address is required";
      if (!formData.zipCode) newErrors.zipCode = "Zip code is required";
      if (!formData.state) newErrors.state = "State selection is required";
      if (!formData.district) newErrors.district = "District is required";
    }
    if (step === 3) {
      if (!formData.bankName) newErrors.bankName = "Bank name is required";
      if (!formData.accountHolder) newErrors.accountHolder = "Account holder is required";
      if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
      if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
    }
    if (step === 4) {
      if (!formData.panFileName) newErrors.panFileName = "PAN Card upload is required";
      if (!formData.aadharFileName) newErrors.aadharFileName = "Aadhar Card upload is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep < STEPS.length - 1) {
        setActiveStep((prev) => prev + 1);
      } else {
        setIsSubmitDialogOpen(true);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSubmitConfirm = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setIsSubmitDialogOpen(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 4 }}>
      {/* Header section with subtitle */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}>
          Vendor Settings
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500 }}>
          Manage your business profile details, bank accounts, services settings, and check verification logs.
        </Typography>
      </Box>

      {isSuccess ? (
        <Card 
          sx={{ 
            borderRadius: "20px", 
            border: "1px solid #E5E7EB", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            bgcolor: "#FFFFFF",
            p: 4, 
            textAlign: "center" 
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 72, color: "#10b981" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#1F2937", mb: 1 }}>
            Profile Updated Successfully!
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", maxWidth: 500, mx: "auto", mb: 4 }}>
            Your business configuration details have been saved. Some documents may be reviewed by the admin panel to update your verification check badge.
          </Typography>

          <Grid container spacing={2} sx={{ maxWidth: 800, mx: "auto", textAlign: "left", bgcolor: "#FAFAFA", p: 3, borderRadius: "12px", border: "1px solid #EAEAEA", mb: 4 }}>
            <Grid size={12}>
              <Typography variant="subtitle2" fontWeight={700} color="#635BFF" sx={{ mb: 1 }}>Profile Overview</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">Business Name</Typography>
              <Typography variant="body2" fontWeight={600}>{formData.businessName}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">Primary Category</Typography>
              <Typography variant="body2" fontWeight={600}>{formData.category}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">Contact Info</Typography>
              <Typography variant="body2" fontWeight={600}>{formData.supportPhone} | {formData.supportEmail}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">Operational Center</Typography>
              <Typography variant="body2" fontWeight={600}>{formData.primaryCity} ({formData.serviceRadius} km coverage)</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">Selected Services</Typography>
              <Typography variant="body2" fontWeight={600}>{formData.servicesOffered.join(", ")}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">Base Pricing</Typography>
              <Typography variant="body2" fontWeight={600}>Call-out: ₹{formData.baseCallOutFee} | Min Order: ₹{formData.minOrderValue} | Hourly: ₹{formData.hourlyRate}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">Location coordinates</Typography>
              <Typography variant="body2" fontWeight={600}>{formData.latitude}, {formData.longitude}</Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="caption" color="text.secondary">Bank account (Payout)</Typography>
              <Typography variant="body2" fontWeight={600}>{formData.bankName} - Account ending in ***{formData.accountNumber.slice(-4)}</Typography>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => setIsSuccess(false)}
              sx={{ bgcolor: "#635BFF", "&:hover": { bgcolor: "#4F46E5" }, borderRadius: "30px", px: 4, textTransform: "none", fontWeight: 600 }}
            >
              Back to Settings Form
            </Button>
            <Button
              component={Link}
              href="/vendor"
              variant="outlined"
              sx={{ color: "#4B5563", borderColor: "#D1D5DB", "&:hover": { borderColor: "#9CA3AF" }, borderRadius: "30px", px: 4, textTransform: "none", fontWeight: 600 }}
            >
              Go to Dashboard
            </Button>
          </Stack>
        </Card>
      ) : (
        <Card 
          sx={{ 
            borderRadius: "20px", 
            border: "1px solid #EAEAEA", 
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            bgcolor: "#FFFFFF",
            overflow: "hidden"
          }}
        >
          {/* Progress Indicator Head */}
          <Box sx={{ borderBottom: "1px solid #EAEAEA", p: 3, bgcolor: "#FAFAFA" }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{
              "& .MuiStepLabel-label.Mui-active": { color: "#635BFF", fontWeight: 700 },
              "& .MuiStepLabel-label.Mui-completed": { color: "#10b981", fontWeight: 600 },
              "& .MuiStepIcon-root.Mui-active": { color: "#635BFF" },
              "& .MuiStepIcon-root.Mui-completed": { color: "#10b981" }
            }}>
              {STEPS.map((step, idx) => (
                <Step key={step.label}>
                  <StepLabel StepIconComponent={() => (
                    <Box sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: "50%", 
                      bgcolor: activeStep === idx ? "#635BFF" : activeStep > idx ? "#10B981" : "#E5E7EB", 
                      color: "#FFFFFF",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      boxShadow: activeStep === idx ? "0 0 10px rgba(99, 91, 255, 0.4)" : "none"
                    }}>
                      {activeStep > idx ? <CheckCircleIcon sx={{ fontSize: 18 }} /> : React.cloneElement(step.icon, { sx: { fontSize: 16 } })}
                    </Box>
                  )}>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ mt: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={((activeStep + 1) / STEPS.length) * 100} 
                sx={{ 
                  height: 6, 
                  borderRadius: "3px", 
                  bgcolor: "#E5E7EB",
                  "& .MuiLinearProgress-bar": { bgcolor: "#635BFF", borderRadius: "3px" }
                }} 
              />
            </Box>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Display validation warning alert if needed */}
            {Object.keys(errors).length > 0 && (
              <Alert severity="error" sx={{ mb: 4, borderRadius: "12px" }}>
                Please fill all the required details before moving forward.
              </Alert>
            )}

            {/* STEP 0: BUSINESS DETAILS */}
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Typography variant="h6" fontWeight={700} color="#1F2937" sx={{ mb: 1 }}>
                    🏢 Business Information
                  </Typography>
                  <Typography variant="body2" color="#6B7280" sx={{ mb: 3 }}>
                    Provide basic identifiers and support links for your business listing.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Official Business / Agency Name"
                    variant="outlined"
                    required
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    error={Boolean(errors.businessName)}
                    helperText={errors.businessName}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="category-select-label">Business Category</InputLabel>
                    <Select
                      labelId="category-select-label"
                      label="Business Category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                    >
                      <MenuItem value="Home Services">Home Maintenance & Repairs</MenuItem>
                      <MenuItem value="Electronics Service">Consumer Electronics Repair</MenuItem>
                      <MenuItem value="Logistics">Delivery & Logistics</MenuItem>
                      <MenuItem value="Automotive">Automotive Repairs</MenuItem>
                      <MenuItem value="Cleaning">Commercial Cleaning Services</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="GSTIN / Corporate Tax ID (Optional)"
                    variant="outlined"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange("gstin", e.target.value)}
                    placeholder="e.g. 22AAAAA0000A1Z5"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Business Registration Number (Trade License)"
                    variant="outlined"
                    value={formData.regNumber}
                    onChange={(e) => handleInputChange("regNumber", e.target.value)}
                    placeholder="e.g. REG-00000"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Customer Support Email"
                    variant="outlined"
                    required
                    type="email"
                    value={formData.supportEmail}
                    onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                    error={Boolean(errors.supportEmail)}
                    helperText={errors.supportEmail}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Customer Support Phone Number"
                    variant="outlined"
                    required
                    value={formData.supportPhone}
                    onChange={(e) => handleInputChange("supportPhone", e.target.value)}
                    error={Boolean(errors.supportPhone)}
                    helperText={errors.supportPhone || "10-digit number without country code"}
                  />
                </Grid>
              </Grid>
            )}

            {/* STEP 1: COVERAGE & PRICING */}
            {activeStep === 1 && (
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Typography variant="h6" fontWeight={700} color="#1F2937" sx={{ mb: 1 }}>
                    ⚙️ Operational Range & Pricing Configuration
                  </Typography>
                  <Typography variant="body2" color="#6B7280" sx={{ mb: 3 }}>
                    Configure the bounds for where you operate and set base pricing components.
                  </Typography>
                </Grid>
                
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Primary Service City Hub"
                    variant="outlined"
                    required
                    value={formData.primaryCity}
                    onChange={(e) => handleInputChange("primaryCity", e.target.value)}
                    error={Boolean(errors.primaryCity)}
                    helperText={errors.primaryCity}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ px: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                      Maximum Service Coverage Radius: {formData.serviceRadius} km
                    </Typography>
                    <Slider
                      value={formData.serviceRadius}
                      min={5}
                      max={100}
                      step={5}
                      marks
                      valueLabelDisplay="auto"
                      onChange={(_, val) => handleInputChange("serviceRadius", val)}
                      sx={{ color: "#635BFF" }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Min Booking Order Value"
                    variant="outlined"
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => handleInputChange("minOrderValue", Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Base Delivery / Call-out Fee"
                    variant="outlined"
                    type="number"
                    value={formData.baseCallOutFee}
                    onChange={(e) => handleInputChange("baseCallOutFee", Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField
                    fullWidth
                    label="Standard Hourly Service Rate"
                    variant="outlined"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange("hourlyRate", Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#374151" }}>
                    Select Offered Services / Packages
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
                    Only select categories where you have verified expert service agents.
                  </Typography>
                  {errors.servicesOffered && (
                    <Typography color="error" variant="caption" sx={{ display: "block", mb: 2 }}>
                      {errors.servicesOffered}
                    </Typography>
                  )}
                  <Grid container spacing={1.5}>
                    {AVAILABLE_SERVICES.map((service) => {
                      const isSelected = formData.servicesOffered.includes(service);
                      return (
                        <Grid key={service}>
                          <Chip
                            label={service}
                            clickable
                            color={isSelected ? "primary" : "default"}
                            onClick={() => handleServiceToggle(service)}
                            sx={{
                              bgcolor: isSelected ? "#635BFF" : "#F3F4F6",
                              color: isSelected ? "#FFFFFF" : "#4B5563",
                              fontWeight: 500,
                              borderRadius: "8px",
                              "&:hover": { bgcolor: isSelected ? "#4F46E5" : "#E5E7EB" },
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            )}

            {/* STEP 2: LOCATION MAPPING */}
            {activeStep === 2 && (
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Typography variant="h6" fontWeight={700} color="#1F2937" sx={{ mb: 1 }}>
                    📍 Operational Base Location & Maps
                  </Typography>
                  <Typography variant="body2" color="#6B7280" sx={{ mb: 3 }}>
                    Fill in your physical store, depot, or head office address. This helps determine geo-fenced assignments.
                  </Typography>
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Street Address / Office Unit / Landmark"
                    variant="outlined"
                    required
                    multiline
                    rows={2}
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                    error={Boolean(errors.streetAddress)}
                    helperText={errors.streetAddress}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="District"
                    variant="outlined"
                    required
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    error={Boolean(errors.district)}
                    helperText={errors.district}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth variant="outlined" required error={Boolean(errors.state)}>
                    <InputLabel id="state-select-label">State</InputLabel>
                    <Select
                      labelId="state-select-label"
                      label="State"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                    >
                      {STATE_LIST.map((st) => (
                        <MenuItem key={st} value={st}>{st}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="ZIP / Pin Code"
                    variant="outlined"
                    required
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    error={Boolean(errors.zipCode)}
                    helperText={errors.zipCode}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ border: "1px dashed #D1D5DB", p: 2, borderRadius: "12px", bgcolor: "#FAFAFA" }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="body2" fontWeight={600} color="#374151">Geocoding Signals</Typography>
                        <Typography variant="caption" color="text.secondary">Set coordinates to match maps.</Typography>
                      </Box>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={detectLocation}
                        disabled={detectingLocation}
                        startIcon={<LocationOnOutlinedIcon />}
                        sx={{
                          color: "#635BFF",
                          borderColor: "#D8B4FE",
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": { borderColor: "#635BFF", bgcolor: "#FAF5FF" }
                        }}
                      >
                        {detectingLocation ? "Detecting..." : "Detect Location"}
                      </Button>
                    </Stack>
                    {locationMessage && (
                      <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#4B5563", fontWeight: 500 }}>
                        ℹ️ {locationMessage}
                      </Typography>
                    )}
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Location Latitude"
                    variant="outlined"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange("latitude", e.target.value)}
                    placeholder="e.g. 22.359700"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Location Longitude"
                    variant="outlined"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange("longitude", e.target.value)}
                    placeholder="e.g. 82.750100"
                  />
                </Grid>
              </Grid>
            )}

            {/* STEP 3: FINANCIAL DETAILS */}
            {activeStep === 3 && (
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Typography variant="h6" fontWeight={700} color="#1F2937" sx={{ mb: 1 }}>
                    🏦 Banking Account Details
                  </Typography>
                  <Typography variant="body2" color="#6B7280" sx={{ mb: 3 }}>
                    Fill in your details accurately. The system initiates settlement payouts automatically to this account weekly.
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    variant="outlined"
                    required
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    error={Boolean(errors.bankName)}
                    helperText={errors.bankName}
                    placeholder="e.g. State Bank of India"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Branch Name"
                    variant="outlined"
                    value={formData.branchName}
                    onChange={(e) => handleInputChange("branchName", e.target.value)}
                    placeholder="e.g. VIP Road Branch"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Account Holder Name"
                    variant="outlined"
                    required
                    value={formData.accountHolder}
                    onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                    error={Boolean(errors.accountHolder)}
                    helperText={errors.accountHolder}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="account-type-select-label">Account Type</InputLabel>
                    <Select
                      labelId="account-type-select-label"
                      label="Account Type"
                      value={formData.accountType}
                      onChange={(e) => handleInputChange("accountType", e.target.value)}
                    >
                      <MenuItem value="Savings">Savings Account</MenuItem>
                      <MenuItem value="Current">Current Account</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Bank Account Number"
                    variant="outlined"
                    required
                    type="password"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    error={Boolean(errors.accountNumber)}
                    helperText={errors.accountNumber}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="IFSC Code"
                    variant="outlined"
                    required
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                    error={Boolean(errors.ifscCode)}
                    helperText={errors.ifscCode}
                    placeholder="e.g. SBIN0000000"
                  />
                </Grid>
              </Grid>
            )}

            {/* STEP 4: KYC & CERTIFICATIONS */}
            {activeStep === 4 && (
              <Grid container spacing={4}>
                <Grid size={12}>
                  <Typography variant="h6" fontWeight={700} color="#1F2937" sx={{ mb: 1 }}>
                    📄 KYC verification documents upload
                  </Typography>
                  <Typography variant="body2" color="#6B7280" sx={{ mb: 3 }}>
                    Please upload high-quality PDF, JPG or PNG scans of the following documents. These are required for active merchant verification.
                  </Typography>
                </Grid>

                {/* Doc 1: PAN Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ border: errors.panFileName ? "2px dashed #EF4444" : "1px dashed #D1D5DB", p: 3, borderRadius: "16px", bgcolor: "#FAFAFA", textAlign: "center" }}>
                    <CloudUploadIcon sx={{ fontSize: 36, color: "#6B7280", mb: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} color="#374151">PAN Card / Business Tax Proof *</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>PDF, JPG, PNG up to 5MB</Typography>
                    {formData.panFileName ? (
                      <Box sx={{ display: "inline-flex", alignItems: "center", bgcolor: "#E6F4EA", px: 2, py: 0.5, borderRadius: "20px", mb: 2 }}>
                        <Typography variant="caption" fontWeight={600} color="#137333">{formData.panFileName}</Typography>
                        <IconButton size="small" onClick={() => handleInputChange("panFileName", "")} sx={{ ml: 1, p: 0.2 }}><CloseIcon sx={{ fontSize: 14 }} /></IconButton>
                      </Box>
                    ) : (
                      <Button variant="outlined" size="small" onClick={() => selectMockFile("panFileName", "pan_card_doc.pdf")} sx={{ textTransform: "none", color: "#635BFF", borderColor: "#635BFF" }}>
                        Browse File
                      </Button>
                    )}
                  </Box>
                </Grid>

                {/* Doc 2: Aadhar Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ border: errors.aadharFileName ? "2px dashed #EF4444" : "1px dashed #D1D5DB", p: 3, borderRadius: "16px", bgcolor: "#FAFAFA", textAlign: "center" }}>
                    <CloudUploadIcon sx={{ fontSize: 36, color: "#6B7280", mb: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} color="#374151">Aadhar Card / Identity Document *</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>PDF, JPG, PNG up to 5MB</Typography>
                    {formData.aadharFileName ? (
                      <Box sx={{ display: "inline-flex", alignItems: "center", bgcolor: "#E6F4EA", px: 2, py: 0.5, borderRadius: "20px", mb: 2 }}>
                        <Typography variant="caption" fontWeight={600} color="#137333">{formData.aadharFileName}</Typography>
                        <IconButton size="small" onClick={() => handleInputChange("aadharFileName", "")} sx={{ ml: 1, p: 0.2 }}><CloseIcon sx={{ fontSize: 14 }} /></IconButton>
                      </Box>
                    ) : (
                      <Button variant="outlined" size="small" onClick={() => selectMockFile("aadharFileName", "aadhar_card_doc.pdf")} sx={{ textTransform: "none", color: "#635BFF", borderColor: "#635BFF" }}>
                        Browse File
                      </Button>
                    )}
                  </Box>
                </Grid>

                {/* Doc 3: Business Incorporation Certificate */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ border: "1px dashed #D1D5DB", p: 3, borderRadius: "16px", bgcolor: "#FAFAFA", textAlign: "center" }}>
                    <CloudUploadIcon sx={{ fontSize: 36, color: "#6B7280", mb: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} color="#374151">Business Registration Certificate</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>PDF, JPG, PNG up to 5MB</Typography>
                    {formData.regFileName ? (
                      <Box sx={{ display: "inline-flex", alignItems: "center", bgcolor: "#E6F4EA", px: 2, py: 0.5, borderRadius: "20px", mb: 2 }}>
                        <Typography variant="caption" fontWeight={600} color="#137333">{formData.regFileName}</Typography>
                        <IconButton size="small" onClick={() => handleInputChange("regFileName", "")} sx={{ ml: 1, p: 0.2 }}><CloseIcon sx={{ fontSize: 14 }} /></IconButton>
                      </Box>
                    ) : (
                      <Button variant="outlined" size="small" onClick={() => selectMockFile("regFileName", "trade_license_doc.pdf")} sx={{ textTransform: "none", color: "#635BFF", borderColor: "#635BFF" }}>
                        Browse File
                      </Button>
                    )}
                  </Box>
                </Grid>

                {/* Doc 4: GST Certificate */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ border: "1px dashed #D1D5DB", p: 3, borderRadius: "16px", bgcolor: "#FAFAFA", textAlign: "center" }}>
                    <CloudUploadIcon sx={{ fontSize: 36, color: "#6B7280", mb: 1 }} />
                    <Typography variant="subtitle2" fontWeight={700} color="#374151">GST Tax Certification (Optional)</Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>PDF, JPG, PNG up to 5MB</Typography>
                    {formData.gstFileName ? (
                      <Box sx={{ display: "inline-flex", alignItems: "center", bgcolor: "#E6F4EA", px: 2, py: 0.5, borderRadius: "20px", mb: 2 }}>
                        <Typography variant="caption" fontWeight={600} color="#137333">{formData.gstFileName}</Typography>
                        <IconButton size="small" onClick={() => handleInputChange("gstFileName", "")} sx={{ ml: 1, p: 0.2 }}><CloseIcon sx={{ fontSize: 14 }} /></IconButton>
                      </Box>
                    ) : (
                      <Button variant="outlined" size="small" onClick={() => selectMockFile("gstFileName", "gst_certificate_doc.pdf")} sx={{ textTransform: "none", color: "#635BFF", borderColor: "#635BFF" }}>
                        Browse File
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            )}
          </CardContent>

          {/* Stepper Navigation Footer Buttons */}
          <Box sx={{ borderTop: "1px solid #EAEAEA", p: 3, bgcolor: "#FAFAFA", display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              sx={{ 
                borderRadius: "8px", 
                textTransform: "none", 
                borderColor: "#D1D5DB", 
                color: "#4B5563",
                fontWeight: 600,
                "&:hover": { borderColor: "#9CA3AF", bgcolor: "#FFFFFF" }
              }}
            >
              Previous Step
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={activeStep === STEPS.length - 1 ? <SaveOutlinedIcon /> : <ArrowForwardIcon />}
              sx={{ 
                borderRadius: "8px", 
                textTransform: "none", 
                bgcolor: "#635BFF", 
                color: "#FFFFFF",
                fontWeight: 600,
                "&:hover": { bgcolor: "#4F46E5" }
              }}
            >
              {activeStep === STEPS.length - 1 ? "Save Configuration" : "Next Step"}
            </Button>
          </Box>
        </Card>
      )}

      {/* Confirmation Modal */}
      <Dialog 
        open={isSubmitDialogOpen} 
        onClose={() => !saving && setIsSubmitDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: "16px", p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Confirm Updates</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to save these updated merchant parameters? Saving will update your profile on the system. Some changes may require administrative approvals before updating live listings.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            disabled={saving} 
            onClick={() => setIsSubmitDialogOpen(false)} 
            sx={{ textTransform: "none", fontWeight: 600, color: "#4B5563" }}
          >
            Cancel
          </Button>
          <Button 
            disabled={saving} 
            onClick={handleSubmitConfirm} 
            variant="contained" 
            sx={{ textTransform: "none", fontWeight: 600, bgcolor: "#635BFF", "&:hover": { bgcolor: "#4F46E5" } }}
          >
            {saving ? <CircularProgress size={20} color="inherit" /> : "Confirm & Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
