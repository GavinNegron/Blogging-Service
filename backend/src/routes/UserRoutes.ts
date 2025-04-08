import express from "express";
import UserController from "../controllers/user/UserController";

export const app = express.Router()

app.get('/api/user/profile', UserController.getUserProfile);

export default app;