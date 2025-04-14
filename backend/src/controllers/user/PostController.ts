import { Request, Response } from 'express';
import { db } from '../../config/db';
import { blog, blogPost } from './../../config/schema';
import { eq } from 'drizzle-orm';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       
    .replace(/[^a-z0-9-]/g, '')  
    .replace(/-+/g, '-')          
    .substring(0, 80);          
}

class PostController {
  getUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const limit = parseInt(req.query.limit as string) || 5;

      const userBlog = await db.select().from(blog).where(eq(blog.userId, userId)).limit(1);

      if (userBlog.length === 0) {
        res.status(200).json({ success: false, error: 'Blog not found for this user.' });
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
      res.status(500).json({ success: false, error: 'Something went wrong when fetching user blog.' });
    };
  };

  createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      let { title, tags, elements } = req.body;
  
      if (!title) {
        res.status(400).json({ success: false, error: "All fields are required." })
        return;
      }

      if (!elements) {
        elements = [];
      }
      
      const userBlog = await db.select().from(blog).where(eq(blog.userId, userId)).limit(1);
  
      if (userBlog.length === 0) {
        res.status(404).json({ success: false, error: 'Blog not found for this user.' });
        return;
      }
  
      const blogId = userBlog[0].id;
      
      const slug = generateSlug(title);
  
      const insertedPost = await db.insert(blogPost).values({
        id: crypto.randomUUID(), 
        blogId,
        title,
        slug,
        status: 'draft',
        tags,
        elements,
        author: userId, 
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
  
      res.status(201).json(insertedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Something went wrong when creating the post.' });
    }
  };

  deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { postIds: rawPostIds } = req.body;
      
      let postIds: string[] = [];
      if (typeof rawPostIds === 'string') {
        postIds = JSON.parse(rawPostIds);
      } else if (Array.isArray(rawPostIds)) {
        postIds = rawPostIds;
      }
      
      if (!id || postIds.length === 0) {
        res.status(400).json({ success: false, error: 'All fields are required.' });
        return;
      }
  
      // Select the users blog
      const userBlog = await db.select().from(blog).where(eq(blog.id, id)).limit(1);
      if (userBlog.length === 0) {
        console.log(`THIS IS THE IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: ${id}`)
        res.status(404).json({ success: false, error: 'Blog not found for this user.' });
        return;
      }
  
      // Find the posts from the ids given
      const posts = await db.select().from(blogPost).where(eq(blogPost.blogId, id));
      const foundPostIds = new Set(posts.map((post) => post.id));
  
      if (!postIds.every((postId) => foundPostIds.has(postId))) {
        res.status(404).json({ success: false, error: 'One or more posts not found or do not belong to this blog.' });
        return;
      }
      
      // Delete the posts
      await Promise.all(postIds.map((postId) => db.delete(blogPost).where(eq(blogPost.id, postId))));
  
      res.status(200).json({ success: true, message: `${postIds.length} post(s) deleted successfully.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'An unknown error occurred. Please try again later.' });
    }
  };
};

export default new PostController();