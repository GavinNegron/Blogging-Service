import express from "express";
import EditorController from "../controllers/user/editor/EditorController";

export const app = express.Router()

app.get('/api/blog/:blogId/content/', EditorController.getUserWebsiteContent);

app.get('/api/blog/:blogId/meta/', EditorController.getUserWebsiteMeta);

export default app;