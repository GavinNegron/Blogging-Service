import React, { ReactNode, useId } from 'react'

interface DefaultButtonProps {
  children: ReactNode
  background?: string
  hover?: string
  onClick?: () => void
  className?: string
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ 
  children, 
  background = "#1e1e1e", 
  hover, 
  onClick,
  className = "" 
}) => {

  const buttonId = useId();
  const safeButtonId = buttonId.replace(/:/g, "");
  
  return (
    <>
      <style jsx>{`
        .button-${safeButtonId} {
          background-color: ${background};
          padding: 5px 10px;
          display: flex;
          border-radius: 2px;
          align-items: center;
          justify-content: center;
          font-family: var(--font-poppins);
          transition: background-color 0.2s ease;
          cursor: pointer;
        }
        
        .button-${safeButtonId}:hover {
          background-color: ${hover || background};
        }
      `}</style>
      <button 
        className={`button-${safeButtonId} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default DefaultButton