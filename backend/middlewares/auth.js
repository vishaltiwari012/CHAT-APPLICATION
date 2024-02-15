import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const isAuthorized = catchAsyncError(async(req, res, next) => {
    try {
        const {token} = req.cookies;
    if(!token) {
        res.status(401).json({error : "User not authorized"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
        return next(new ErrorHandler("Invalid Token", 401));
    }
    const user = await User.findById(decoded.id).select("-password");
    if(!user) {
        res.status(404).json({error : "User not found"});
    }
    req.user = user;
    next();
    } catch (error) {
        console.log("Error in authorizing user", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
})