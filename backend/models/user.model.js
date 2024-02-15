import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema= new mongoose.Schema({
    fullName : {
        type : String, 
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    }, 
    gender : {
        type : String,
        required : true,
        enum : ["male", "female"]
    },
    profilePic : {
        type : String,
        default : ""
    }
}, {timestamps : true});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
})

//Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password || "");
}

userSchema.methods.getJWTToken = function() {
    return jwt.sign(
        {id : this._id}, process.env.JWT_SECRET,
        {expiresIn : process.env.JWT_EXPIRE}
    )
}

const User = mongoose.model("User", userSchema);

export default User;