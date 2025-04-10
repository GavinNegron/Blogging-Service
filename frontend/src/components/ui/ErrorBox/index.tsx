import React from "react";
import styles from './styles.module.sass';

type ErrorBoxProps = {
    children: React.ReactNode;
};

const ErrorBox: React.FC<ErrorBoxProps> = ({ children }) => {
    return (
        <>
            <p className={styles['container']}>
                <i className="fa-solid fa-hexagon-exclamation"></i>
                {children}
            </p>
        </>
    );
};

export default ErrorBox;