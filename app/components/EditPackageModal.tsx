"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Checkbox,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RemoveIcon from "@mui/icons-material/Remove";

interface PackageServiceItem {
  id: string;
  category: string;
  name: string;
  price: number;
  variants?: { label: string; price: number }[];
  selected: boolean;
  selectedVariant?: string;
}

interface EditPackageModalProps {
  open: boolean;
  onClose: () => void;
  packageName: string;
  duration: string;
  services: PackageServiceItem[];
  onSave: (selectedServices: PackageServiceItem[]) => void;
}

const EditPackageModal: React.FC<EditPackageModalProps> = ({
  open,
  onClose,
  packageName,
  duration,
  services: initialServices,
  onSave,
}) => {
  const [services, setServices] = useState<PackageServiceItem[]>(initialServices);

  const handleToggleService = (id: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, selected: !service.selected } : service
      )
    );
  };

  const handleVariantChange = (id: string, variant: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, selectedVariant: variant } : service
      )
    );
  };

  const handleSave = () => {
    onSave(services);
    onClose();
  };

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, PackageServiceItem[]>);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid #EDEDED",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#0F0F0F",
                mb: 1,
              }}
            >
              {packageName}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeIcon sx={{ fontSize: 16, color: "#545454" }} />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#545454",
                }}
              >
                {duration}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} sx={{ color: "#0F0F0F" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Services List */}
        <Box sx={{ p: 3, maxHeight: "60vh", overflowY: "auto" }}>
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <Box key={category} sx={{ mb: 4 }}>
              {/* Category Header */}
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#0F0F0F",
                  mb: 2,
                }}
              >
                {category}
              </Typography>

              {/* Category Services */}
              {categoryServices.map((service) => (
                <Box
                  key={service.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                    pb: 2,
                    borderBottom:
                      categoryServices[categoryServices.length - 1].id !== service.id
                        ? "1px solid #F5F5F5"
                        : "none",
                  }}
                >
                  {/* Checkbox */}
                  <Checkbox
                    checked={service.selected}
                    onChange={() => handleToggleService(service.id)}
                    disabled={!service.selected && categoryServices.some((s) => s.selected)}
                    icon={
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          border: "2px solid #C7C7C7",
                          borderRadius: "4px",
                        }}
                      />
                    }
                    checkedIcon={
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          bgcolor: "#6E42E5",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path
                            d="M1 5L4.5 8.5L11 1.5"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                    }
                    indeterminateIcon={
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          bgcolor: "#C7C7C7",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <RemoveIcon sx={{ fontSize: 12, color: "#FFFFFF" }} />
                      </Box>
                    }
                    sx={{ p: 0 }}
                  />

                  {/* Service Details */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#0F0F0F",
                        mb: 0.5,
                      }}
                    >
                      {service.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#545454",
                      }}
                    >
                      ₹{service.price}
                    </Typography>
                  </Box>

                  {/* Variant Selector */}
                  {service.variants && service.variants.length > 0 && (
                    <FormControl size="small">
                      <Select
                        value={service.selectedVariant || service.variants[0].label}
                        onChange={(e) => handleVariantChange(service.id, e.target.value)}
                        disabled={!service.selected}
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0F0F0F",
                          bgcolor: "white",
                          border: "1px solid #E3E3E3",
                          borderRadius: "8px",
                          minWidth: "120px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                      >
                        {service.variants.map((variant) => (
                          <MenuItem key={variant.label} value={variant.label}>
                            {variant.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid #EDEDED",
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              color: "#0F0F0F",
              borderColor: "#E3E3E3",
              "&:hover": {
                borderColor: "#C7C7C7",
                bgcolor: "#F5F5F5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              flex: 1,
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              bgcolor: "#6E42E5",
              "&:hover": {
                bgcolor: "#5932C8",
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditPackageModal;
