import express from "express";
import BlogController from "../controllers/user/BlogController";

export const app = express.Router()

app.post('/api/user/:id/blog', BlogController.createUserBlog);

export default app;