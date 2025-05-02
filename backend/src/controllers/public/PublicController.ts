import { Request, Response } from 'express';
import { db } from '../../config/db';
import { blog } from '../../config/schema';
import { eq, sql } from 'drizzle-orm';

class PublicController {
  getBlogDetails = async (req: Request, res: Response) => {
    try {
      const { id: blogName } = req.params;
      
      const userBlog = await db
        .select({
          id: blog.id,
          blogName: blog.blogName,
          description: blog.description,
        })
        .from(blog)
        .where(sql`LOWER(${blog.blogName}) = LOWER(${blogName})`)
        .execute();
      
      if (userBlog.length === 0) {
        res.status(404).json({ error: "Blog not found for the user." });
        return;
      }
      
      res.status(200).json({
        id: userBlog[0].id,
        name: userBlog[0].blogName,
        description: userBlog[0].description,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get user blog details." });
    }
  };
}

export default new PublicController();