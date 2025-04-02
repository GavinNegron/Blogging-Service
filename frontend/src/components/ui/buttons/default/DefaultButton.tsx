import React, { ReactNode } from 'react'
import styles from './styles.module.sass'

interface DefaultButtonProps {
  children: ReactNode,
  background?: string,
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ children, background }) => {
  return (
    <button className={styles.button} style={{ backgroundColor: background }}>
      {children}
    </button>
  )
}

export default DefaultButton