import React from 'react';
import Tooltip from '@/components/dashboard/shared/Tooltip';
import styles from './styles.module.sass'

export default function EditorNavbarToolbar() {
  return (
    <div className={styles["editor-toolbar"]}>
      <div className={styles["editor-toolbar__column"]}>
        <div className={styles["editor-toolbar__item"]}>
          <Tooltip 
            id="tip-type-editor" 
            header="Type"
            description="Type"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
      </div>
      <div className={styles["editor-toolbar__divider"]}><span></span></div>
      <div className={styles["editor-toolbar__column"]}>
        <div className={styles["editor-toolbar__item"]}>
          <Tooltip 
            id="tip-family-editor" 
            header="Family"
            description="Family"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
      </div>
      <div className={styles["editor-toolbar__divider"]}><span></span></div>
      <div className={`${styles["editor-toolbar__column"]} ${styles["editor-toolbar__size"]}`}>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-minus-editor' className="fa-solid fa-minus"></i>
          <Tooltip 
            id="tip-minus-editor" 
            header="Decrease"
            description="Decrease font size."
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <input data-tooltip-id='tip-size-editor' type="text" />
          <Tooltip 
            id="tip-size-editor" 
            header="Size"
            description="Font size."
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-plus-editor' className="fa-solid fa-plus"></i>
          <Tooltip 
            id="tip-plus-editor" 
            header="Increase"
            description="Font size"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
      </div>
      <div className={styles["editor-toolbar__divider"]}><span></span></div>
      <div className={`${styles["editor-toolbar__column"]} ${styles["editor-toolbar__style"]}`}>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-bold-editor' className="fa-solid fa-bold"></i>
          <Tooltip 
            id="tip-bold-editor" 
            header="Bold"
            description="Bold"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-italic-editor' className="fa-solid fa-italic"></i>
          <Tooltip 
            id="tip-italic-editor" 
            header="Italic"
            description="Italic"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-underline-editor' className="fa-solid fa-underline"></i>
          <Tooltip 
            id="tip-underline-editor" 
            header="Underline"
            description="Underline"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-color-editor' className="fa-solid fa-palette"></i>
          <Tooltip 
            id="tip-color-editor" 
            header="Color"
            description="Text color"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-strikethrough-editor' className="fa-solid fa-strikethrough"></i>
          <Tooltip 
            id="tip-strikethrough-editor" 
            header="Strikethrough"
            description="Strikethrough"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
      </div>
      <div className={styles["editor-toolbar__divider"]}><span></span></div>
      <div className={`${styles["editor-toolbar__column"]} ${styles["editor-toolbar__align"]}`}>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-alignleft-editor' className="fa-solid fa-align-left"></i>
          <Tooltip 
            id="tip-alignleft-editor" 
            header="Left Align"
            description="Left align"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-aligncenter-editor' className="fa-solid fa-align-center"></i>
          <Tooltip 
            id="tip-aligncenter-editor" 
            header="Center Align"
            description="Center align"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-alignright-editor' className="fa-solid fa-align-right"></i>
          <Tooltip 
            id="tip-alignright-editor" 
            header="Right Align"
            description="Right align"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
      </div>
      <div className={styles["editor-toolbar__divider"]}><span></span></div>
      <div className={`${styles["editor-toolbar__column"]} ${styles["editor-toolbar__media"]}`}>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-link-editor' className="fa-solid fa-link"></i>
          <Tooltip 
            id="tip-link-editor" 
            header="Link"
            description="Insert link"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-quote-editor' className="fa-solid fa-quote-right"></i>
          <Tooltip 
            id="tip-quote-editor" 
            header="Quote"
            description="Blockquote"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
      </div>
      <div className={styles["editor-toolbar__divider"]}><span></span></div>
      <div className={`${styles["editor-toolbar__column"]} ${styles["editor-toolbar__media"]}`}>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-bullet-editor' className="fa-solid fa-list"></i>
          <Tooltip 
            id="tip-bullet-editor" 
            header="Bullet List"
            description="Bullet list"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-numbered-editor' className="fa-solid fa-list-ol"></i>
          <Tooltip 
            id="tip-numbered-editor" 
            header="Numbered List"
            description="Numbered list"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-spacing-editor' className="fa-solid fa-line-height"></i>
          <Tooltip 
            id="tip-spacing-editor" 
            header="Line Spacing"
            description="Line spacing"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
      </div>
      <div className={styles["editor-toolbar__divider"]}><span></span></div>
      <div className={`${styles["editor-toolbar__column"]} ${styles["editor-toolbar__media"]}`}>
        <div className={styles["editor-toolbar__item"]}>
          <i data-tooltip-id='tip-responsive-editor' className="fa-solid fa-display-code"></i>
          <Tooltip 
            id="tip-responsive-editor" 
            header="Responsive Mode"
            description="Responsive mode"
            margin={'0 0 0 0'}
            place={'bottom'}
            delay={400}
          />
        </div>
      </div>
      <div className={styles["editor-close"]}>
        <i className="fa-solid fa-chevron-up"></i>
      </div>
    </div>
  );
}