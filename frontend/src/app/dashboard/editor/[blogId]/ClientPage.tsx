"use client"

import { useEffect, useRef, useState, useReducer } from "react"
import { useParams } from "next/navigation"
import { useEditorContext } from "@/contexts/EditorContext"
import { handleMouseOver, handleMouseDown, handleZoom, handleMouseClick, handleElementDropInIframe } from "@/utils/editor/editorUtilities"
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

  const handleKeyDown = async (event: KeyboardEvent) => {
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
        try {
          await saveEditorAction(blogId as string, action)
          dispatch(action)
        } catch (error) {
          console.error("Delete failed:", error)
        }
        setSelectedItem(null)
        break

      default:
        break
    }
  }

  const onMouseOver = (e: MouseEvent) => handleMouseOver(e, setHoverData, draggedElementRef, iframeRef)
  const onMouseDown = (e: MouseEvent) => {
    handleMouseDown(e, iframeRef, draggedElementRef, startRef, blogId as string)
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
      handleElementDropInIframe(e, doc, dispatch, blogId as string)
    }
  }

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const attachListeners = () => {
      const doc = iframe.contentWindow?.document
      if (!doc) return
      
      doc.body.addEventListener("mouseover", onMouseOver)
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
  }, [iframeRef, contentTree, blogId])

  useEffect(() => {
    const doc = document
    doc.addEventListener("keydown", handleKeyDown)
    doc.addEventListener("wheel", onZoom, { passive: false })

    return () => {
      doc.removeEventListener("keydown", handleKeyDown)
      doc.removeEventListener("wheel", onZoom)
    }
  }, [selectedItem])

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