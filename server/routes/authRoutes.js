import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, (req, res) => res.json({
  user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role },
}));
export default router;
