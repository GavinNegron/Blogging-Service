import { Request, Response } from 'express'
import { db } from '../../../config/db'
import { blog, blogMeta } from '../../../config/schema'
import { eq } from 'drizzle-orm'

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
      res.status(500).json({ error: 'Internal server error' })
    }
  }
  getUserWebsiteMeta = async (req: Request, res: Response): Promise<void> => {
    const { blogId } = req.params

    if (!blogId) {
      res.status(400).json({ error: 'Missing blogId parameter' })
      return
    }

    try {
      const result = await db.select().from(blogMeta).where(eq(blogMeta.blogId, blogId)).limit(1);

      if (result.length === 0) {
        res.status(404).json({ error: 'Blog not found' })
        return
      }

      res.status(200).json(result[0])
    } catch (error) {
      console.error('[ERROR_FETCHING_BLOG]', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export default new EditorController()