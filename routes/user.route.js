import express from "express";
import { signup, login } from "../controller/auth.controller.js";
import authUser from "../middleware/auth.middleware.js";
import BlackListToken from "../models/blackListToken.model.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", authUser, (req, res) => {
  return res.status(200).json({ user: req.user });
});

router.post("/logout", authUser, async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) return res.status(400).json({ message: "No token provided" });

    await BlackListToken.create({ token });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
