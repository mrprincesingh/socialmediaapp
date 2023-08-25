import express from "express";
import { VerifyUser, createUser, deleteUserById, getTopActiveUsers, getTotalUsers, getUserById, updateUserById } from "../controllers/userController.js";
const router = express.Router();


// Create a new user
router.route('/users').post(createUser);
//Verify User
router.route('/verifyusers').post(VerifyUser)
// Retrieve a user by id
router.route('/users/:id').get(getUserById);

// Update a user's name or bio by id
router.route('/users/:id').put(updateUserById);

// Delete a user by id
router.route('/users/:id').delete(deleteUserById);

// Retrieve the total number of users
router.route('/analytics/users').get(getTotalUsers);

// Retrieve the top 5 most active users
router.route('/analytics/users/top-active').get(getTopActiveUsers);

export default router;