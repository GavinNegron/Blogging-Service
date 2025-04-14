import React, { ReactNode } from 'react'
import styles from './styles.module.sass'

interface DefaultButtonProps {
  children: ReactNode
  onClick?: () => void
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}


export default DefaultButton;