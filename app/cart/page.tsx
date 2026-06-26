"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useRouter } from "next/navigation";
import useCartStore from "@/app/store/useCartStore";
import Navbar from "@/app/user/components/Navbar";
import ServicePackageCard from "@/app/components/ServicePackageCard";
import ImageWithFallback from "@/app/components/ImageWithFallback";
import { serviceDetails } from "@/app/lib/mockServiceData";

const CartPage = () => {
  const router = useRouter();
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalDiscount,
  } = useCartStore();

  const subtotal = getTotalPrice() + getTotalDiscount();
  const discount = getTotalDiscount();
  const total = getTotalPrice();

  // Sample recommended services
  const recommendedServices =
    serviceDetails["salon"]?.categories[1]?.packages.slice(0, 3) || [];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFA" }}>
      {/* Header */}
      <Navbar />

      {/* Back Button Header */}
      <Box
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #E3E3E3",
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 , color: "#757575"}}>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
              Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {items.length === 0 ? (
          // Empty Cart
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "12px",
              p: 8,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 3,
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 128 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 34h52l-5.694 30.369A2 2 0 0188.34 66H53.32a4 4 0 01-3.932-3.263L44 34z"
                  fill="#CBCBCB"
                />
                <path
                  d="M34 34h48l-6 32H41.66a2 2 0 01-1.966-1.631L34 34z"
                  fill="#E2E2E2"
                />
              </svg>
            </Box>
            <Typography
              sx={{ fontSize: "20px", fontWeight: 600, mb: 1, color: "#0F0F0F" }}
            >
              Your cart is empty
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#757575", mb: 4 }}>
              Add services to get started
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/")}
              sx={{
                bgcolor: "#6E42E5",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",
                "&:hover": {
                  bgcolor: "#5932C8",
                },
              }}
            >
              Browse Services
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 4 }}>
            {/* Left - Cart Items */}
            <Box sx={{ flex: 1 }}>
              {/* Cart Items List */}
              <Box sx={{ mb: 4 }}>
                {items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      bgcolor: "white",
                      borderRadius: "12px",
                      p: 3,
                      mb: 2,
                      border: "1px solid #E3E3E3",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 3 }}>
                      {/* Image */}
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: "8px",
                          overflow: "hidden",
                          bgcolor: "#F5F5F5",
                          flexShrink: 0,
                        }}
                      >
                        <ImageWithFallback
                          src={item.image || "/assets/images/placeholder.svg"}
                          fallback="/assets/images/placeholder.svg"
                          alt={item.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>

                      {/* Details */}
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "#0F0F0F",
                            }}
                          >
                            {item.title}
                          </Typography>
                          <IconButton
                            onClick={() => removeFromCart(item.id)}
                            sx={{
                              color: "#757575",
                              "&:hover": {
                                color: "#E53935",
                                bgcolor: "#FFEBEE",
                              },
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#757575",
                            mb: 2,
                          }}
                        >
                          Duration: {item.duration}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {/* Price */}
                          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                color: "#0F0F0F",
                              }}
                            >
                              ₹{item.price * item.quantity}
                            </Typography>
                            {item.originalPrice > item.price && (
                              <>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    color: "#757575",
                                    textDecoration: "line-through",
                                  }}
                                >
                                  ₹{item.originalPrice * item.quantity}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#07794C",
                                    fontWeight: 600,
                                  }}
                                >
                                  {Math.round(
                                    ((item.originalPrice - item.price) /
                                      item.originalPrice) *
                                      100
                                  )}
                                  % OFF
                                </Typography>
                              </>
                            )}
                          </Box>

                          {/* Quantity Control */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100px",
                              height: "40px",
                              border: "1px solid #6E42E5",
                              borderRadius: "8px",
                              bgcolor: "#F5F2FD",
                              overflow: "hidden",
                            }}
                          >
                            <Button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              sx={{
                                minWidth: "32px",
                                height: "38px",
                                p: 0,
                                color: item.quantity === 1 ? "#E2D9FA" : "#6E42E5",
                                "&:hover": {
                                  bgcolor: "transparent",
                                },
                              }}
                            >
                              <RemoveIcon sx={{ fontSize: 18 }} />
                            </Button>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#6E42E5",
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <Button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              sx={{
                                minWidth: "32px",
                                height: "38px",
                                p: 0,
                                color: "#6E42E5",
                                "&:hover": {
                                  bgcolor: "transparent",
                                },
                              }}
                            >
                              <AddIcon sx={{ fontSize: 18 }} />
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* People Also Like */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#0F0F0F",
                    mb: 3,
                  }}
                >
                  People also like
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {recommendedServices.map((pkg) => (
                    <ServicePackageCard key={pkg.id} package={pkg} />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Right - Payment Summary */}
            <Box
              sx={{
                width: "400px",
                position: "sticky",
                top: 90,
                height: "fit-content",
              }}
            >
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "12px",
                  border: "1px solid #E3E3E3",
                  overflow: "hidden",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    p: 3,
                    borderBottom: "1px solid #E3E3E3",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#0F0F0F",
                    }}
                  >
                    Payment Summary
                  </Typography>
                </Box>

                {/* Coupon Section */}
                <Box sx={{ p: 3, borderBottom: "1px solid #E3E3E3" }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      placeholder="Enter coupon code"
                      variant="outlined"
                      size="small"
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#6E42E5",
                        color: "white",
                        px: 3,
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          bgcolor: "#5932C8",
                        },
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>

                {/* Price Breakdown */}
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", color: "#545454" }}>
                        Subtotal
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#0F0F0F" }}>
                        ₹{subtotal}
                      </Typography>
                    </Box>

                    {discount > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontSize: "14px", color: "#07794C" }}>
                          Discount
                        </Typography>
                        <Typography
                          sx={{ fontSize: "14px", color: "#07794C", fontWeight: 600 }}
                        >
                          -₹{discount}
                        </Typography>
                      </Box>
                    )}

                    <Divider />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "16px", fontWeight: 600, color: "#0F0F0F" }}
                      >
                        Total
                      </Typography>
                      <Typography
                        sx={{ fontSize: "20px", fontWeight: 600, color: "#0F0F0F" }}
                      >
                        ₹{total}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Checkout Button */}
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "#6E42E5",
                      color: "white",
                      py: 1.5,
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "16px",
                      "&:hover": {
                        bgcolor: "#5932C8",
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
