import { Request, Response } from 'express';

class BlogController {
  getUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
       
    } catch (error) {
        res.status(500).json({ error: "Failed to get user posts." });
    }
  };
}

export default new BlogController();