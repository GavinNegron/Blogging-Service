"use client"

import { useEffect, useRef, useState, useReducer, useCallback } from "react"
import { useParams } from "next/navigation"
import { useEditorContext } from "@/contexts/EditorContext"
import { handleMouseOver, handleMouseDown, handleZoom, handleMouseClick, handleElementDropInIframe, handleMouseOut } from "@/utils/editor/editorUtilities"
import { fetchBlogContent, saveEditorAction } from "@/services/EditorService"
import EditorNavbarPrimary from "@/components/dashboard/Editor/Layout/Navbar/EditorNavbarPrimary/page"
import EditorNavbarMenu from "@/components/dashboard/Editor/Layout/Navbar/EditorNavbarMenu/page"
import EditorSidebar from "@/components/dashboard/Editor/Layout/Sidebar/EditorSidebar/page"
import EditorNavbarToolbar from "@/components/dashboard/Editor/Layout/Navbar/EditorNavbarToolbar/page"
import { editorReducer } from "@/state/editorReducer"

import styles from "./styles.module.sass"
import "./globals.sass"

export default function ClientPage() {
  const { blogId } = useParams()
  const { setHoverData, draggedElementRef, startRef, iframeRef } = useEditorContext()
  const iframeContainerRef = useRef<HTMLDivElement>(null)
  const [selectedItem, setSelectedItem] = useState<HTMLElement | null>(null)
  const [contentTree, dispatch] = useReducer(editorReducer, { content: [] })
  const pendingActionsRef = useRef<any[]>([])
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const addPendingAction = useCallback((action: any) => {
    pendingActionsRef.current.push(action)
    
    if (pendingActionsRef.current.length === 1) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      saveTimeoutRef.current = setTimeout(() => {
        savePendingActions()
      }, 10000)
    }
  }, [])

  const savePendingActions = useCallback(async () => {
    if (pendingActionsRef.current.length === 0 || !blogId) return
    
    const actionsToSave = [...pendingActionsRef.current]
    pendingActionsRef.current = []
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = null
    }
    
    try {
      await saveEditorAction(blogId as string, actionsToSave)
      console.log(`Batch saved ${actionsToSave.length} actions`)
    } catch (error) {
      console.error("Batch save failed:", error)
      pendingActionsRef.current = [...actionsToSave, ...pendingActionsRef.current]
      
      saveTimeoutRef.current = setTimeout(() => {
        savePendingActions()
      }, 5000)
    }
  }, [blogId])

  const handleKeyDown = async (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault()
      await savePendingActions()
      return
    }
    
    if (!selectedItem) return
    if (selectedItem.classList.contains("SITE-CONTAINER")) return

    switch (event.key) {
      case "Delete":
      case "Backspace":
        event.preventDefault()
        selectedItem.remove()
        const action = {
          type: "DELETE_ELEMENT",
          payload: { id: selectedItem.id }
        }
        
        addPendingAction(action)
        dispatch(action)
        setSelectedItem(null)
        break

      default:
        break
    }
  }

  const onMouseOver = (e: MouseEvent) => handleMouseOver(e, setHoverData, iframeRef)
  
  const onMouseDown = (e: MouseEvent) => {
    handleMouseDown(e, iframeRef, draggedElementRef, startRef, blogId as string, addPendingAction)
    setSelectedItem(e.target as HTMLElement)
  }

  const onMouseOut = (e: MouseEvent) => {
    handleMouseOut(e, setHoverData, iframeRef)
    setSelectedItem(e.target as HTMLElement)
  }
  
  const onMouseClick = (e: MouseEvent) => {
    handleMouseClick(e, iframeRef)
    setSelectedItem(e.target as HTMLElement)
  }
  
  const onZoom = (e: WheelEvent) => handleZoom(e, iframeRef)

  const onDrop = (e: DragEvent) => {
    const doc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
    if (doc) {
      handleElementDropInIframe(e, doc, dispatch, blogId as string, addPendingAction)
    }
  }

  useEffect(() => {
    return () => {
      if (pendingActionsRef.current.length > 0) {
        savePendingActions()
      }
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [savePendingActions])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const attachListeners = () => {
      const doc = iframe.contentWindow?.document
      if (!doc) return
      
      doc.body.addEventListener("mouseover", onMouseOver)
      doc.body.addEventListener("mouseout", onMouseOut)
      doc.body.addEventListener("mousedown", onMouseDown)
      doc.body.addEventListener("click", onMouseClick)
      doc.addEventListener("wheel", onZoom, { passive: false })
      doc.addEventListener("keydown", handleKeyDown)

      doc.addEventListener("dragover", (e) => {
        e.preventDefault()
        e.stopPropagation()
      })

      doc.addEventListener("drop", onDrop)
    }

    iframe.onload = attachListeners
    if (iframe.contentDocument?.readyState === "complete") attachListeners()

    return () => {
      const doc = iframe.contentWindow?.document
      if (doc) {
        doc.body.removeEventListener("mouseover", onMouseOver)
        doc.body.removeEventListener("mousedown", onMouseDown)
        doc.body.removeEventListener("click", onMouseClick)
        doc.removeEventListener("wheel", onZoom)
        doc.removeEventListener("keydown", handleKeyDown)
        doc.removeEventListener("dragover", (e) => e.preventDefault())
        doc.removeEventListener("drop", onDrop)
      }
    }
  }, [iframeRef, contentTree, blogId, addPendingAction])

  useEffect(() => {
    const doc = document
    doc.addEventListener("keydown", handleKeyDown)
    doc.addEventListener("wheel", onZoom, { passive: false })

    return () => {
      doc.removeEventListener("keydown", handleKeyDown)
      doc.removeEventListener("wheel", onZoom)
    }
  }, [selectedItem, handleKeyDown])

  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchBlogContent(blogId as string)
      dispatch({ type: "INIT_CONTENT", payload: content })
    }
    loadContent()
  }, [blogId])

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
                    style={{ border: "none", transformOrigin: "center center" }}
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