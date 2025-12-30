import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validator.js";
import { registerSchema, loginSchema } from "../validation/userValidators.js";

const router = express.Router();
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/profile", protect, getProfile);

export default router;
