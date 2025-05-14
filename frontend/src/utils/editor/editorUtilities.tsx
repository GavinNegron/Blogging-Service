import { createRoot } from 'react-dom/client'

const componentLoader: Record<string, () => Promise<any>> = {
  button: () => import('@/components/dashboard/Editor/elements/DefaultButton'),
  nav: () => import('@/components/dashboard/Editor/elements/DefaultNav')
}

const generateId = (type: string) => `${type}-${Math.random().toString(36).slice(2, 10)}`

export const handleMouseOver = (
  e: MouseEvent,
  setHoverData: (data: { type: string; className: string; content: string | null } | null) => void,
  elementRef: React.RefObject<HTMLElement | null>,
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  const target = e.target as HTMLElement
  const iframe = iframeRef.current
  const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
  if (!target || !iframeDoc || !iframe) return

  const hoveredElement = target.closest('[id]') as HTMLElement
  if (!hoveredElement) return

  // Update hover data
  setHoverData({
    type: target.tagName.toLowerCase(),
    className: target.className,
    content: target.textContent || null,
  })

  // Activate wrapper
  const wrapper = hoveredElement.querySelector('.element__wrapper') as HTMLElement | null
  const sitewrapper = iframeDoc.querySelector('.SITE-CONTAINER') as HTMLElement | null
  const scale = parseFloat(sitewrapper?.dataset.scale || '1')

  iframeDoc.querySelectorAll('.element__wrapper').forEach(existing => {
    if (!hoveredElement || !existing.closest('[id]')?.isSameNode(hoveredElement)) {
      existing.classList.remove('element__wrapper--active', 'clip-top', 'clip-bottom')
    }
  })

  if (wrapper) {
    wrapper.classList.add('element__wrapper--active')
    updateTagPosition(wrapper, hoveredElement, iframe, scale)
  }

  e.stopPropagation()
}


export const handleMouseDown = (
  e: MouseEvent,
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  elementRef: React.RefObject<HTMLElement | null>,
  startRef: React.RefObject<{ x: number; y: number }>,
  blogId?: string,
  addPendingAction?: (action: any) => void
) => {
  let dragged = false
  const target = e.target as HTMLElement
  const iframe = iframeRef.current
  const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
  if (!target || !iframe || !iframeDoc) return

  const element = target.closest('[id]') as HTMLElement
  if (!element) return
  const wrapper = element.querySelector('.element__wrapper') as HTMLElement | null

  const sitewrapper = iframeDoc.querySelector('.SITE-CONTAINER') as HTMLElement | null
  const scale = parseFloat(sitewrapper?.dataset.scale || '1')

  const originalLeft = element.offsetLeft
  const originalTop = element.offsetTop

  startRef.current = {
    x: e.clientX,
    y: e.clientY
  }

  if (wrapper) {
    wrapper.classList.add('element__wrapper--active')
    updateTagPosition(wrapper, element, iframe, scale)
  }

  elementRef.current = element

  const handleMouseMove = (e: MouseEvent) => {
    dragged = true
    const deltaX = e.clientX - startRef.current.x
    const deltaY = e.clientY - startRef.current.y

    if (!sitewrapper) return

    const containerRect = sitewrapper.getBoundingClientRect()

    const scaledContainerWidth = containerRect.width / scale
    const scaledContainerHeight = containerRect.height / scale

    let newX = originalLeft + (deltaX / scale)
    let newY = originalTop + (deltaY / scale)

    newX = Math.max(0, Math.min(newX, scaledContainerWidth - element.offsetWidth))
    newY = Math.max(0, Math.min(newY, scaledContainerHeight - element.offsetHeight))

    element.style.position = 'absolute'
    element.style.left = `${newX}px`
    element.style.top = `${newY}px`

    if (wrapper) updateTagPosition(wrapper, element, iframe, scale)
  }

  const handleMouseUp = () => {
    iframeDoc.removeEventListener('mousemove', handleMouseMove)
    iframeDoc.removeEventListener('mouseup', handleMouseUp)
  
    const wrapper = element.querySelector('.element__wrapper') as HTMLElement | null
    wrapper?.classList.remove('element__wrapper--active', 'clip-bottom', 'clip-top')
  
    const sitewrapper = iframeDoc.querySelector('.SITE-CONTAINER') as HTMLElement | null
    const scale = parseFloat(sitewrapper?.dataset.scale || '1')
  
    if (dragged && blogId) {
      const newX = parseFloat(element.style.left || '0')
      const newY = parseFloat(element.style.top || '0')
    
      const action = {
        type: 'DRAG_ELEMENT',
        payload: {
          id: element.id,
          layout: { x: newX, y: newY }
        }
      }
    
      if (addPendingAction) {
        addPendingAction(action)
      }
    }
  
    if (sitewrapper) sitewrapper.dataset.scale = scale.toString()
  }

  iframeDoc.addEventListener('mousemove', handleMouseMove)
  iframeDoc.addEventListener('mouseup', handleMouseUp)
  e.preventDefault()
}

