import express from "express";
import {
  createTnpAdmin,
  createStudent,
  loginUser,
  logoutUser,
  listUsersOfCollege,
  updateStudentProfile, // New controller for updating student profile
  deleteStudent,
} from "../controller/user.controller.js";
import { protect, authorizeRoles } from "../middleware/auth.middleware.js";
import { checkSubscription } from "../middleware/checkSubscription.middleware.js";

const router = express.Router();

// Global Admin creates TNP Admin
router.post("/create-tnp-admin", protect, authorizeRoles("global_admin"), createTnpAdmin);

// TNP Admin creates Student (Subscription Check Applied)
router.post(
  "/create-student",
  protect,
  authorizeRoles("tnp_admin"),
  checkSubscription,
  createStudent
);

// Student Updates Their Own Profile
router.put(
  "/update-profile/:studentId",
  protect,
  authorizeRoles("student", "tnp_admin"), // Both Student and TNP Admin can update
  updateStudentProfile
);

// Login and Logout
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// List all users of a specific college
router.get(
  "/college/:collegeId/users",
  protect,
  authorizeRoles("global_admin", "tnp_admin"),
  listUsersOfCollege
);

// TNP Admin deletes a student
router.delete(
  "/delete-student/:studentId",
  protect,
  authorizeRoles("tnp_admin"),
  deleteStudent
);

export default router;
