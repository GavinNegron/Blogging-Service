import express from "express";
import PostController from "../controllers/user/PostController";

export const app = express.Router()

app.get('/api/auth/session', PostController.getUserPosts);

export default app;