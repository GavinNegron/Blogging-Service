import express from "express";
import BlogController from "../controllers/user/BlogController";

export const app = express.Router()

app.get('/api/user/:id/blog', BlogController.getUserBlog);

export default app;