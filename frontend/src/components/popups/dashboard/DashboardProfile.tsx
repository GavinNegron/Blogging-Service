'use client'

import { useEffect, useRef, Fragment, useCallback } from "react"
import { usePopup } from "@/contexts/PopupContext"
import Image from "next/image"
import styles from "./DashboardProfile.module.sass"
import { useAuthContext } from "@/contexts/AuthContext"
import Link from "next/link"
import linkGroups from "@/config/popups/DashboardProfile.json"

export default function DashboardProfile() {
  const { user } = useAuthContext()
  const { popups, togglePopup } = usePopup()
  const popupRef = useRef<HTMLDivElement>(null)

  const closePopup = useCallback(() => {
    togglePopup("dashboardProfile", false)
  }, [togglePopup])

  const imageUrl = user?.image || "/user.jpeg"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const toggleElement = document.querySelector('[data-profile-toggle]')
      if (
        popupRef.current &&
        toggleElement &&
        !popupRef.current.contains(event.target as Node) &&
        !(toggleElement as HTMLElement).contains(event.target as Node)
      ) {
        closePopup()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [closePopup])

  return (
    <>
      {popups["dashboardProfile"] && (
        <div id="p-dashboardProfile" className={styles["popup"]} ref={popupRef}>
          <div className={styles["popup__top"]}>
            <div className={styles["popup__top__item"]}>
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
            {linkGroups.map((group, idx) => (
              <Fragment key={idx}>
                <div className={styles["popup__links__group"]}>
                  {group.items.map((item, i) => (
                    <div key={i} className={styles["popup__links__item"]}>
                      <Link href={item.href}>
                        <i className={`fa-regular ${item.icon}`} /> {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
                {idx < linkGroups.length - 1 && <div className={styles["popup__divider"]}></div>}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  )
}