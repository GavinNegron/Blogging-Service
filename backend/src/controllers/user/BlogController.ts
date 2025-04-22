import { Request, Response } from 'express';
import { db } from '../../config/db';
import { blog, user } from '../../config/schema';
import { eq } from 'drizzle-orm';

class BlogController {
  getUserBlog = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id: userId } = req.params;
  
      const userExists = await db.select().from(user).where(eq(user.id, userId)).execute();
  
      if (!userExists || userExists.length === 0) {
        res.status(404).json({ error: "User not found." });
        return;
      }
  
      const userBlog = await db
        .select({
          onboardingComplete: user.onboardingComplete,
          blogName: blog.blogName,
          description: blog.description,
        })
        .from(user)
        .innerJoin(blog, eq(blog.userId, user.id)) // Added join condition
        .where(eq(user.id, userId))
        .execute();
  
      if (userBlog.length === 0) {
        res.status(404).json({ error: "Blog not found for the user." });
        return;
      }
  
      res.status(200).json({
        onboardingComplete: userBlog[0].onboardingComplete,
        blogName: userBlog[0].blogName,
        description: userBlog[0].description,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get user blog details." });
    }
  };
  
  
  createUserBlog = async (req: Request, res: Response): Promise<void> => {
    let { blogName, description } = req.body || {};
    const { id: userId } = req.params;

    if (!blogName) {
      res.status(400).json({ error: "All fields are required."});
      return;
    }

    try {
       const userExists = await db.select().from(user).where(eq(user.id, userId)).execute();

       if (!userExists || userExists.length === 0) {
        res.status(404).json({ error: "User not found." });
        return;
       }

       if (!description) description = "No description provided for this blog.";

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