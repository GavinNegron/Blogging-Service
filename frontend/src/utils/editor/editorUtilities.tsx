import { createRoot } from 'react-dom/client'

const componentLoader: Record<string, () => Promise<any>> = {
  button: () => import('@/components/dashboard/Editor/elements/DefaultButton'),
}

const generateId = (type: string) => `${type}-${Math.random().toString(36).slice(2, 10)}`

export const handleMouseOver = (
  e: MouseEvent,
  setHoverData: (data: { type: string; className: string; content: string | null } | null) => void,
  elementRef: React.RefObject<HTMLElement | null>,
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  const target = e.target as HTMLElement
  const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
  if (!target || !iframeDoc) return

  setHoverData({
    type: target.tagName.toLowerCase(),
    className: target.className,
    content: target.textContent || null,
  })
  e.stopPropagation()
}

export const handleMouseDown = (
  e: MouseEvent,
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  elementRef: React.RefObject<HTMLElement | null>,
  startRef: React.RefObject<{ x: number; y: number }>
) => {
  const target = e.target as HTMLElement
  const iframe = iframeRef.current
  const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
  if (!target || !iframe || !iframeDoc) return

  const element = target.closest('[id]') as HTMLElement
  if (!element) return

  const wrapper = element.querySelector('.element__wrapper') as HTMLElement | null
  const siteWrapper = iframeDoc.querySelector('.SITE-CONTAINER') as HTMLElement | null
  const scale = parseFloat(siteWrapper?.dataset.scale || '1')
  
  const initialLeft = element.offsetLeft
  const initialTop = element.offsetTop
  
  startRef.current = {
    x: e.clientX,
    y: e.clientY
  }
  
  const originalLeft = initialLeft
  const originalTop = initialTop

  if (wrapper) {
    wrapper.classList.add('element__wrapper--active')
    updateTagPosition(wrapper, element, iframe, scale)
  }

  elementRef.current = element

  const handleMouseMove = (event: MouseEvent) => {
    const deltaX = event.clientX - startRef.current.x
    const deltaY = event.clientY - startRef.current.y
    
    const newX = originalLeft + (deltaX / scale)
    const newY = originalTop + (deltaY / scale)
    
    element.style.position = 'absolute'
    element.style.left = `${newX}px`
    element.style.top = `${newY}px`
    
    if (wrapper) {
      updateTagPosition(wrapper, element, iframe, scale)
    }
  }

  const onMouseUp = () => {
    iframeDoc.removeEventListener('mousemove', handleMouseMove)
    iframeDoc.removeEventListener('mouseup', onMouseUp)
    
    const wrapper = element.querySelector('.element__wrapper') as HTMLElement | null
    if (wrapper) {
      wrapper.classList.remove('element__wrapper--active', 'clip-bottom', 'clip-top')
    }
    
    if (siteWrapper) {
      siteWrapper.dataset.scale = scale.toString()
    }
  }

  iframeDoc.addEventListener('mousemove', handleMouseMove)
  iframeDoc.addEventListener('mouseup', onMouseUp)
  e.preventDefault()
}

const updateTagPosition = (
  wrapper: HTMLElement, 
  element: HTMLElement, 
  iframe: HTMLIFrameElement,
  scale: number
) => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
  if (!iframeDoc) return

  const elementRect = element.getBoundingClientRect()
  const iframeRect = iframe.getBoundingClientRect()
  
  const siteContainer = iframeDoc.querySelector('.SITE-CONTAINER') as HTMLElement | null
  if (!siteContainer) return
  
  const containerRect = siteContainer.getBoundingClientRect()
  
  const containerTop = containerRect.top - iframeRect.top
  const containerHeight = containerRect.height * scale
  
  const elementTop = elementRect.top - iframeRect.top - containerTop
  const elementBottom = elementRect.bottom - iframeRect.top - containerTop
  
  const threshold = 40
  
  wrapper.classList.remove('clip-top', 'clip-bottom')
  
  if (elementTop <= threshold) {
    wrapper.classList.add('clip-bottom')
  } 
  else if ((containerHeight - elementBottom) <= threshold) {
    wrapper.classList.add('clip-top')
  }
  else {
    wrapper.classList.add('clip-top')
  }
}

export const handleMouseOut = (
  e: MouseEvent,
  setHoverData: (data: { type: string; className: string; content: string | null } | null) => void,
  elementRef: React.RefObject<HTMLElement | null>
) => {
  if (elementRef.current) return
  setHoverData(null)
  e.stopPropagation()
}

export const handleZoom = (
  e: WheelEvent,
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  if (!e.ctrlKey) return
  e.preventDefault()
  
  const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
  const wrapper = iframeDoc?.querySelector('.SITE-CONTAINER') as HTMLElement | null
  if (!wrapper) return
  
  const currentScale = parseFloat(wrapper.dataset.scale || '1')
  const scaleFactor = 0.1
  const newScale = e.deltaY < 0 ? currentScale + scaleFactor : Math.max(0.4, currentScale - scaleFactor)
  
  wrapper.style.transform = `scale(${newScale})`
  wrapper.dataset.scale = newScale.toString() 
  
  setTimeout(() => {
    const activeWrappers = iframeDoc?.querySelectorAll('.element__wrapper--active') || []
    activeWrappers.forEach(activeWrapper => {
      const activeElement = activeWrapper.closest('[id]') as HTMLElement
      if (activeElement && iframeRef.current) {
        updateTagPosition(
          activeWrapper as HTMLElement, 
          activeElement, 
          iframeRef.current, 
          newScale
        )
      }
    })
  }, 10)
}

export const handleDelete = (element: HTMLElement) => {
  element?.remove()
}

export const handleElementDragStart = (
  e: DragEvent,
  elementData: any,
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  const data = {
    type: elementData.tag,
    content: elementData.label,
  }
  e.dataTransfer?.setData('text/plain', JSON.stringify(data))

  const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
  if (!iframeDoc) return

  iframeDoc.addEventListener('dragover', (event) => event.preventDefault())
  iframeDoc.addEventListener('drop', (event) => {
    handleElementDropInIframe(event as globalThis.DragEvent, iframeDoc)
  }, { once: true })
}

const handleElementDropInIframe = async (event: globalThis.DragEvent, iframeDoc: Document) => {
  event.preventDefault()
  const droppedData = event.dataTransfer?.getData('text/plain')
  if (!droppedData) return

  try {
    const { type } = JSON.parse(droppedData)
    if (!type || !componentLoader[type]) return

    const container = iframeDoc.createElement('div')
    container.id = generateId(type)
    iframeDoc.querySelector('.SITE-CONTAINER')?.appendChild(container)
    
    const Component = (await componentLoader[type]()).default
    createRoot(container).render(<Component />)
  } catch (err) {
    console.error('Invalid drop data in iframe:', err)
  }
}

export function convertHtmlToJson(iframeRef: React.RefObject<HTMLIFrameElement | null>): any[] {
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

  // Function to clean and parse each node
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

      if (unsafeTags.includes(tagName)) return null

      if (!validHtmlTags.has(tagName)) tagName = 'span'

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

  const iframe = iframeRef.current
  if (!iframe || !iframe.contentWindow) return []

  const iframeDoc = iframe.contentWindow.document
  const siteContainer = iframeDoc.querySelector('.SITE-CONTAINER')

  if (!siteContainer) return []

  const parser = new DOMParser()
  const dom = parser.parseFromString(siteContainer.innerHTML, 'text/html')
  const body = dom.body
  const cleaned = Array.from(body.childNodes)
    .map(cleanNode)
    .filter(node => node !== null)

  return cleaned
}
