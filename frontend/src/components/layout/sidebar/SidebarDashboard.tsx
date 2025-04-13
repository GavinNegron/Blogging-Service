"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/contexts/AuthContext"
import "./SidebarDashboard.sass"

function Sidebar() {
  const { user, blog } = useAuthContext();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [textVisible, setTextVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const initialCollapsed = window.innerWidth <= 1109
    setSidebarCollapsed(initialCollapsed)
    setTextVisible(!initialCollapsed)

    const handleResize = () => {
      const shouldCollapse = window.innerWidth <= 1109
      setSidebarCollapsed(shouldCollapse)
      setTextVisible(!shouldCollapse)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle("SidebarActive", sidebarCollapsed)
  }, [sidebarCollapsed])

  const toggleSidebarState = () => {
    setSidebarCollapsed(prevState => !prevState)
    if (sidebarCollapsed) {
      setTimeout(() => setTextVisible(true), 50)
    } else {
      setTextVisible(false)
    }
  }

  const isActive = (href: string) => {
    const normalize = (s: string) => s.replace(/\/+$/, "")
    return normalize(pathname) === normalize(href)
  }

  const imageUrl = user?.image || '/user.jpeg';

  return (
    <aside className={`sidebar no-select ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar__top-arrow" onClick={toggleSidebarState}>
        <i className={`fa-solid ${sidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"}`} style={{ color: "#ffffff" }}></i>
      </div>
      <div className="sidebar__banner">
        <div className="sidebar__banner__image">
          <Image src={imageUrl} width='40' height='40' alt="logo" />
        </div>
        <div className="sidebar__banner__content">
          <div className={`sidebar__banner__name ${textVisible ? "visible" : "hidden"}`}>
            <span>{blog?.name}</span>
          </div>
          <div className="sidebar__banner__email">
            <span>{user?.email}</span>
          </div>
        </div>
      </div>
      <div className="sidebar__links">
        <Link href="/dashboard/" className={`sidebar__links-item ${isActive("/dashboard") ? "active" : ""}`} draggable="false">
          <i className="fa-solid fa-chart-line sidebar__links__icon" style={{ color: "#ffffff" }}></i>
          <span className={`sidebar__links__text ${textVisible ? "visible" : "hidden"}`}>Home</span>
        </Link>
        <Link href="/dashboard/blog" className={`sidebar__links-item ${isActive("/dashboard/blog") ? "active" : ""}`} draggable="false">
          <i className="fa-solid fa-newspaper sidebar__links__icon" style={{ color: "#ffffff" }}></i>
          <span className={`sidebar__links__text ${textVisible ? "visible" : "hidden"}`}>Blog</span>
        </Link>
        <Link href="/dashboard/authors" className={`sidebar__links-item ${isActive("/dashboard/authors") ? "active" : ""}`} draggable="false">
          <i className="fa-solid fa-users sidebar__links__icon" style={{ color: "#ffffff" }}></i>
          <span className={`sidebar__links__text ${textVisible ? "visible" : "hidden"}`}>Authors</span>
        </Link>
        <Link href="/dashboard/messages" className={`sidebar__links-item ${isActive("/dashboard/messages") ? "active" : ""}`} draggable="false">
          <i className="fa-solid fa-envelope sidebar__links__icon" style={{ color: "#ffffff" }}></i>
          <span className={`sidebar__links__text ${textVisible ? "visible" : "hidden"}`}>Messages</span>
        </Link>
        <Link href="/dashboard/logs" className={`sidebar__links-item ${isActive("/dashboard/logs") ? "active" : ""}`} draggable="false">
          <i className="fa-solid fa-file-lines sidebar__links__icon" style={{ color: "#ffffff" }}></i>
          <span className={`sidebar__links__text ${textVisible ? "visible" : "hidden"}`}>Logs</span>
        </Link>
        <Link href="/dashboard/settings" className={`sidebar__links-item ${isActive("/dashboard/settings") ? "active" : ""}`} draggable="false">
          <i className="fa-solid fa-gear sidebar__links__icon" style={{ color: "#ffffff" }}></i>
          <span className={`sidebar__links__text ${textVisible ? "visible" : "hidden"}`}>Settings</span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar