"use client";

import Link from 'next/link';
import styles from './NavbarDashboard.module.sass';

interface DashboardProps {
  session: { user: { image?: string | null } } | null;
}

const NavbarDashboard = ({ session }: DashboardProps) => {
  const imageUrl = session?.user?.image || "/user.jpeg";

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
                <img src={imageUrl} draggable="false" alt="User Profile" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;