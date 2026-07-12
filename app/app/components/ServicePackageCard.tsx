"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ServicePackage } from "../lib/mockServiceData";
import useCartStore from "../store/useCartStore";
import EditPackageModal from "./EditPackageModal";
import ViewDetailsModal from "./ViewDetailsModal";
import ImageWithFallback from "./ImageWithFallback";

interface ServicePackageCardProps {
  package: ServicePackage;
}

const ServicePackageCard: React.FC<ServicePackageCardProps> = ({ package: pkg }) => {
  const [quantity, setQuantity] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const { addToCart, updateQuantity, items } = useCartStore();

  // Check if this package is already in cart
  const cartItem = items.find((item) => item.packageId === pkg.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart({
      id: `${pkg.id}-${Date.now()}`,
      serviceId: "current-service",
      packageId: pkg.id,
      title: pkg.title,
      duration: pkg.duration,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      image: pkg.image,
    });
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 0) {
      updateQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };

  // Prepare package services for EditPackageModal
  const packageServices = pkg.items
    ? pkg.items.map((item, index) => ({
        id: `${pkg.id}-item-${index}`,
        category: item.category,
        name: item.service,
        price: Math.round(pkg.price / pkg.items!.length),
        selected: true,
        variants: item.service.includes("RICA")
          ? [
              { label: "RICA gold", price: 669 },
              { label: "RICA honey", price: 569 },
              { label: "RICA chocolate", price: 469 },
            ]
          : undefined,
      }))
    : [];

  const handleSavePackage = (selectedServices: any[]) => {
    console.log("Updated package services:", selectedServices);
  };

  const discount = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : 0;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        bgcolor: "white",
        borderRadius: "8px",
        p: 3,
        border: "1px solid #E3E3E3",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      }}
    >
      {/* Left Content */}
      <Box sx={{ flex: 1 }}>
        {/* Package Tag */}
        {pkg.isPackage && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
            <BookmarkIcon sx={{ color: "#0B5459", fontSize: 16 }} />
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#0B5459",
              }}
            >
              {pkg.tag || "PACKAGE"}
            </Typography>
          </Box>
        )}

        {/* Title */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "24px",
            mb: 1,
            color: "#0F0F0F",
          }}
        >
          {pkg.title}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              bgcolor: "#572AC8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StarIcon sx={{ color: "white", fontSize: 12 }} />
          </Box>
          <Typography sx={{ fontSize: "12px", color: "#545454" }}>
            {pkg.rating} ({pkg.reviews})
          </Typography>
        </Box>

        {/* Price and Duration */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#0F0F0F",
            }}
          >
            ₹{pkg.price}
          </Typography>
          {pkg.originalPrice && (
            <Typography
              sx={{
                fontSize: "12px",
                color: "#545454",
                textDecoration: "line-through",
              }}
            >
              ₹{pkg.originalPrice}
            </Typography>
          )}
          <FiberManualRecordIcon sx={{ fontSize: 8, color: "#545454" }} />
          <Typography sx={{ fontSize: "12px", color: "#545454" }}>
            {pkg.duration}
          </Typography>
          {pkg.location && (
            <>
              <FiberManualRecordIcon sx={{ fontSize: 8, color: "#545454" }} />
              <Typography sx={{ fontSize: "12px", color: "#07794C", fontWeight: 600 }}>
                {pkg.location}
              </Typography>
            </>
          )}
        </Box>

        {/* Package Items */}
        {pkg.items && pkg.items.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                height: "1px",
                bgcolor: "#E2E2E2",
                mb: 2,
              }}
            />
            {pkg.items.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 0.5,
                  mb: 1,
                  alignItems: "flex-start",
                }}
              >
                <FiberManualRecordIcon
                  sx={{ fontSize: 8, color: "#545454", mt: 0.5 }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#0F0F0F",
                    lineHeight: "16px",
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {item.category}
                  </Box>
                  : {item.service}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Description for non-package items */}
        {!pkg.items && pkg.description && (
          <Typography
            sx={{
              fontSize: "12px",
              color: "#545454",
              mb: 2,
            }}
          >
            {pkg.description}
          </Typography>
        )}

        {/* Edit Package Button */}
        {pkg.isPackage && (
          <Button
            variant="outlined"
            onClick={() => setEditModalOpen(true)}
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#0F0F0F",
              borderColor: "#E3E3E3",
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "#6E42E5",
                bgcolor: "#F5F2FD",
              },
            }}
          >
            Edit your package
          </Button>
        )}

        {/* View Details Link */}
        <Button
          variant="text"
          onClick={() => setDetailsModalOpen(true)}
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#6E42E5",
            textTransform: "none",
            p: 0,
            mt: 1,
            minWidth: "auto",
            "&:hover": {
              bgcolor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          View details
        </Button>
      </Box>

      {/* Right Content - Image and Add Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: "128px",
            height: "128px",
            borderRadius: "8px",
            overflow: "hidden",
            bgcolor: "#F5F5F5",
          }}
        >
          <ImageWithFallback
            src={pkg.image || "/assets/images/placeholder.svg"}
            fallback="/assets/images/placeholder.svg"
            alt={pkg.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Add/Quantity Control */}
        {currentQuantity === 0 ? (
          <Button
            onClick={handleAdd}
            variant="outlined"
            sx={{
              width: "80px",
              height: "36px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#6E42E5",
              borderColor: "#C5B4F5",
              bgcolor: "white",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": {
                borderColor: "#6E42E5",
                bgcolor: "#F5F2FD",
              },
            }}
          >
            Add
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80px",
              height: "36px",
              border: "1px solid #6E42E5",
              borderRadius: "8px",
              bgcolor: "#F5F2FD",
              overflow: "hidden",
            }}
          >
            <Button
              onClick={handleDecrement}
              sx={{
                minWidth: "26px",
                height: "34px",
                p: 0,
                color: currentQuantity === 1 ? "#E2D9FA" : "#6E42E5",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <RemoveIcon sx={{ fontSize: 16 }} />
            </Button>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#6E42E5",
              }}
            >
              {currentQuantity}
            </Typography>
            <Button
              onClick={handleIncrement}
              sx={{
                minWidth: "26px",
                height: "34px",
                p: 0,
                color: "#6E42E5",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <AddIcon sx={{ fontSize: 16 }} />
            </Button>
          </Box>
        )}
      </Box>

      {/* Modals */}
      <EditPackageModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        packageName={pkg.title}
        duration={pkg.duration}
        services={packageServices}
        onSave={handleSavePackage}
      />
      <ViewDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        service={{
          title: pkg.title,
          description: pkg.description || "Professional service at your doorstep",
          price: pkg.price,
          originalPrice: pkg.originalPrice,
          duration: pkg.duration,
          rating: pkg.rating,
          reviews: pkg.reviews,
          image: pkg.image,
          description_sections: pkg.description_sections,
          whatWeProvide: [
            "Trained and certified professionals",
            "100% hygienic and sanitized equipment",
            "Premium quality products",
            "Flexible timing as per your convenience",
          ],
          benefits: [
            "Save time and effort",
            "Professional service quality",
            "Affordable pricing",
            "Safe and comfortable experience at home",
          ],
          howItWorks: [
            "Book your service online or through the app",
            "Our professional will reach your location at the scheduled time",
            "Enjoy the service in the comfort of your home",
            "Make payment after the service is completed",
          ],
        }}
      />
    </Box>
  );
};

export default ServicePackageCard;
