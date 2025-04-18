"use client";

import React, { Suspense } from 'react';
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NavbarDashboard } from "../../components/layout/navbar/index";
import { SidebarDashboard } from "../../components/layout/sidebar/index";
import { PopupProvider } from "@/contexts/PopupContext"; 
import { PostProvider } from "@/contexts/PostContext";
import { AuthProvider } from '@/contexts/AuthContext';
import Loading from './loading';
import "./dashboard.sass";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/onboarding")) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>  
      <PopupProvider>
        <PostProvider>
          <main className="main db">
            <div className="dashboard">
              <SidebarDashboard />
              <Suspense fallback={<Loading/>}>
                <div className="dashboard__inner">       
                  <NavbarDashboard/>
                    <div className="dashboard__content">{children}</div>
                </div>
              </Suspense>
            </div>
          </main>
        </PostProvider>
      </PopupProvider>
    </AuthProvider>
  );
}