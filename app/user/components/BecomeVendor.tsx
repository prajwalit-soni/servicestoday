"use client";

import React from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import Link from "next/link";
export default function BecomeVendor() {
  return (
    <Box sx={{ mt: 10 }}>
      <Box
        sx={{
          backgroundColor: "#0a4235",
          borderRadius: "24px",
          p: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "#ffffff",
              fontWeight: "bold",
              mb: 2,
              fontFamily: "inherit",
            }}
          >
            Become Partner / Vendor
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#b2c8c4",
              lineHeight: 1.6,
            }}
          >
            Join our marketplace to showcase your products, provide premium services,
            and scale your business with our dedicated merchant and partner tools.
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          sx={{
            width: { xs: "100%", md: "auto" },
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <Button
            
              component={Link}
              href="/auth-vendor/register"
          
              sx={{
                backgroundColor: "#ffffff",
 
                color: "#0a4235",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "30px",
                px: 4,
                py: 1.4,
                width: { xs: "100%", sm: "auto" },
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#",
                  boxShadow: "none",
                },
              }}
            >
              Become Partner / Vendor
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
