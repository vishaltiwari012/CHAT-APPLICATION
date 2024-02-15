import express from 'express';
import { getUsersForSidebar } from '../controllers/user.controller.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

router.get("/", isAuthorized, getUsersForSidebar);

export default router;