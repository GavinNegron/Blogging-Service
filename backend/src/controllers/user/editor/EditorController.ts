import { Request, Response } from 'express'
import { db } from '../../../config/db'
import { blog, blogMeta } from '../../../config/schema'
import { eq, sql } from 'drizzle-orm'

interface BlogElement {
  id: string
  type: string
  layout?: Record<string, any>
  class?: string
  content?: string
  children?: BlogElement[]
}

class EditorController {
  getUserWebsiteContent = async (req: Request, res: Response): Promise<void> => {
    const { blogId } = req.params

    if (!blogId) {
      res.status(400).json({ error: 'Missing blogId parameter' })
      return
    }

    try {
      const result = await db.select().from(blog).where(eq(blog.id, blogId)).limit(1)

      if (result.length === 0) {
        res.status(404).json({ error: 'Blog not found' })
        return
      }

      res.status(200).json(result[0])
    } catch (error) {
      console.error('[ERROR_FETCHING_BLOG]', error)
      res.status(500).json({ error: '[ERROR_FETCHING_BLOG]' })
    }
  }

  saveEditorAction = async (req: Request, res: Response): Promise<void> => {
    const { blogId } = req.params
    const { type, payload } = req.body || {}

    if (!blogId || !type || !payload) {
      res.status(400).json({ error: 'All fields are required' })
      return
    }

    try {
      const [currentBlog] = await db.select()
        .from(blog)
        .where(eq(blog.id, blogId))
        .limit(1)

      if (!currentBlog) {
        res.status(404).json({ error: 'Blog not found' })
        return
      }

      const currentContent = currentBlog.content || []
      let content: BlogElement[] = Array.isArray(currentContent) ? currentContent : []

      switch (type) {
        case 'ADD_ELEMENT': {
          const { id, elementType, content: elementContent, layout } = payload
          content = this.addElement(content, {
            id,
            type: elementType,
            content: elementContent,
            layout
          })
          break
        }
        case 'DELETE_ELEMENT': {
          const idToDelete = payload.id
          content = this.deleteElement(content, idToDelete)
          break
        }
        case 'DRAG_ELEMENT': {
          const { id, layout } = payload
          content = this.updateElementPosition(content, id, layout)
          break
        }
        default:
          res.status(400).json({ error: 'Unsupported action type' })
          return
      }

      await db.update(blog)
        .set({
          content,
          updatedAt: sql`CURRENT_TIMESTAMP`
        })
        .where(eq(blog.id, blogId))

      res.status(200).json({
        success: true,
      })
    } catch (error) {
      console.error('[ERROR_SAVING_ACTION]', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      })
    }
  }

  private updateElementPosition(elements: BlogElement[], id: string, layout: { x: number, y: number }): BlogElement[] {
    return elements.map(element => {
      if (element.id === id) {
        return {
          ...element,
          layout: {
            ...element.layout,
            x: layout.x,
            y: layout.y,
          },
        }
      }
      if (element.children) {
        element.children = this.updateElementPosition(element.children, id, layout)
      }
      return element
    })
  }

  private addElement(
    elements: BlogElement[],
    newElement: {
      id: string,
      type: string,
      content: string,
      layout: { x: number, y: number }
    }
  ): BlogElement[] {
    const mainElement: BlogElement = {
      id: '',
      type: newElement.type,
      class: `element-${this.getComponentClassName(newElement.type)}`,
      content: newElement.content
    }
  
    const overlayDiv: BlogElement = {
      id: '',
      type: 'div',
      class: 'element__overlay'
    }
  
    const wrapperDiv: BlogElement = {
      id: '',
      type: 'div',
      layout: {
        'data-block': this.getComponentClassName(newElement.type)
      },
      class: 'element__wrapper no-select',
      children: [mainElement, overlayDiv]
    }
  
    const layoutedWrapper: BlogElement = {
      id: newElement.id,
      type: 'div',
      layout: {
        width: null,
        height: null,
        x: newElement.layout.x,
        y: newElement.layout.y,
        scale: null,
        rotation: null
      },
      class: '',
      children: [wrapperDiv]
    }
  
    return [...elements, layoutedWrapper]
  }
  
  private getComponentClassName(type: string): string {
    const classMap: Record<string, string> = {
        'button': 'DefaultButton',
        'h1': 'Heading1',
        'h2': 'Heading2',
    };
    return classMap[type] || type;
  }

  private deleteElement(elements: BlogElement[], id: string): BlogElement[] {
      return elements.filter(element => {
          if (element.id === id) return false;
          if (element.children) {
              element.children = this.deleteElement(element.children, id);
          }
          return true;
      });
  }
}

export default new EditorController()