import jwt from "jsonwebtoken";
import { users } from "../store.js";
export async function protect(req, res, next) { try { const token = req.headers.authorization?.split(" ")[1]; if (!token) return res.status(401).json({ message: "Authentication required." }); const payload = jwt.verify(token, process.env.JWT_SECRET || "development-secret"); req.user = users.find((user) => user._id === payload.id); if (!req.user) return res.status(401).json({ message: "User not found." }); next(); } catch { res.status(401).json({ message: "Invalid or expired token." }); } }
export function adminOnly(req, res, next) { if (req.user?.role !== "admin") return res.status(403).json({ message: "Admin access required." }); next(); }
