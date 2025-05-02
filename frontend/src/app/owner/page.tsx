'use client'

import { useState } from 'react'

const unsafeTags = [
  'script',
  'iframe',
  'object',
  'embed',
  'style',
  'link',
  'meta'
]

const validHtmlTags = new Set([
  'html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'nav', 'ul', 'ol', 'li', 'section',
  'header', 'footer', 'main', 'aside', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'form', 'input', 'button', 'textarea', 'select', 'option', 'label', 'fieldset', 'legend',
  'table', 'thead', 'tbody', 'tr', 'td', 'th',
  'article', 'figure', 'figcaption', 'blockquote', 'pre', 'code',
  'video', 'audio', 'source', 'br', 'hr', 'strong', 'em', 'b', 'i', 'u', 'small', 'sup', 'sub'
])

function cleanNode(node: Element | ChildNode): any {
  if (node.nodeType === 8) return null // comment node

  if (node.nodeType === 3) {
    const text = node.textContent?.trim()
    if (!text) return null
    return {
      type: 'text',
      content: text
    }
  }

  if (node.nodeType === 1) {
    const element = node as Element
    let tagName = element.tagName.toLowerCase()

    if (unsafeTags.includes(tagName))
      return null

    if (!validHtmlTags.has(tagName))
      tagName = 'span'

    const obj: any = {
      type: tagName
    }

    if (element.getAttribute('class'))
      obj.class = element.getAttribute('class')

    const attributes = Array.from(element.attributes)
      .filter(attr => attr.name !== 'class')
      .reduce((acc, attr) => {
        acc[attr.name] = attr.value
        return acc
      }, {} as Record<string, string>)

    if (Object.keys(attributes).length > 0)
      obj.attributes = attributes

    const children = Array.from(element.childNodes)
      .map(cleanNode)
      .filter(child => child !== null)

    if (children.length > 0)
      obj.children = children

    if (!obj.children && element.textContent?.trim()) {
      obj.content = element.textContent.trim()
    }

    return obj
  }

  return null
}

export default function Page() {
  const [htmlInput, setHtmlInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')

  const handleConvert = () => {
    const parser = new DOMParser()
    const dom = parser.parseFromString(htmlInput, 'text/html')

    const body = dom.body
    const cleaned = Array.from(body.childNodes)
      .map(cleanNode)
      .filter(node => node !== null)

    setJsonOutput(JSON.stringify(cleaned))
  }

  return (
    <div className='p-6 flex flex-col gap-4'>
      <textarea
        placeholder='Paste your full HTML here'
        className='border rounded p-2 h-64'
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
      />

      <button
        className='bg-blue-600 text-white rounded p-2'
        onClick={handleConvert}
      >
        Convert to JSON
      </button>

      <textarea
        readOnly
        className='border rounded p-2 h-64'
        value={jsonOutput}
      />
    </div>
  )
}
