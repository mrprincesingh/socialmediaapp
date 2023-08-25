import express from "express";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { Post } from "../model/postSechma.js";
import ErrorHandler from "../utils/errorHandling.js";
const router = express.Router();
// Create a new post

export const getAllPost = catchAsyncError(async (req, res, next) => {
  const posts = await Post.find({});
  res.status(200).json({
    success: true,
    posts,
  });

});

export const createPost = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  req.body.user = userId;
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);

  });
  
  // Retrieve a post by id
  export const getPostById = catchAsyncError(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler('Post not found', 404));
    res.json(post);
  });
  
  // Update a post's content by id
  export const updatePostById = catchAsyncError(async (req, res, next) => {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        updated_at: Date.now(),
      },
      { new: true }
    );
    if (!post) return next(new ErrorHandler('Post not found', 404));
    res.json(post);
  });
  
  // Delete a post by id
  export const deletePostById = catchAsyncError(async (req, res, next) => {
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) return next(new ErrorHandler('Post not found', 404));
    res.json({ message: 'Post deleted' });
  });
  
  // Increment the like count of a post by id
  export const likePostById = catchAsyncError(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler('Post not found', 404));
  
    post.likes += 1;
    await post.save();
  
    res.json(post);
  });
  
  // Decrement the like count of a post by id (not below 0)
  export const unlikePostById = catchAsyncError(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new ErrorHandler('Post not found', 404));
  
    if (post.likes > 0) {
      post.likes -= 1;
      await post.save();
    }
  
    res.json(post);
  });
  
  // Retrieve the total number of posts
  export const getTotalPosts = catchAsyncError(async (req, res, next) => {
    const totalPosts = await Post.countDocuments();
    res.json({ totalPosts });
  });
  
  // Retrieve the top 5 most liked posts
  export const getTopLikedPosts = catchAsyncError(async (req, res, next) => {
    const topLikedPosts = await Post.find()
      .sort({ likes: -1 })
      .limit(5);
    res.json(topLikedPosts);
  });