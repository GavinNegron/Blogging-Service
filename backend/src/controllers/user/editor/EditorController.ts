import { Request, Response } from 'express'
import { db } from '../../../config/db'
import { blog } from '../../../config/schema'
import { eq, sql } from 'drizzle-orm'

interface BlogElement {
  id?: string
  type: string
  layout?: Record<string, any>
  meta?: Record<string, any>
  class?: string
  content?: string
  children?: BlogElement[]
}

interface EditorAction {
  type: string;
  payload: any;
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
    const { correlationId, actions } = req.body || {}

    if (!blogId || !actions || !Array.isArray(actions) || actions.length === 0) {
      res.status(400).json({ error: 'Valid blogId and actions array are required' })
      return
    }

    try {
      // Process each action in sequence
      for (const action of actions) {
        if (!action.type || !action.payload) {
          res.status(400).json({ error: 'Each action requires type and payload' })
          return
        }
        
        await this.applyAction(blogId, action)
      }
      
      res.status(200).json({
        success: true,
        correlationId
      })
    } catch (error) {
      console.error('[ERROR_SAVING_BATCH_ACTIONS]', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        correlationId
      })
    }
  }
  
  private async applyAction(blogId: string, action: EditorAction): Promise<void> {
    const { type, payload } = action
    
    const [currentBlog] = await db.select()
      .from(blog)
      .where(eq(blog.id, blogId))
      .limit(1)

    if (!currentBlog) {
      throw new Error('Blog not found')
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
        throw new Error('Unsupported action type')
    }

    await db.update(blog)
      .set({
        content,
        updatedAt: sql`CURRENT_TIMESTAMP`
      })
      .where(eq(blog.id, blogId))
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
    elementData: {
      id: string,
      type: string,
      content?: string,
      layout: { x: number, y: number },
      class?: string,
      children?: BlogElement[],
      [key: string]: any
    }
  ): BlogElement[] {
    const { id, type, content, layout, children, ...rest } = elementData;

    const mainElement: BlogElement = {
      id,
      type,
      content,
      children,
      layout: {
        x: layout.x,
        y: layout.y,
        width: null,
        height: null,
        scale: null,
        rotation: null
      },
      ...rest
    };

    return [...elements, mainElement];
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