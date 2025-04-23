import express from "express";
import PublicController from "../controllers/public/PublicController";

const router = express.Router();

router.get('/api/public/blog/:id/details', PublicController.getBlogDetails);

export default router;