import React, { ReactNode } from 'react'
import styles from './styles.module.sass'

interface DefaultButtonProps {
  children: ReactNode,
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ children}) => {
  return (
    <button className={styles.button}>
      {children}
    </button>
  )
}

export default DefaultButton;