"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ImageWithFallback from "./ImageWithFallback";
import CheckIcon from "@mui/icons-material/Check";

interface ServiceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    duration: string;
    rating: number;
    reviews: string;
    image: string;
    whatWeProvide?: string[];
    benefits?: string[];
    howItWorks?: string[];
    description_sections?: Array<{ header: string; details: string[] }>;
  };
}

const ViewDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  open,
  onClose,
  service,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header with Image */}
        <Box sx={{ position: "relative" }}>
          <ImageWithFallback
            src={service.image || "/assets/images/placeholder.svg"}
            fallback="/assets/images/placeholder.svg"
            alt={service.title}
            sx={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4 }}>
          {/* Title and Rating */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#0F0F0F",
                mb: 1,
              }}
            >
              {service.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <StarIcon sx={{ fontSize: 18, color: "#FFB800" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0F0F0F",
                  }}
                >
                  {service.rating}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#545454",
                  }}
                >
                  ({service.reviews})
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 18, color: "#545454" }} />
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#545454",
                  }}
                >
                  {service.duration}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#0F0F0F",
                }}
              >
                ₹{service.price}
              </Typography>
              {service.originalPrice && (
                <>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#757575",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{service.originalPrice}
                  </Typography>
                  <Chip
                    label={`${Math.round(((service.originalPrice - service.price) / service.originalPrice) * 100)}% OFF`}
                    sx={{
                      bgcolor: "#EDF7F2",
                      color: "#07794C",
                      fontSize: "12px",
                      fontWeight: 600,
                      height: "24px",
                    }}
                  />
                </>
              )}
            </Box>
          </Box>

          {/* Description */}
          {service.description && (
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#545454",
                  lineHeight: 1.6,
                }}
              >
                {service.description}
              </Typography>
            </Box>
          )}

          {/* Dynamic description sections or fallback */}
          {service.description_sections && service.description_sections.length > 0 ? (
            service.description_sections.map((section, idx) => {
              const isHowItWorks = section.header.toLowerCase().trim() === "how it works";
              if (isHowItWorks) {
                return (
                  <Box key={idx} sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#0F0F0F",
                        mb: 2,
                      }}
                    >
                      {section.header}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {section.details.map((step, stepIdx) => (
                        <Box
                          key={stepIdx}
                          sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                        >
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              bgcolor: "#EEE7FC",
                              color: "#6E42E5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 600,
                              fontSize: "14px",
                              flexShrink: 0,
                            }}
                          >
                            {stepIdx + 1}
                          </Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#0F0F0F",
                              lineHeight: 1.6,
                              pt: 0.5,
                            }}
                          >
                            {step}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                );
              } else {
                const iconColor = idx % 2 === 0 ? "#07794C" : "#6E42E5";
                return (
                  <Box key={idx} sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#0F0F0F",
                        mb: 2,
                      }}
                    >
                      {section.header}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {section.details.map((detail, detailIdx) => (
                        <Box
                          key={detailIdx}
                          sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                        >
                          <CheckIcon
                            sx={{
                              fontSize: 20,
                              color: iconColor,
                              mt: 0.2,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#0F0F0F",
                              lineHeight: 1.6,
                            }}
                          >
                            {detail}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                );
              }
            })
          ) : (
            <>
              {/* What We Provide */}
              {service.whatWeProvide && service.whatWeProvide.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#0F0F0F",
                      mb: 2,
                    }}
                  >
                    What we provide
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {service.whatWeProvide.map((item, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                      >
                        <CheckIcon
                          sx={{
                            fontSize: 20,
                            color: "#07794C",
                            mt: 0.2,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#0F0F0F",
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#0F0F0F",
                      mb: 2,
                    }}
                  >
                    Benefits
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {service.benefits.map((benefit, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                      >
                        <CheckIcon
                          sx={{
                            fontSize: 20,
                            color: "#6E42E5",
                            mt: 0.2,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#0F0F0F",
                            lineHeight: 1.6,
                          }}
                        >
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* How It Works */}
              {service.howItWorks && service.howItWorks.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#0F0F0F",
                      mb: 2,
                    }}
                  >
                    How it works
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {service.howItWorks.map((step, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            bgcolor: "#EEE7FC",
                            color: "#6E42E5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            fontSize: "14px",
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#0F0F0F",
                            lineHeight: 1.6,
                            pt: 0.5,
                          }}
                        >
                          {step}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsModal;
