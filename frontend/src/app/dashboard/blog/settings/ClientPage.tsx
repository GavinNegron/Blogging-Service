'use client';

import DefaultButton from '@/components/ui/buttons/default/DefaultButton';
import styles from './styles.module.sass'

export default function BlogSettingsClientPage() {
  return (
    <>
    <div className="dashboard__banner no-select">
        <div className="dashboard__banner-header">
          <span>Blog Settings</span>
        </div>
    </div>
    <div className={`${styles.settings} flex-col`}>
      <div className={styles["settings__banner"]}>
        <div className={styles["settings__banner__left"]}>
          <div className="settings__banner__item">
            <span>You are currently using the free plan</span>
          </div>
          <div className="settings__banner__item">
            <span>Paid plans offer additional features.</span>
          </div>
        </div>
        <div className={styles["settings__banner__right"]}>
          <DefaultButton background="#9873ff" hover="#896bdb">View Plans</DefaultButton>
        </div>
      </div>
      <div className={styles["settings__content"]}>
        <div className={`${styles["settings__content__group"]} d-flex flex-row`}>
          <div className="d-flex flex-col">
            <span>Name</span>
            <span>Changes will update all URLs.</span>
          </div>
          <div className="d-flex flex-col">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}