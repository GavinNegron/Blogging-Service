"use client"

import { lazy } from "react"
import Link from "next/link"
import styles from "./NavbarDashboard.module.sass"
import Image from "next/image"
import { useAuthContext } from "@/contexts/AuthContext"
import { usePopup } from "@/contexts/PopupContext"

const DashboardProfile = lazy(() => import("@/components/popups/dashboard/DashboardProfile/"))

const NavbarDashboard = () => {
  const { togglePopup, popups } = usePopup()
  const { session } = useAuthContext()

  const imageUrl = session?.user?.image || "/assets/user.jpeg"
  const isProfileOpen = popups["dashboardProfile"]

  return (
    <>
      <div className={`${styles.navbar} no-select`}>
        <div className={styles.navbar__item}>
          <span>
            <Link href="/dashboard">PLACEHOLDER</Link>
          </span>
        </div>
        <div className={`${styles.navbar__item} d-flex`}>
          <button>
            <i className="fa-regular fa-bell"></i>
          </button>
          <button>
            <div className={`${styles.navbar__profile} d-flex`}>
              <Image
                width={35}
                height={35}
                src={imageUrl}
                draggable="false"
                alt="User Profile"
                referrerPolicy="no-referrer"
                onClick={e => {
                  e.stopPropagation()
                  togglePopup("dashboardProfile", !isProfileOpen)
                }}
                data-profile-toggle
              />
              <DashboardProfile />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default NavbarDashboard
