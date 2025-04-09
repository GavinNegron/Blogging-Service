"use client";

import React from 'react';
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavbarDashboard } from "../../components/layout/navbar/index";
import { SidebarDashboard } from "../../components/layout/sidebar/index";
import { PopupProvider } from "@/contexts/PopupContext"; 
import { PostProvider } from "@/contexts/PostContext";
import { AuthProvider } from '@/contexts/AuthContext';
import "./dashboard.sass";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/onboarding")) {
    return <>{children}</>;
  }

  const session = 'null';

  return (
    <AuthProvider>  
      <PopupProvider>
        <PostProvider>
          <main className="main db">
            <SidebarDashboard />
            <div className="dashboard">
              <NavbarDashboard session={session} />
              <div className="dashboard__inner">           
                {children}
              </div>
            </div>
          </main>
        </PostProvider>
      </PopupProvider>
    </AuthProvider>
  );
}