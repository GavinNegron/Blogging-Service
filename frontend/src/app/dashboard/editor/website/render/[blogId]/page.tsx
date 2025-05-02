'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchBlogContent } from '@/services/EditorService'
import './editor-overlay.sass'
import './styles.sass'

interface BlogElement {
  type: string
  content?: string
  class?: string
  children?: BlogElement[]
  attributes?: Record<string, string>
}

export default function RenderPage() {
  const params = useParams()
  const blogId = params.blogId as string

  const [elements, setElements] = useState<BlogElement[]>([])
  const [styles, setStyles] = useState<string>('')
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
            if (response.styles) {
              setStyles(response.styles)
            }
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

  const RenderElement = ({ element }: { element: BlogElement }) => {
    if (!element.type) return null
  
    const { type, content, class: className, children, attributes = {} } = element
  
    if (type === 'text') {
      return content || null
    }
  
    const voidElements = ['input', 'img', 'br', 'hr', 'meta', 'link']
  
    const updatedClass = className || ''
    const childElements: React.ReactNode[] = []
  
    if (content) {
      childElements.push(content)
    }
  
    if (children) {
      childElements.push(...children.map((child, index) => (
        <RenderElement key={index} element={child} />
      )))
    }
  
    const parsedStyle = attributes.style && typeof attributes.style === 'string'
    ? Object.fromEntries(
        attributes.style
          .split(';')
          .map(rule => rule.split(':').map(part => part.trim()))
          .filter(([prop, val]) => prop && val)
      )
    : undefined
  
  const { style, ...restAttributes } = attributes
  
  const props: any = {
    className: updatedClass,
    ...restAttributes,
    ...(parsedStyle && { style: parsedStyle }),
  }
  
  
    return voidElements.includes(type)
      ? React.createElement(type, props)
      : React.createElement(type, props, ...childElements)
  }
  

  if (loading) {
    return null
  }

  if (error) {
    return <div className='error-container'>{error}</div>
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className='SITE-CONTAINER' data-scale='1'>
        <div className='blog-content'>
          {
            elements.map((element: BlogElement, index: number) => (
              <RenderElement key={index} element={element} />
            ))
          }
        </div>
      </div>
    </>
  )
}
