"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/utils/auth-client";
import "./SidebarDashboard.sass";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

interface SidebarProps {
  user?: User | null;
}

function Sidebar({ user }: SidebarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    setSidebarCollapsed(window.innerWidth <= 1109);

    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth <= 1109);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("SidebarActive", sidebarCollapsed);
  }, [sidebarCollapsed]);

  const toggleSidebarState = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); 
        },
      },
    });
  };

  return (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar__top d-flex align-items-center">
        <div className="sidebar__top-logo">
          <Link href="/" draggable="false" className="sidebar__top-logo-name">
            Dashboard
          </Link>
          <div className="sidebar__top-logo-img">
            <img src="/placeholder.png" alt="Placeholder Logo" />
          </div>
        </div>
        <div className="sidebar__top-arrow" onClick={toggleSidebarState}>
          <i className={`fa-solid ${sidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"}`} style={{ color: "#ffffff" }}></i>
        </div>
      </div>

      <div className="sidebar__profile">
        <div className="sidebar__profile-icon">
          <img src={user?.image || "/user.jpeg"} draggable="false" alt="User Profile" />
        </div>
        <div className="d-flex flex-col">
          <span className="sidebar__profile-name">{user?.name || "Guest"}</span>
          <span className="sidebar__profile-email">{user?.email || "No email"}</span>
        </div>
      </div>

      <div className="sidebar__links">
        <Link href="/dashboard/" className="sidebar__links-item" draggable="false">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-chart-line" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">Dashboard</div>
        </Link>

        <Link href="/dashboard/posts" className="sidebar__links-item" draggable="false">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-newspaper" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">Posts</div>
        </Link>

        <Link href="/dashboard/authors" className="sidebar__links-item" draggable="false">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-users" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">Authors</div>
        </Link>

        <Link href="/dashboard/messages" className="sidebar__links-item" draggable="false">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-envelope" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">Messages</div>
        </Link>

        <Link href="/dashboard/logs" className="sidebar__links-item" draggable="false">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-file-lines" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">Logs</div>
        </Link>

        <Link href="/dashboard/settings" className="sidebar__links-item" draggable="false">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-gear" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">Settings</div>
        </Link>
      </div>

      <div className="sidebar__bottom d-flex align-items-center flex-col">
        <span className="sidebar__links-line"></span>
        <div className="sidebar__links-item" id="logout-btn" onClick={handleLogout}>
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-right-from-bracket" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">
            <span>Logout</span>
          </div>
        </div>
        <div className="sidebar__links-item toggle">
          <div className="sidebar__links-item-icon">
            <i className="fa-solid fa-moon" style={{ color: "#ffffff" }}></i>
          </div>
          <div className="sidebar__links-item-text">
            <span>Theme</span>
          </div>
          <div className="sidebar__links-item-toggle">
            <i className="fa-solid fa-2xl fa-toggle-on" style={{ color: "#ffffff" }}></i>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;