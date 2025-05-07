import express from "express";
import EditorController from "../controllers/user/editor/EditorController";

export const app = express.Router()

app.get('/api/blog/:blogId/content/', EditorController.getUserWebsiteContent);

app.post('/api/blog/:blogId/save-action/', EditorController.saveEditorAction);

export default app;