'use client';
import styles from './DeletePost.module.sass';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function DeletePost() {  

  return (
    <>
      <div id='p-delete' className={styles['popup']}>
        <div className={styles['popup__inner']} onClick={(e) => e.stopPropagation()}>
          <div className={styles['popup-icon']}>
            <i className="fa-solid fa-warning"></i>
          </div>
          <div className={styles['popup-header']}>
            <span>Delete Confirmation</span>
          </div>
          <div className={styles['popup-button']}>
            <button>Confirm</button>
          </div>
        </div>
      </div>
    </>
  );
}