'use client'

import { usePopup } from '@/contexts/PopupContext'
import { deleteUserPosts } from '@/services/PostService'
import { usePostContext } from '@/contexts/PostContext'
import { useAuthContext } from '@/contexts/AuthContext'
import styles from './DeletePost.module.sass'
import { useState } from 'react'
import ErrorBox from '@/components/ui/ErrorBox'

interface Post {
  id: string
  title: string
  slug: string
  imageUrl: string
  status: string
  views: number
  createdAt: string
}

interface DeletePostProps {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  setSelectedPosts: React.Dispatch<React.SetStateAction<string[]>>
}

export default function DeletePost({ setPosts, setSelectedPosts }: DeletePostProps) {
  const { selectedPosts } = usePostContext()
  const { blog } = useAuthContext()
  const { popups, togglePopup } = usePopup()
  const [error, setError] = useState<string | undefined>()

  const closePopup = () => {
    togglePopup('deletePost', false)
  }

  const handleDeletePosts = async () => {
    if (!blog?.id) {
      setError('Failed to delete post(s). Please try again later.')
      return
    }

    try {
      const response = await deleteUserPosts(blog.id, selectedPosts)

      if (response.success === true) {
        setPosts(prevPosts => prevPosts.filter(post => !selectedPosts.includes(post.id)))
        setSelectedPosts([])
        closePopup()
      } else {
        setError('Failed to delete post(s). Please try again later.')
      }
    } catch (error) {
      console.error(error)
      setError('Failed to delete post(s). Please try again later.')
    }
  }

  return (
    <>
      {popups['deletePost'] && (
        <div id="p-delete" className={styles['popup']} onClick={closePopup}>
          <div className={styles['popup__inner']} onClick={(e) => e.stopPropagation()}>
            {error && <ErrorBox>{error}</ErrorBox>}
            <div className={styles['popup-icon']}>
              <i className="fa-solid fa-warning"></i>
            </div>
            <div className={styles['popup-header']}>
              <span>Delete Confirmation</span>
            </div>
            <div className={styles['popup-button']}>
              <button onClick={handleDeletePosts}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
