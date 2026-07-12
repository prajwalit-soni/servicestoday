import React from "react";
import DashboardLayout from "./components/DashboardLayout";
import AuthGuard from "../components/AuthGuard";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthGuard role="admin">
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
}

