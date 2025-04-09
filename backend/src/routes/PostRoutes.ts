import express from "express";
import PostController from "../controllers/user/PostController";

export const app = express.Router()

app.get('/api/user/:id/blog/posts', PostController.getUserPosts);

app.post('/api/user/:id/blog/posts', PostController.createPost);

app.delete('/api/user/:id/blog/posts/', PostController.deletePost);

export default app;