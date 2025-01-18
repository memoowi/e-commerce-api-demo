import express from "express";
import {
  registerUser,
  loginUser,
  userData,
} from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route: Register user
router.post("/register", registerUser);

// Route: Login user
router.post("/login", loginUser);

router.get("/user", requireAuth, userData);

export default router;
