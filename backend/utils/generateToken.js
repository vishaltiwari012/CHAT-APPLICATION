
export const generateToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly : true, //prevent XSS attacks from cross-site scripting attacks
        sameSite : "strict", // CSRF attacks cross-site request forgery attacks
        secure : process.env.NODE_ENV !== "development"
    };
    res.status(statusCode).cookie("token", token, options).json({
        success : true,
        user,
        message,
        token
    })
}