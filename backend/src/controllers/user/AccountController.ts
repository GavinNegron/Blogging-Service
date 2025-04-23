import { Request, Response } from 'express'
import { db } from '../../config/db'
import { user, blog } from '../../config/schema'
import { eq } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

class AccountController {
  createUserBlog = async (req: Request, res: Response): Promise<void> => {
    let { blogName, description } = req.body || {}
    const { id: userId } = req.params

    if (!blogName) {
      res.status(400).json({ error: 'All fields are required.' })
      return
    }

    try {
      const userExists = await db.select().from(user).where(eq(user.id, userId)).execute()

      if (!userExists || userExists.length === 0) {
        res.status(404).json({ error: 'User not found.' })
        return
      }

      if (!description) description = 'No description provided for this blog.'

      const newBlog = await db.insert(blog).values({
        id: uuidv4(),
        userId: userId,
        blogName: blogName,
        description: description,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning()

      await db.update(user)
        .set({ onboardingComplete: true })
        .where(eq(user.id, userId))
        .execute()

      res.status(201).json({
        message: 'Blog created and onboarding complete.',
        data: newBlog
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to create user blog.' })
    }
  }
}

export default new AccountController()
