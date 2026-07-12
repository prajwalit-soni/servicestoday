import React from "react";
import DashboardLayout from "../admin/components/DashboardLayout";
import AuthGuard from "../components/AuthGuard";

export default function VendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard role={["vendor", "partner"]}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
}