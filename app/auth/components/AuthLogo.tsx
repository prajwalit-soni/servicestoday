"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function AuthLogo() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        //  mb: 4,
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <Box sx={{ width: 100, height: 100, position: "relative" }}>
        <Image
          src="/assets/images/logo.png"
          alt="Shoptera logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>
      {/* <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', letterSpacing: '0.5px' }}>
        Shoptera
      </Typography> */}
    </Box>
  );
}
