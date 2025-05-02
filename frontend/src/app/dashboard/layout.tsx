"use client";

import React, { useState, useEffect } from 'react';
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NavbarDashboard } from "../../components/layout/navbar/index";
import { SidebarDashboard } from "../../components/layout/sidebar/index";
import { PopupProvider } from "@/contexts/PopupContext";
import { PostProvider } from "@/contexts/PostContext";
import { AuthProvider } from '@/contexts/AuthContext';
import "./styles.sass";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [shouldRenderLayout, setShouldRenderLayout] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const excludedPaths = ['/dashboard/editor', '/dashboard/onboarding'];
    const isExcludedPath = excludedPaths.some((path) => pathname.startsWith(path));
    
    const host = window.location.host;
    const excludedSubdomains = ['editor'];
    const isExcludedSubdomain = excludedSubdomains.some((subdomain) => 
      host.startsWith(`${subdomain}.`)
    );
    
    setShouldRenderLayout(!isExcludedPath && !isExcludedSubdomain);
    
    setIsLoading(false);
  }, [pathname]);

  if (isLoading) {
    return null;
  }

  if (!shouldRenderLayout) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <PopupProvider>
        <PostProvider>
          <main className="main db">
            <div className="dashboard">
              <SidebarDashboard />
                <div className="dashboard__inner">
                  <NavbarDashboard />
                  <div className="dashboard__content">{children}</div>
                </div>
            </div>
          </main>
        </PostProvider>
      </PopupProvider>
    </AuthProvider>
  );
}