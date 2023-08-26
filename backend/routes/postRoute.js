import express from "express";
import { createPost, deletePostById, getAllPost, getPostById, getTopLikedPosts, getTotalPosts, likePostById, unlikePostById, updatePostById } from "../controllers/postController.js";
import { isAuthenticated } from "../Authenticate/isAuth.js";
const router = express.Router();

router.route("/getpost").get(getAllPost)

router.route('/posts').post(createPost , isAuthenticated);

// Retrieve a post by id
router.route('/posts/:id').get(getPostById , isAuthenticated);

// Update a post's content by id (requires authentication)
router.route('/posts/:id').put( updatePostById,isAuthenticated);

// Delete a post by id (requires authentication)
router.route('/posts/:id').delete( deletePostById,isAuthenticated);

// Increment the like count of a post by id (requires authentication)
router.route('/posts/:id/like').post(likePostById);

// Decrement the like count of a post by id (not below 0)
router.route('/posts/:id/unlike').post(unlikePostById);

// Retrieve the total number of posts
router.route('/analytics/posts').get(getTotalPosts);

// Retrieve the top 5 most liked posts
router.route('/analytics/posts/top-liked').get(getTopLikedPosts);

export default router;