"use client";
import React from "react";
import Grid from "@mui/material/Grid"; // Using modern Grid2 as established
import Box from "@mui/material/Box";
import MetricCard from "./components/MetricCard"; // Updated import alias path

// Icons
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import TableViewIcon from "@mui/icons-material/TableView";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AdminBreadcrumbs from "./components/AdminBreadcrumbs";

export default function DashboardHome() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
           {/* <AdminBreadcrumbs /> */}
        {/* Total Earning Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <MetricCard
            type="purple"
            title="Total Earning"
            value="$500.00"
            icon={<AccountBalanceWalletOutlinedIcon sx={{ color: "#fff" }} />}
          />
        </Grid>

        {/* Total Order Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <MetricCard
            type="blue"
            title="Total Order"
            value="$961"
            icon={<LocalMallOutlinedIcon sx={{ color: "#fff" }} />}
          />
        </Grid>

        {/* Stacked Side Metrics Column */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <MetricCard
            type="split-top"
            title="Total Income"
            value="$203k"
            icon={<TableViewIcon />}
          />
          <MetricCard
            type="split-bottom"
            title="Total Income"
            value="$203k"
            icon={<StorefrontIcon />}
          />
        </Grid>
        
      </Grid>
    </Box>
  );
}
