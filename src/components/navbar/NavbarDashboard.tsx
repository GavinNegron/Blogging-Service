"use client";

import Link from 'next/link';
import styles from './NavbarDashboard.module.sass';

const NavbarDashboard = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__top}>
        <div 
          className={styles.navbar__topBorder}
          style={{
            transform: `scaleX(1)`,
            transformOrigin: 'left',
          }}
        ></div>
        <div className={styles.navbar__top__inner}>
          <div className={styles.navbar__top__item}>
            <span>
              <Link href='/dashboard'>PLACEHOLDER</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
