import React from 'react';
import styles from './styles.module.sass'

function EditorNavbarPrimary() {
  
    return (
        <>
            <div className={`${styles["editor-navbar"]} no-select`}>
               <div className={styles["editor-navbar__inner"]}></div>
            </div>
        </>
    );
}

export default EditorNavbarPrimary;