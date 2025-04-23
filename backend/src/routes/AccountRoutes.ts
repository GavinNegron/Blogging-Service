import express from "express";
import AccountController from "../controllers/user/AccountController";

export const app = express.Router()

app.post('/api/user/:id/onboarding/complete', AccountController.createUserBlog);

export default app;