import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import User from "../models/user.model.js";
import { generateToken } from '../utils/generateToken.js';

export const signup = catchAsyncError(async (req, res, next) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return next(new ErrorHandler("Please fill full registration form!"))
        }
        if (password !== confirmPassword) {
            return next(new ErrorHandler("Password doesn't match", 400));
        }

        const user = await User.findOne({ username });
        if (user) {
            return next(new ErrorHandler("User already exists", 400));
        }


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            await newUser.save();

            // res.status(201).json({
            // _id : newUser._id,
            // fullName : newUser.fullName,
            // username : newUser.username,
            // profilePic : newUser.profilePic
            // });
            generateToken(newUser, 200, res, "User registered successfully!");
        }
        else {
            res.status(400).json({ error: "invalid user data" })
        }


    } catch (error) {
        console.log("Error in signup", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

export const login = catchAsyncError(async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordMatched = await user.comparePassword(password);
        if (!user || !isPasswordMatched) {
            res.status(400).json({ error: "Invalid username or password" })
        }
        generateToken(user, 200, res, "User logged in successfully!");
    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

export const logout = catchAsyncError(async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly : true,
            expires : new Date(Date.now())
        }).json({
            success : true,
            message : "User logged out successfully"
        })
    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
})