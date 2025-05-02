import React, { useState } from 'react';
import styles from './styles.module.sass';
import { AddElementTab, InfoTab, PagesTab, SiteSettingsTab } from './tabs/index'

function EditorSidebarViewport() {
  const [activeTab, setActiveTab] = useState<string | null>('AddElementTab');

  return (
    <>
      <aside className={`${styles["editor-sidebar"]} d-flex`}>
        <span className={`${styles["editor-sidebar__icons"]} d-flex flex-col no-select`}>
          <div className={styles["editor-sidebar__icons__item"]}>
            <button className={`${styles["editor-sidebar__icons__item__btn"]} d-flex`} onClick={() => setActiveTab('AddElementTab')}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className={styles["editor-sidebar__icons__item"]}>
            <button className={`${styles["editor-sidebar__icons__item__btn"]} d-flex`} onClick={() => setActiveTab('PagesTab')}>
              <i className="fa-solid fa-memo"></i>
            </button>
          </div>
          <div className={styles["editor-sidebar__icons__item"]}>
            <button className={`${styles["editor-sidebar__icons__item__btn"]} d-flex`} onClick={() => setActiveTab('SiteSettingsTab')}>
              <i className="fa-solid fa-sliders"></i>
            </button>
          </div>
          <div className={styles["editor-sidebar__icons__item"]}>
            <button className={`${styles["editor-sidebar__icons__item__btn"]} d-flex`} onClick={() => setActiveTab('InfoTab')}>
              <i className="fa-solid fa-circle-info"></i>
            </button>
          </div>
        </span>
        <span className={`${styles["editor-sidebar__tab"]} d-flex flex-col no-select ${activeTab ? styles["editor-sidebar__tab--active"] : ""}`}>
          {activeTab === "AddElementTab" && <AddElementTab/>}
          {activeTab === "InfoTab" && <InfoTab/>}
          {activeTab === "PagesTab" && <PagesTab/>}
          {activeTab === "SiteSettingsTab" && <SiteSettingsTab/>}
        </span>
      </aside>
    </>
  );
}

export default EditorSidebarViewport;