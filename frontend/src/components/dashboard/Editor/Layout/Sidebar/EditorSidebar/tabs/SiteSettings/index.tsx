import React from 'react';
import ParentStyles from '../../styles.module.sass'
import styles from './styles.module.sass';

function SiteSettingsTab() {

  return (
    <div className={`${ParentStyles['editor-sidebar__tab__header']} d-flex ai-center`}>
      <span>Site Settings</span>
    </div>
  );
}

export default SiteSettingsTab;