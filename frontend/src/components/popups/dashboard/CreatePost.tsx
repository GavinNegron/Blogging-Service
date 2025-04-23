import { useState, useRef, useEffect, useCallback } from 'react'
import { usePopup } from '@/contexts/PopupContext'
import styles from './CreatePost.module.sass'
import ImageSelector from '@/components/dashboard/ImageSelector'
import DefaultButton from '@/components/ui/buttons/default/DefaultButton'
import { createUserPost } from '@/services/PostService'
import { useAuthContext } from '@/contexts/AuthContext'

export default function CreatePost() {
  const { popups, togglePopup } = usePopup();
  const [error] = useState<string | undefined>();

  const popupRef = useRef<HTMLDivElement>(null);

  const closePopup = useCallback(() => togglePopup('createPost', false), [togglePopup]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [closePopup]);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const { user } = useAuthContext();
  const userId = user?.id;
  const handleCreatePost = async () => {
    if (!userId) return 

    const response = await createUserPost(userId, {
      title,
      image
    });

  }

  return (
    <>
      {popups['createPost'] && (
        <div className={`${styles['popup']} ${error ? 'error-visible' : ''}`}>
          <div className={styles['popup__overlay']}>
            <div className={styles['popup__inner']} ref={popupRef}>
              <div className={styles['popup__header']}>
                <span>Create New Post:</span>
              </div>
              <div className={styles['popup__content']}>
                {error && (
                  <div className={styles['popup__content-error']}>
                    <span>{error}</span>
                  </div>
                )}
                <div className={styles['popup__content-title']}>
                  <span>Add a title: </span>
                  <input
                    maxLength={120}
                    type="text"
                    placeholder="Add a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className={styles['popup__content-image']}>
                  <span>Select Image</span>
                  <div className={styles['popup__content-image__preview']}>
                    <ImageSelector onSelect={(img: string) => setImage(img)} />
                  </div>
                </div>
                <div className={styles['popup__content-submit']}>
                  <DefaultButton onClick={handleCreatePost}>Create Post</DefaultButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}