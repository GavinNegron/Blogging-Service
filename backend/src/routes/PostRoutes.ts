import express from "express";
import PostController from "../controllers/user/PostController";

export const app = express.Router()

app.get('/api/user/:id/blog/posts', PostController.getUserPosts);

export default app;