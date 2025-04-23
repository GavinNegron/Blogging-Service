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
}

export default new BlogController();