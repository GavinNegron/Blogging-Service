'use client';

import { useState, useEffect } from 'react';
import ViewPlansBanner from '@/components/dashboard/ViewPlans';
import GeneralSettings from '@/components/dashboard/Settings/GeneralSettings';
import AppearanceSettings from '@/components/dashboard/Settings/AppearanceSettings';
import SEOSettings from '@/components/dashboard/Settings/SEOSettings';
import CommentsSettings from '@/components/dashboard/Settings/CommentsSettings';
import MediaSettings from '@/components/dashboard/Settings/MediaSettings';

import styles from './styles.module.sass';

export default function BlogSettingsClientPage() {
  const [activePage, setActivePage] = useState('');

  useEffect(() => {
    const updateActivePage = () => {
      const hash = window.location.hash || '#general';
      setActivePage(hash);
  
      if (!window.location.hash || window.location.hash !== hash) {
        window.location.hash = hash;
      }
    };
  
    updateActivePage();
    window.addEventListener('hashchange', updateActivePage);
  
    return () => window.removeEventListener('hashchange', updateActivePage);
  }, []);

  return (
    <>
      <div className={`${styles.settings} flex-col dashboard__content__inner`}>
        <div className="dashboard__banner no-select">
          <div className="dashboard__banner-header">
            <span>Blog Settings</span>
          </div>
        </div>
        <ViewPlansBanner />
        <nav className={`${styles['settings__nav']} d-flex`}>
          <div className={`${styles['settings__nav__item']} no-select`}>
            <a href="#general" className={activePage === '#general' ? styles['selected-page'] : ''} draggable="false">General</a>
          </div>
          <div className={`${styles['settings__nav__item']} no-select`}>
            <a href="#appearance" className={activePage === '#appearance' ? styles['selected-page'] : ''} draggable="false">Appearance</a>
          </div>
          <div className={`${styles['settings__nav__item']} no-select`}>
            <a href="#seo" className={activePage === '#seo' ? styles['selected-page'] : ''} draggable="false">SEO</a>
          </div>
          <div className={`${styles['settings__nav__item']} no-select`}>
            <a href="#comments" className={activePage === '#comments' ? styles['selected-page'] : ''} draggable="false">Comments</a>
          </div>
          <div className={`${styles['settings__nav__item']} no-select`}>
            <a href="#media" className={activePage === '#media' ? styles['selected-page'] : ''} draggable="false">Media</a>
          </div>
        </nav>
        <div className={styles['settings__content']}>
          {activePage === '#appearance' && <AppearanceSettings />}
          {activePage === '#seo' && <SEOSettings />}
          {activePage === '#comments' && <CommentsSettings />}
          {activePage === '#media' && <MediaSettings />}
          {activePage === '#general' && <GeneralSettings />}
        </div>
      </div>
    </>
  );
}