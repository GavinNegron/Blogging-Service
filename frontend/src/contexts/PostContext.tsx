'use client'

import { createContext, useContext, useState } from 'react'

const PostContext = createContext<any>(null)

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])

  const handleSelectPost = (postId: string) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    )
  }

  return (
    <PostContext.Provider value={{
      selectedPosts,
      setSelectedPosts,
      handleSelectPost
    }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}