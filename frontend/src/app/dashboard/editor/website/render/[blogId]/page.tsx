'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchBlogContent } from '@/services/EditorService'
import { minifyCSS } from '@/utils/editor/domUtilities'
import './styles.sass'

interface BlogElement {
  id: string,
  type: string
  content?: string
  class?: string
  children?: BlogElement[]
  layout?: Record<string, any>
}

export default function RenderPage() {
  const params = useParams()
  const blogId = params.blogId as string
  const [elements, setElements] = useState<BlogElement[]>([])
  const [layoutStyles, setLayoutStyles] = useState<string>('') 
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBlogContent(blogId)
        if (response) {
          if (Array.isArray(response)) {
            setElements(response)
          } else if (response.content && Array.isArray(response.content)) {
            setElements(response.content)
          }
        } else {
          setError('No data received')
        }
      } catch (err) {
        setError('Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    if (blogId) {
      fetchData()
    }
  }, [blogId])

  useEffect(() => {
    const layoutRules: string[] = []

    const processElement = (element: BlogElement) => {
      if (element.id && element.layout) {
        const x = element.layout.x
        const y = element.layout.y
        const rules: string[] = []

        if (x != null) rules.push(`left: ${x}px`)
        if (y != null) rules.push(`top: ${y}px`)
        if (rules.length) {
          layoutRules.push(`#${element.id} { position: absolute; ${rules.join('; ')} }`)
        }
      }

      if (element.children) element.children.forEach(processElement)
    }

    elements.forEach(processElement)

    const minifiedLayoutStyles = minifyCSS(layoutRules.join('\n'))
    setLayoutStyles(minifiedLayoutStyles)
  }, [elements])
  
  const RenderElement = ({ element }: { element: BlogElement }) => {
    if (!element) return null

    const { type, content, class: className, children, layout = {}, id } = element
    const voidElements = ['input', 'img', 'br', 'hr', 'meta', 'link']
    const childElements: React.ReactNode[] = []

    if (content) childElements.push(content)

    if (children) {
      childElements.push(
        ...children.map((child, index) => (
          <RenderElement key={index} element={child} />
        ))
      )
    }

    const props: any = {}

    if (id) props.id = id
    if (className) props.className = className

    Object.entries(layout).forEach(([key, value]) => {
      if (key.startsWith('data-') && value != null) {
        props[key] = value
      }
    })

    return voidElements.includes(type)
      ? React.createElement(type, props)
      : React.createElement(type, props, ...childElements)
  }

  if (loading) return null
  if (error) return <div className='error-container'>{error}</div>

  return (
    <div className='SITE-CONTAINER'>
      <style dangerouslySetInnerHTML={{ __html: layoutStyles }} />
      {
        elements.map((element: BlogElement, index: number) => (
          <RenderElement key={index} element={element} />
        ))
      }
    </div>
  )
}