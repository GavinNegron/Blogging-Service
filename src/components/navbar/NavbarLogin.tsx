import styles from './NavbarLogin.module.sass';  

const NavbarLogin = () => {
  return (
    <div className={styles.navbar}>
        <div className={styles.navbar__item}>
            <span>PLACEHOLDER</span>
        </div>
        <div className={styles.navbar__item}>
            <span>Don't have an account?</span>
            <a href="/register">Sign Up now!</a>
        </div>
    </div>
  );
};

export default NavbarLogin;