import React, { ReactNode, useId } from 'react'

interface DefaultButtonProps {
  children: ReactNode
  background?: string
  hover?: string
  onClick?: () => void
  className?: string
  width?: number | string
  height?: number | string
  icon?: string 
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ 
  children, 
  background = "#1e1e1e", 
  hover, 
  onClick,
  className = "",
  width,
  height,
  icon
}) => {

  const buttonId = useId()
  const safeButtonId = buttonId.replace(/:/g, "")

  const widthStyle = typeof width === "number" ? `${width}px` : width
  const heightStyle = typeof height === "number" ? `${height}px` : height

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
          gap: 8px;
          ${widthStyle ? `width: ${widthStyle};` : ''}
          ${heightStyle ? `height: ${heightStyle};` : ''}
        }

        .button-${safeButtonId}:hover {
          background-color: ${hover || background};
        }

        .icon-${safeButtonId} {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
      `}</style>
      <button 
        className={`button-${safeButtonId} ${className}`}
        onClick={onClick}
      >
        {icon && <i className={`icon-${safeButtonId} ${icon}`} />}
        {children}
      </button>
    </>
  )
}

export default DefaultButton