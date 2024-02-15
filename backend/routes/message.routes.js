import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

router.get("/:id", isAuthorized, getMessages);
router.post("/send/:id", isAuthorized, sendMessage);

export default router;