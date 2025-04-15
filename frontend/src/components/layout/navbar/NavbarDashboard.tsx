"use client";

import Link from 'next/link';
import styles from './NavbarDashboard.module.sass';
import Image from 'next/image';
import { useAuthContext } from '@/contexts/AuthContext';

const NavbarDashboard = () => {
  const { session } = useAuthContext();
  const imageUrl = session?.user?.image || "/user.jpeg";

  return (
    <div className={`${styles.navbar} no-select`}>
        <div className={styles.navbar__item}>
          <span>
            <Link href='/dashboard'>PLACEHOLDER</Link>
          </span>
        </div>
        <div className={`${styles.navbar__item} d-flex`}>
          <button>
            <div className={`${styles.navbar__profile} d-flex`}>
              <Image width={35} height={35} src={imageUrl} draggable="false" alt="User Profile" referrerPolicy="no-referrer" />
            </div>
          </button>
        </div>
    </div>
  );
};

export default NavbarDashboard;