import React, { useState } from 'react'
import ParentStyles from '../../styles.module.sass'
import styles from './styles.module.sass'
import Search from '@/components/ui/search'
import { handleElementDragStart } from '@/utils/editor/editorUtilities'
import { useEditorContext } from '@/contexts/EditorContext'

const categories = [
  {
    title: 'Text',
    elements: [
      { label: 'Default Text', tag: 'span', preview: <span className={styles['preview-default-text']}>Default Text</span> },
      { label: 'Heading 1', tag: 'h1', preview: <span className={styles['preview-heading-1']}>Heading 1</span> },
      { label: 'Heading 2', tag: 'h2', preview: <span className={styles['preview-heading-2']}>Heading 2</span> },
      { label: 'Heading 3', tag: 'h3', preview: <span className={styles['preview-heading-3']}>Heading 3</span> },
      { label: 'Heading 4', tag: 'h4', preview: <span className={styles['preview-heading-4']}>Heading 4</span> },
      { label: 'Heading 5', tag: 'h5', preview: <span className={styles['preview-heading-5']}>Heading 5</span> },
      { label: 'Heading 6', tag: 'h6', preview: <span className={styles['preview-heading-6']}>Heading 6</span> },
      { label: 'Quote', tag: 'blockquote', preview: <blockquote className={styles['preview-quote']}>"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, totam."</blockquote> },
      {
        label: 'Code Block',
        tag: 'pre',
        preview: (
          <div className={styles['preview-code-block']}>
            <div className={styles['line']}>
              <span className={styles['line-number']}>1</span>
              <span>
                <span className={styles['keyword']}>function</span> <span className={styles['function-name']}>HelloWorld</span>() {'{'}
              </span>
            </div>
            <div className={styles['line']}>
              <span className={styles['line-number']}>2</span>
              <span>
                &nbsp;&nbsp;<span className={styles['keyword']}>console</span>.<span className={styles['method']}>log</span>(<span className={styles['string']}>"Hello, world!"</span>)
              </span>
            </div>
            <div className={styles['line']}>
              <span className={styles['line-number']}>3</span>
              <span>{'}'}</span>
            </div>
          </div>
        )
      }
    ]
  },
  {
    title: 'Media',
    elements: [
      { label: 'Image', tag: 'img', preview: <div className={styles['preview-image']}><img src='/assets/placeholder.png' /></div> },
      { label: 'Video', tag: 'video', preview: <div className={styles['preview-video']}>Video</div> }
    ]
  },
  {
    title: 'Interactive',
    elements: [
      { label: 'Button', tag: 'button', preview: <button className={styles['preview-button']}>Click Me</button> },
      { label: 'Link', tag: 'a', preview: <a className={styles['preview-link']}>Visit Link</a> }
    ]
  }
]

function AddElementTab() {
  const { iframeRef } = useEditorContext();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<number, boolean>>({});

  const toggleGroup = (groupIndex: number) => {
    setCollapsedGroups((prevState) => ({
      ...prevState,
      [groupIndex]: !prevState[groupIndex],
    }));
  };

  return (
    <div className={styles['add-element__wrapper']}>
      <div className={`${ParentStyles['editor-sidebar__tab__header']} d-flex ai-center`}>
        <span>Add Element</span>
      </div>
      <div className={styles['add-element__search']}>
        <Search />
      </div>
      <div className={styles['add-element__inner']}>
        {categories.map((cat, index) => (
          <div key={index} className={styles['add-element__group']}>
            <div
              className={styles['add-element__header']}
              onClick={() => toggleGroup(index)}>
              {cat.title}
                <i className={`fa-solid ${collapsedGroups[index] ? "fa-chevron-down" : "fa-chevron-up"} ${styles["add-element__header__icon"]}`}></i>
            </div>
            <div
              className={`${styles['add-element__content']} ${
                collapsedGroups[index] ? styles['add-element__content--collapsed'] : ""
              }`}
            >
              {cat.elements.map((element, index) => (
                <div 
                  key={index} 
                  className={styles['add-element__item']} 
                  tabIndex={0} 
                  draggable='true'
                  onDragStart={(e) => handleElementDragStart(e, element)}>
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

export default AddElementTab
