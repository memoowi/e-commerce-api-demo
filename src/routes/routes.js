import express from "express";
import {
  registerUser,
  loginUser,
  userData,
  logoutUser,
} from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import {
  addCategory,
  getCategories,
} from "../controllers/categoriesController.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", requireAuth, userData);
router.post("/logout", requireAuth, logoutUser);

router.get("/categories", getCategories);
router.post("/categories", requireAuth, uploadMiddleware, addCategory);

export default router;
