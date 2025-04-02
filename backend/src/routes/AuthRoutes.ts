import express from "express";
import AuthController from "../controllers/user/AuthController";

export const app = express.Router()

app.get('/api/auth/session', AuthController.getUserSession);

app.post('/api/auth/register', AuthController.registerUser);

app.post('/api/auth/login', AuthController.loginUser);

export default app;