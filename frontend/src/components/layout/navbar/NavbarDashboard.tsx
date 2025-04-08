"use client";

import Link from 'next/link';
import styles from './NavbarDashboard.module.sass';

interface DashboardProps {
  session: any;
}

const NavbarDashboard = ({ session }: DashboardProps) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__top}>
        <div className={styles.navbar__top__inner}>
          <div className={styles.navbar__top__item}>
            <span>
              <Link href='/dashboard'>PLACEHOLDER</Link>
            </span>
          </div>
          <div className={`${styles.navbar__top__item} d-flex`}>
            <button>
              <div className={`${styles.navbar__profile} d-flex`}>
                <img src={session?.user?.image || "/user.jpeg"} draggable="false" alt="User Profile" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
