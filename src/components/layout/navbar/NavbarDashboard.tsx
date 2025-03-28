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
          <div className={styles.navbar__top__item}>
            <div className={styles.navbar__profile}>
              <img src={session?.user?.image || "/user.jpeg"} draggable="false" alt="User Profile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
