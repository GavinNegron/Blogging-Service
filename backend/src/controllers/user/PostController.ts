import { Request, Response } from 'express';
import { db } from '../../config/db';
import { blog, blogPost } from './../../config/schema';
import { eq } from 'drizzle-orm';

class PostController {
  getUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const limit = parseInt(req.query.limit as string) || 5;

      const userBlog = await db.select().from(blog).where(eq(blog.userId, userId)).limit(1);

      if (userBlog.length === 0) {
        res.status(404).json({ error: 'Blog not found for this user.' });
        return;
      }

      const blogId = userBlog[0].id;
      const posts = await db
        .select({
            id: blogPost.id,
            title: blogPost.title,
            slug: blogPost.slug,
            status: blogPost.status,
            tags: blogPost.tags,
            createdAt: blogPost.createdAt,
            updatedAt: blogPost.updatedAt
        })
        .from(blogPost)
        .where(eq(blogPost.blogId, blogId))
        .limit(limit);

        res.json(posts);
      return;
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong when fetching user blog.' });
    };
  };
};

export default new PostController();