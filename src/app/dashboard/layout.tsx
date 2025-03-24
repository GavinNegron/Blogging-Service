"use client";

import { ReactNode } from "react";
import { NavbarDashboard } from "@/components/navbar/index";
import { SidebarDashboard } from "@/components/sidebar/index";
import { usePathname } from "next/navigation";
import { authClient } from "@/utils/auth-client";
import "./dashboard.sass";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session } = await authClient.getSession()

  console.log(session)
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/onboarding")) {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarDashboard />
      <main className="main db">
        <SidebarDashboard />
        <div className="dashboard">{children}</div>
      </main>
    </>
  );
}