import express from "express";
import PostController from "../controllers/user/PostController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get('/api/user/:id/blog/posts', authMiddleware, PostController.getUserPosts);

router.post('/api/user/:id/blog/posts', authMiddleware, PostController.createPost);

router.delete('/api/user/:id/blog/posts', authMiddleware, PostController.deletePost);

export default router;