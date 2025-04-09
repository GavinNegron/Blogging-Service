import { usePopup } from '@/contexts/PopupContext';
import { deleteUserPosts } from '@/services/PostService';
import { usePostContext } from '@/contexts/PostContext';
import { useAuthContext } from '@/contexts/AuthContext';
import styles from './DeletePost.module.sass';

export default function DeletePost() {
  const { selectedPosts } = usePostContext();
  const { user } = useAuthContext();
  const { popups, togglePopup } = usePopup();

  const closePopup = () => togglePopup('deletePost', false);

  console.log(user)
  const handleDeletePosts = () => {
    deleteUserPosts('CM008qCVC5ZhTGdNcxSqsnzUlW3LhFRq', selectedPosts);
  }

  return (
    <>
      {popups['deletePost'] && (
        <div id="p-delete" className={styles['popup']} onClick={closePopup}>
          <div
            className={styles['popup__inner']}
            onClick={(e) => e.stopPropagation()}
          >
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
  );
};