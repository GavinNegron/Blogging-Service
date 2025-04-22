'use client';

import ParentStyles from '@/app/dashboard/blog/settings/styles.module.sass'
import styles from './styles.module.sass';

export default function MediaSettings() {
  return (
    <>
      <div className={`${ParentStyles['settings__content__group']} d-flex flex-row`}>
        <div className={`${ParentStyles['settings__content__left']} d-flex flex-col`}>
          <div className={ParentStyles['settings__content__header']}>
          </div>
          <div className={ParentStyles['settings__content__description']}>
          </div>
        </div>
        <div className={`${ParentStyles['settings__content__right']} d-flex flex-col`}>
        </div>
      </div>
    </>
  );
}
