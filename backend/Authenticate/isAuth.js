import { User } from "../model/userSechma.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandling.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = catchAsyncError(async(req , res , next)=>{
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler('Not Logged in', 401));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id);
      next();
    } catch (error) {
      return next(new ErrorHandler('Authentication failed', 401));
    }
})
