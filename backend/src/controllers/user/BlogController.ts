import { Request, Response } from 'express';
import { db } from '../../config/db';
import { blog, user } from '../../config/schema';
import { eq } from 'drizzle-orm';

class BlogController {
  createUserBlog = async (req: Request, res: Response): Promise<void> => {
    const { blogName, description } = req.body || {};
    const { id: userId } = req.params;

    if (!blogName || !description) {
      res.status(400).json({ error: "All fields are required."});
      return;
    }

    try {
       const userExists = await db.select().from(user).where(eq(user.id, userId)).execute();

       if (!userExists || userExists.length === 0) {
        res.status(404).json({ error: "User not found." });
        return;
       }

       const newBlog = await db.insert(blog).values({
        id: userId,
        userId: userId,
        blogName: blogName,
        description: description,
        createdAt: new Date(),
        updatedAt: new Date(),
       }).returning();  

       res.status(201).json({ message: "Blog created successfully.", data: newBlog });

    } catch (error) {
        res.status(500).json({ error: "Failed to create user blog." });
    }
  };
}

export default new BlogController();