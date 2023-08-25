import {User } from "../model/userSechma.js"
import { sendToken } from "../utils/SendToken.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandling.js";

// Create a new user
export const createUser = catchAsyncError(async (req, res, next) => {
  const newUser = new User(req.body);
  

  const existingUser = await User.findOne({ email: newUser.email });
  if (existingUser) {
    return next(new ErrorHandler("User is already registered", 409));
  }

  const savedUser = await newUser.save();
  sendToken(res, savedUser, `User Created Welcome ${savedUser.name}`, 200);
});

export const VerifyUser = catchAsyncError(async (req , res , next)=>{
  const { email, password } = req.body;
  
  if (!email || !password)
    return next(new ErrorHandler("please enter all the required fields", 400));

    const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("incorrect email or password", 401));
  
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(new ErrorHandler("incorrect email or password", 401));
  sendToken(res, user, `welcome back ${user.name}`, 200);
})


  export const getUserById = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler('User not found', 404));
    res.json({Success:true , User:user});
  });

  export const updateUserById = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        bio: req.body.bio,
        updated_at: Date.now(),
      },
      { new: true }
    );
    if (!user) return next(new ErrorHandler('User not found', 404));
    res.json({Success:true , User:user});
  });
  
  // Delete a user by id
  export const deleteUserById = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler('User not found', 404));
  
  
  
    await User.deleteOne({ _id: req.params.id });
  
    res.status(200).json({
      success: true,
      message: 'User Deleted Successfully',
    });
  });
  
  // Retrieve the total number of users
  export const getTotalUsers = catchAsyncError(async (req, res, next) => {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  });
  
  // Retrieve the top 5 most active users (based on the number of posts)
  export const getTopActiveUsers = catchAsyncError(async (req, res, next) => {
    const topActiveUsers = await User.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'user',
          as: 'posts',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          numPosts: { $size: '$posts' },
        },
      },
      { $sort: { numPosts: -1 } },
      { $limit: 5 },
    ]);
    res.json({Success:true , ActiveUser:topActiveUsers});
  });