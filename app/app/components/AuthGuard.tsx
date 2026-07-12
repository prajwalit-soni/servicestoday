"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { Box, CircularProgress } from "@mui/material";

interface AuthGuardProps {
  children: React.ReactNode;
  role?: string | string[];
  allowUnauthenticated?: boolean;
}

export default function AuthGuard({ children, role, allowUnauthenticated = false }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role: userRole } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const roles = React.useMemo(() => {
    if (!role) return [];
    return Array.isArray(role) ? role : [role];
  }, [role]);

  const hasAccess = React.useMemo(() => {
    if (!role) return true;
    return roles.includes(userRole || "");
  }, [role, roles, userRole]);

  useEffect(() => {
    if (isMounted) {
      if (!isAuthenticated) {
        if (!allowUnauthenticated) {
          router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        }
      } else if (role && !hasAccess) {
        // Redirect to appropriate dashboard if role does not match
        if (userRole === "admin") {
          router.push("/admin");
        } else if (userRole === "vendor" || userRole === "partner") {
          router.push("/vendor");
        } else {
          router.push("/");
        }
      }
    }
  }, [isMounted, isAuthenticated, userRole, role, hasAccess, allowUnauthenticated, router]);

  if (!isMounted) {
    return null;
  }

  if ((!isAuthenticated && !allowUnauthenticated) || (isAuthenticated && role && !hasAccess)) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <>{children}</>;
}
