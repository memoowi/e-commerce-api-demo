import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Route: Register user
router.post("/register", registerUser);

// Route: Login user
router.post("/login", loginUser);

export default router;
