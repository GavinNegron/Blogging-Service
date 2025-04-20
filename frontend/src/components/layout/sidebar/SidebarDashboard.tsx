"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import linkGroups from "@/config/sidebar.json";
import "./SidebarDashboard.sass";
import Search from "@/components/ui/search";

interface LinkItem {
  href: string;
  icon: string;
  text: string;
}

interface LinkGroup {
  header: string;
  collapsable: boolean;
  links: LinkItem[];
}

function Sidebar() {
  const { user, blog } = useAuthContext();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<number, boolean>>({});
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth <= 1109;
      setSidebarCollapsed(shouldCollapse);
      setTextVisible(!shouldCollapse);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("SidebarActive", sidebarCollapsed);
  }, [sidebarCollapsed]);

  const toggleSidebarState = () => {
    setSidebarCollapsed((prevState) => !prevState);
    if (!sidebarCollapsed) {
      setTextVisible(false);
    } else {
      setTimeout(() => setTextVisible(true), 100);
    }
  };

  const toggleGroup = (groupIndex: number) => {
    setCollapsedGroups((prevState) => ({
      ...prevState,
      [groupIndex]: !prevState[groupIndex],
    }));
  };

  const isActive = (href: string) => {
    const normalize = (s: string) => s.replace(/\/+$/, "");
    return normalize(pathname) === normalize(href);
  };

  const imageUrl = user?.image || "/assets/user.jpeg";

  return (
    <aside className={`sidebar no-select ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar__inner">
        <div className="sidebar__top-arrow" onClick={toggleSidebarState}>
          <i
            className={`fa-solid ${sidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"}`}
            style={{ color: "#ffffff" }}
          ></i>
        </div>
        <div className="sidebar__banner no-select cursor-p">
          <div className="sidebar__banner__image d-flex">
            <Image draggable="false" src={imageUrl} width={40} height={40} alt="User Profile Image" />
          </div>
          <div className={`sidebar__banner__content ${textVisible ? "visible" : "hidden"}`}>
            <div className="sidebar__banner__name">
              <span>{blog?.name}</span>
            </div>
            <div className="sidebar__banner__email">
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="my-1">
          <div className="sidebar__search">
            <Search/>
          </div>
          <div className="sidebar__search-icon">
            <i className="fa-regular fa-search cursor-p"></i>
          </div>
        </div>
        <div className="sidebar__links">
          {linkGroups.map((group: LinkGroup, groupIndex: number) => (
            <div key={`group-${groupIndex}`}>
              {groupIndex > 0 && <div className="sidebar__divider"></div>}
              <div
                className="sidebar__group-header cursor-p"
                onClick={() => group.collapsable && toggleGroup(groupIndex)}
              >
                <span>{group.header}</span>
                {group.collapsable && (
                  <i
                    className={`fa-solid ${
                      collapsedGroups[groupIndex] ? "fa-chevron-down" : "fa-chevron-up"
                    } sidebar__group-toggle-icon`}
                  ></i>
                )}
              </div>
              <div
                className={`sidebar__links-group ${
                  collapsedGroups[groupIndex] ? "collapsed" : ""
                }`}
              >
                {group.links.map((item: LinkItem) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar__links-item ${isActive(item.href) ? "active" : ""}`}
                    draggable={false}
                  >
                    <i className={`fa-solid ${item.icon} sidebar__links__icon`}></i>
                    <span className={`sidebar__links__text ${textVisible ? "visible" : "hidden"}`}>
                      {item.text}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
