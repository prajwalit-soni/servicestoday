"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();

  // Split current url path into active structural string segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Clean formatting tool for mapping segment text
  const formatSegment = (segment: string) => {
    return segment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Box sx={{ width: "100%"}}>
      {/* White Floating Pill Container Card */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          bgcolor: "#FFFFFF",
          borderRadius: "16px", // Gives the exact smooth pill card edges
          py: 1,
          px: 3,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)", // Soft clean drop shadow
        }}
      >
        {/* Page Title Header (Left side of the screen) */}
        <Typography
          variant="h6"
          sx={{
       
            color: "#1E293B", // Deep slate text color
            fontSize: "15px",
             fontWeight: 500
          }}
        >
          {pathSegments.length > 0 
            ? formatSegment(pathSegments[pathSegments.length - 1]) 
            : "Dashboard"}
        </Typography>

        {/* Breadcrumb Links (Right side of the screen) */}
        <Breadcrumbs
          separator={
            <NavigateNextIcon 
              sx={{ 
                color: "#94A3B8", 
                fontSize: "14px", 
                mx: -0.2 
              }} 
            />
          }
          maxItems={3}
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              alignItems: "center",
              flexWrap: "nowrap",
            },
          }}
        >
          {/* Base Dashboard Root Navigation */}
          <Link
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#635BFF", // Exact matching purple tone
              cursor: "pointer",
              "&:hover": { opacity: 0.8 }
            }}
            onClick={() => router.push("/admin")}
          >
            <HomeIcon sx={{ fontSize: "16px" }} />
          </Link>

          {/* Sequentially Maps Folder Architecture Segments */}
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const routeTo = `/${pathSegments.slice(0, index + 1).join("/")}`;

            // Avoid rendering 'admin' route if it overlaps as the 'Home' landing target
            if (segment.toLowerCase() === "admin") return null;

            return isLast ? (
              <Typography
                key={routeTo}
                sx={{
                  color: "#64748B", // Muted terminal grey styling
                  fontWeight: 500,
                  fontSize: "13px",
                }}
              >
                {formatSegment(segment)}
              </Typography>
            ) : (
              <Link
                key={routeTo}
                underline="none"
                sx={{
                  color: "#64748B", // Keeps links clean gray until hovered or active
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "13px",
                  "&:hover": { color: "#635BFF" }
                }}
                onClick={() => router.push(routeTo)}
              >
                {formatSegment(segment)}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>
    </Box>
  );
}
