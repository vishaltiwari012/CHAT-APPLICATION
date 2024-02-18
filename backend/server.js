import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from './db/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';
import { app, server } from './socket/socket.js';


dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(errorMiddleware);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})