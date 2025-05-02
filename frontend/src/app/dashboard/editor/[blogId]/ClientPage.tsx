'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useEditorContext } from '@/contexts/EditorContext'
import {
  handleMouseOver,
  handleMouseDown,
  handleZoom,
  handleDelete,
  convertHtmlToJson
} from '@/utils/editor/editorUtilities'

import EditorNavbarPrimary from '@/components/dashboard/Editor/Layout/Navbar/EditorNavbarPrimary/page'
import EditorNavbarMenu from '@/components/dashboard/Editor/Layout/Navbar/EditorNavbarMenu/page'
import EditorSidebar from '@/components/dashboard/Editor/Layout/Sidebar/EditorSidebar/page'
import EditorNavbarToolbar from '@/components/dashboard/Editor/Layout/Navbar/EditorNavbarToolbar/page'

import styles from './styles.module.sass'
import './globals.sass'

export default function ClientPage() {
  const { blogId } = useParams()
  const { setHoverData, draggedElementRef, startRef, iframeRef } = useEditorContext()
  const iframeContainerRef = useRef<HTMLDivElement>(null)
  const [selectedItem, setSelectedItem] = useState<HTMLElement>()

  // ACTIONS
  const onMouseOver = (e: MouseEvent) =>
    handleMouseOver(e, setHoverData, draggedElementRef, iframeRef)

  const onMouseDown = (e: MouseEvent) => {
    handleMouseDown(e, iframeRef, draggedElementRef, startRef)
    setSelectedItem(e.target as HTMLElement)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    switch (true) {
      case event.key === 'Delete' || event.key === 'Backspace':
        if (selectedItem) {
          handleDelete(selectedItem)
        } else {
          console.log('No item selected to delete.')
        }
        break
  
      case event.ctrlKey && event.key === 's':
        event.preventDefault()
        if (iframeRef.current) {
          console.log(convertHtmlToJson(iframeRef))
        } else {
          console.log('iframeRef is not available')
        }
        break
  
      default:
        break
    }
  }
  
  

  const onZoom = (e: WheelEvent) => handleZoom(e, iframeRef)

  // IFRAME AND ZOOM LISTENERS
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const attachIframeListeners = () => {
      const doc = iframe.contentWindow?.document
      if (!doc) return

      doc.body.addEventListener('mouseover', onMouseOver)
      doc.body.addEventListener('mousedown', onMouseDown)
      doc.addEventListener('wheel', onZoom, { passive: false })

      const style = doc.createElement('style')
      doc.head.appendChild(style)
    }

    iframe.onload = attachIframeListeners

    if (iframe.contentDocument?.readyState === 'complete') {
      attachIframeListeners()
    }

    return () => {
      const doc = iframe.contentWindow?.document
      if (!doc) return

      doc.body.removeEventListener('mouseover', onMouseOver)
      doc.body.removeEventListener('mousedown', onMouseDown)
      doc.removeEventListener('wheel', onZoom)
    }
  }, [iframeRef])

  // GLOBAL LISTENERS
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('wheel', onZoom, { passive: false })

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('wheel', onZoom)
    }
  }, [selectedItem])

  return (
    <div className={`${styles.dashboard} d-flex flex-col`}>
      <div className={styles.dashboard__editor}>
        <EditorNavbarMenu />
        <div className={`${styles.dashboard__editor__window} d-flex flex-row`}>
          <EditorSidebar />
          <div className={styles.dashboard__editor__inner}>
            <div className={styles.dashboard__editor__viewport}>
              <EditorNavbarPrimary />
              <EditorNavbarToolbar />
              <div className={styles.dashboard__editor__content}>
                <div className={styles.dashboard__editor__iframe} ref={iframeContainerRef}>
                  <iframe
                    src={`/dashboard/editor/website/render/${blogId}`}
                    width="100%"
                    height="100%"
                    title="Preview Website"
                    ref={iframeRef}
                    sandbox="allow-same-origin allow-scripts"
                    style={{ border: 'none', transformOrigin: 'center center' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
