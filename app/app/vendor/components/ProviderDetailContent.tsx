"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Paper,
  Rating,
  Divider,
  Avatar,
  IconButton,
  Card,
  CardMedia,
  Stack,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ServiceProvider } from "../../lib/servicesData";

interface ProviderDetailContentProps {
  provider: ServiceProvider;
}

const ProviderDetailContent: React.FC<ProviderDetailContentProps> = ({
  provider,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? provider.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === provider.images.length - 1 ? 0 : prev + 1
    );
  };

  // ...rest of the component...

  return <div>Provider Details</div>;
};

export default ProviderDetailContent;
