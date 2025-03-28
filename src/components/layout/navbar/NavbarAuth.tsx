import React from 'react';
import styles from './NavbarAuth.module.sass';

type NavbarAuthProps = {
  type: 'login' | 'register';
};

const NavbarAuth: React.FC<NavbarAuthProps> = ({ type }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__item}>
        <span>PLACEHOLDER</span>
      </div>
      <div className={styles.navbar__item}>
        {type === 'login' ? (
          <>
            <span>Don't have an account?</span>
            <a href="/register">Sign Up now!</a>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <a href="/login">Log In now!</a>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarAuth;