"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useRouter } from "next/navigation";
import useCartStore from "../store/useCartStore";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { getTotalItems } = useCartStore();
  const [cartItemCount, setCartItemCount] = useState(0);
  
  useEffect(() => {
    setCartItemCount(getTotalItems());
  }, [getTotalItems]);

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #E3E3E3",
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          minHeight: { xs: 64, md: 72 },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleLogoClick}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#6E42E5",
              letterSpacing: "-0.5px",
            }}
          >
            Shoptera
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Search */}
          <IconButton
            sx={{
              color: "#0F0F0F",
              "&:hover": {
                bgcolor: "#F5F5F5",
              },
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* Cart */}
          <IconButton
            onClick={handleCartClick}
            sx={{
              color: "#0F0F0F",
              "&:hover": {
                bgcolor: "#F5F5F5",
              },
            }}
          >
            <Badge
              badgeContent={cartItemCount}
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#6E42E5",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "12px",
                },
              }}
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          {/* Profile */}
          <IconButton
            sx={{
              color: "#0F0F0F",
              "&:hover": {
                bgcolor: "#F5F5F5",
              },
            }}
          >
            <PersonOutlineIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
