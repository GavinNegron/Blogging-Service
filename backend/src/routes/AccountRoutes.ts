import express from "express";
import AccountController from "../controllers/user/AccountController";

export const app = express.Router()

app.put('/api/user/:id/onboarding/complete', AccountController.completeOnboarding);

export default app;