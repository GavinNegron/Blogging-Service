'use client'
import React, { createContext, useContext, useState } from 'react'

interface PopupContextType {
  popups: Record<string, boolean>
  togglePopup: (popupId: string, isOpen: boolean) => void
}

interface PopupProviderProps {
  children: React.ReactNode
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export const PopupProvider = ({ children }: PopupProviderProps) => {
  const [popups, setPopups] = useState<Record<string, boolean>>({})

  const togglePopup = (popupId: string, isOpen: boolean) => {
    setPopups(prev => ({ ...prev, [popupId]: isOpen }))
  }

  return (
    <PopupContext.Provider value={{ popups, togglePopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}
