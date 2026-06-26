"use client";

import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/navigation";
import useCartStore from "../store/useCartStore";

const CartSidebar: React.FC = () => {
  const router = useRouter();
  const { items, getTotalPrice, getTotalDiscount } = useCartStore();

  const handleViewCart = () => {
    router.push("/cart");
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        position: { xs: "static", md: "sticky" },
        top: 80,
        height: "fit-content",
        maxHeight: { xs: "none", md: "calc(100vh - 100px)" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Get Coupon Section */}
      <Box
        sx={{
          bgcolor: "white",
          border: "1px solid #E3E3E3",
          borderRadius: "12px",
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "#EDF7F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocalOfferIcon sx={{ color: "#05945B", fontSize: 24 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: 0.5 }}>
              Apply coupon
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#757575" }}>
              Get up to 50% off
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "14px",
              color: "#6E42E5",
              borderColor: "#6E42E5",
              borderRadius: "8px",
              px: 2,
              py: 0.75,
              "&:hover": {
                borderColor: "#5932C8",
                bgcolor: "#EEE7FC",
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>

      {/* UC Promise Section */}
      <Box
        sx={{
          bgcolor: "white",
          border: "1px solid #E3E3E3",
          borderRadius: "12px",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            mb: 2,
            color: "#0F0F0F",
          }}
        >
          UC Promise
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {[
            "Verified Professionals",
            "Hassle Free Booking",
            "Transparent Pricing",
            "100% Safe & Secure",
          ].map((promise, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CheckIcon sx={{ color: "#0F0F0F", fontSize: 20 }} />
              <Typography sx={{ fontSize: "14px", color: "#0F0F0F" }}>
                {promise}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Cart Section */}
      <Box
        sx={{
          bgcolor: "white",
          border: items.length > 0 ? "2px solid #6E42E5" : "1px solid #E3E3E3",
          borderRadius: "12px",
          overflow: "hidden",
          maxHeight: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {items.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
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
            <Typography sx={{ color: "#757575", fontSize: "14px" }}>
              No items in your cart
            </Typography>
          </Box>
        ) : (
          <>
            {/* Cart Header */}
            <Box
              sx={{
                p: 2,
                bgcolor: "#F5F5F5",
                borderBottom: "1px solid #E3E3E3",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: 20, color: "#0F0F0F" }}
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0F0F0F",
                  }}
                >
                  {items.length} {items.length === 1 ? "item" : "items"} in cart
                </Typography>
              </Box>
            </Box>

            {/* Cart Items - Scrollable */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                maxHeight: "200px",
              }}
            >
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2,
                    borderBottom: "1px solid #F5F5F5",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0F0F0F",
                      mb: 0.5,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#757575",
                      }}
                    >
                      Qty: {item.quantity}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#0F0F0F",
                      }}
                    >
                      ₹{item.price * item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider />

            {/* Cart Footer */}
            <Box
              sx={{
                bgcolor: "#6E42E5",
                p: 2,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "#5932C8",
                },
              }}
              onClick={handleViewCart}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "white",
                      }}
                    >
                      ₹{getTotalPrice()}
                    </Typography>
                    {getTotalDiscount() > 0 && (
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "rgba(255, 255, 255, 0.7)",
                          textDecoration: "line-through",
                        }}
                      >
                        ₹{getTotalPrice() + getTotalDiscount()}
                      </Typography>
                    )}
                  </Box>
                  {getTotalDiscount() > 0 && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      You save ₹{getTotalDiscount()}
                    </Typography>
                  )}
                </Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  View Cart
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CartSidebar;
