"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/utils/auth-client";
import { NavbarDashboard } from "@/components/layout/navbar/index";
import { SidebarDashboard } from "@/components/layout/sidebar/index";
import LoadingScreen from "@/components/shared/LoadingScreen";
import "./dashboard.sass";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data);
      setIsLoading(false);
    };

    fetchSession();
  }, []);

  if (isLoading) return <LoadingScreen />;

  if (pathname.startsWith("/dashboard/onboarding")) {
    return <>{children}</>;
  }

  return (
    <>
      <main className="main db">
        <SidebarDashboard/>
        <div className="dashboard">
        <NavbarDashboard  session={session} />
        <div className="dashboard__inner">
          {children}
        </div>
        </div>
      </main>
    </>
  );
}