export const handleMouseClick = (
  e: MouseEvent,
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
) => {
  const target = e.target as HTMLElement
  const iframe = iframeRef.current
  const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
  if (!target || !iframe || !iframeDoc) return

  const clickedElement = target.closest('[id]') as HTMLElement

  iframeDoc.querySelectorAll('.element__wrapper').forEach(wrapper => {
    if (!clickedElement || !wrapper.closest('[id]')?.isSameNode(clickedElement)) {
      wrapper.classList.remove('element__wrapper--active', 'clip-top', 'clip-bottom')
    }
  })

  if (clickedElement) {
    const wrapper = clickedElement.querySelector('.element__wrapper') as HTMLElement | null
    const sitewrapper = iframeDoc.querySelector('.SITE-CONTAINER') as HTMLElement | null
    const scale = parseFloat(sitewrapper?.dataset.scale || '1')
    if (wrapper) {
      wrapper.classList.add('element__wrapper--active')
      updateTagPosition(wrapper, clickedElement, iframe, scale)
    }
    target.style.cursor = 'move'
  }
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
  } else {
    wrapper.classList.add('clip-top')
  }
}

export const handleMouseOut = (
  e: MouseEvent,
  setHoverData: (data: { type: string; className: string; content: string | null } | null) => void,
  elementRef: React.RefObject<HTMLElement | null>,
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  const target = e.target as HTMLElement
  const iframe = iframeRef.current
  const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document
  if (!target || !iframeDoc || !iframe) return

  const element = target.closest('[id]') as HTMLElement
  if (!element) return

  const wrapper = element.querySelector('.element__wrapper') as HTMLElement | null
  wrapper?.classList.remove('element__wrapper--active', 'clip-top', 'clip-bottom')

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
  const maxScale = 2
  const minScale = 0.7

  const newScale = e.deltaY < 0
    ? Math.min(maxScale, currentScale + scaleFactor)
    : Math.max(minScale, currentScale - scaleFactor)

  wrapper.style.transform = `scale(${newScale})`
  wrapper.dataset.scale = newScale.toString()

  setTimeout(() => {
    iframeDoc?.querySelectorAll('.element__wrapper--active').forEach(activewrapper => {
      const activeElement = activewrapper.closest('[id]') as HTMLElement
      if (activeElement && iframeRef.current) {
        updateTagPosition(
          activewrapper as HTMLElement,
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
  e: React.DragEvent<HTMLElement>,
  elementData: any,
) => {
  e.dataTransfer?.setData('application/x-editor-element', JSON.stringify({
    type: elementData.tag,
    content: elementData.label,
  }));
}

export const handleElementDropInIframe = async (
  e: DragEvent,
  iframeDoc: Document,
  dispatch?: (action: any) => void,
  blogId?: string,
  addPendingAction?: (action: any) => void
) => {
  e.preventDefault()
  e.stopPropagation()

  const droppedData = e.dataTransfer?.getData('application/x-editor-element')
  if (!droppedData) return

  try {
    const { type, content } = JSON.parse(droppedData)
    if (!type || !componentLoader[type]) return

    const id = generateId(type)
    const container = iframeDoc.createElement('div')
    container.id = id

    const siteContainer = iframeDoc.querySelector('.SITE-CONTAINER')
    if (!siteContainer) return

    siteContainer.appendChild(container)

    const Component = (await componentLoader[type]()).default
    createRoot(container).render(<Component />)

    const rect = siteContainer.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    container.style.position = 'absolute'
    container.style.left = `${x}px`
    container.style.top = `${y}px`

    if (dispatch && blogId) {
      const action = {
        type: 'ADD_ELEMENT',
        payload: {
          id,
          elementType: type,
          content,
          layout: { x, y }
        }
      }
      
      if (addPendingAction) {
        addPendingAction(action)
      }
      
      dispatch(action)
    }
  } catch (err) {
    console.error('Drop handling failed:', err)
  }
}