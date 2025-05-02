import React from 'react';
import ParentStyles from '../../styles.module.sass'
import styles from './styles.module.sass';

function PagesTab() {

  return (
    <div className={`${ParentStyles['editor-sidebar__tab__header']} d-flex ai-center`}>
      <span>Edit Pages</span>
    </div>
  );
}

export default PagesTab;