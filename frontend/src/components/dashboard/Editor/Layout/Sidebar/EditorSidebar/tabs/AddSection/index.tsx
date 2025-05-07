import React, { useState } from 'react'
import ParentStyles from '../../styles.module.sass'
import styles from './styles.module.sass'
import Search from '@/components/ui/search'
import { handleElementDragStart } from '@/utils/editor/editorUtilities'
import { useEditorContext } from '@/contexts/EditorContext'

const categories = [
  {
    title: 'Layout',
    elements: [
      { label: 'Navigation Bar', tag: 'nav', preview: <span className={styles['preview-nav']}>Navbar</span> },
    ]
  },
]

function AddSectionTab() {
  const { iframeRef } = useEditorContext();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<number, boolean>>({});

  const toggleGroup = (groupIndex: number) => {
    setCollapsedGroups((prevState) => ({
      ...prevState,
      [groupIndex]: !prevState[groupIndex],
    }));
  };

  return (
    <div className={styles['add-section__wrapper']}>
      <div className={`${ParentStyles['editor-sidebar__tab__header']} d-flex ai-center`}>
        <span>Add Section</span>
      </div>
      <div className={styles['add-section__search']}>
        <Search />
      </div>
      <div className={styles['add-section__inner']}>
        {categories.map((cat, index) => (
          <div key={index} className={styles['add-section__group']}>
            <div
              className={styles['add-section__header']}
              onClick={() => toggleGroup(index)}>
              {cat.title}
                <i className={`fa-solid ${collapsedGroups[index] ? "fa-chevron-down" : "fa-chevron-up"} ${styles["add-section__header__icon"]}`}></i>
            </div>
            <div
              className={`${styles['add-section__content']} ${
                collapsedGroups[index] ? styles['add-section__content--collapsed'] : ""
              }`}
            >
              {cat.elements.map((element, index) => (
                <div 
                  key={index} 
                  className={styles['add-section__item']} 
                  tabIndex={0} 
                  draggable='true'
                  onDragStart={(e) => handleElementDragStart(e, element, iframeRef)}>
                  {element.preview}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddSectionTab
