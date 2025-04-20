'use client';

import { useEffect, useRef, useCallback } from "react";
import { usePopup } from "@/contexts/PopupContext";
import Image from "next/image";
import styles from "./DashboardProfile.module.sass";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function DashboardProfile() {
  const { user } = useAuthContext();
  const { popups, togglePopup } = usePopup();
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const closePopup = useCallback(() => {
    togglePopup("dashboardProfile", false);
  }, [togglePopup]);

  const imageUrl = user?.image || "/assets/user.jpeg";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const toggleElement = document.querySelector('[data-profile-toggle]');
      if (
        popupRef.current &&
        toggleElement &&
        !popupRef.current.contains(event.target as Node) &&
        !(toggleElement as HTMLElement).contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup]);

  function handleLogout() {
    if (typeof window !== "undefined") {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            console.log("Sign-out successful! Redirecting...");
            router.push("/login");
          },
        },
      }).catch((error) => {
        console.error("Error during logout:", error);
      });
    } else {
      console.error("Logout attempted in non-browser environment.");
    }
  }
  
  useEffect(() => {
    closePopup();
  }, [pathname]);

  return (
    <>
      {popups["dashboardProfile"] && (
        <div id="p-dashboardProfile" className={styles["popup"]} ref={popupRef}>
          <div className={styles["popup__top"]}>
            <div className={`${styles["popup__top__item"]} d-flex`}>
              <Image
                width={35}
                height={35}
                src={imageUrl}
                draggable="false"
                alt="User Profile"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="d-flex flex-col gap-1">
              <div className={styles["popup__top__item"]}>
                <span>{user?.name}</span>
              </div>
              <div className={styles["popup__top__item"]}>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
          <div className={styles["popup__links"]}>
            <div className={styles["popup__links__group"]}>
              <div className={styles["popup__links__item"]}>
                <Link href="/dashboard/account/profile"><i className="fa-regular fa-user" /> View Profile</Link>
              </div>
              <div className={styles["popup__links__item"]}>
                <Link href="/dashboard/account/settings"><i className="fa-regular fa-cog" /> Account Settings</Link>
              </div>
            </div>
            <div className={styles["popup__divider"]}></div>
            <div className={styles["popup__links__group"]}>
              <div className={styles["popup__links__item"]}>
                <Link href="/change-log/latest"><i className="fa-regular fa-clipboard-list" /> Change Log</Link>
              </div>
              <div className={styles["popup__links__item"]}>
                <Link href="/support"><i className="fa-regular fa-circle-info" /> Support</Link>
              </div>
            </div>
            <div className={styles["popup__divider"]}></div>
            <div className={styles["popup__links__group"]}>
              <div className={styles["popup__links__item"]}>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}>
                  <i className="fa-regular fa-right-from-bracket" /> Log Out</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}