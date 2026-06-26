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

  // ...rest of the component...

  return <div>Edit Package Modal</div>;
};

export default EditPackageModal;
