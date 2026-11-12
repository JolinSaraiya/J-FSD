import jwt from "jsonwebtoken";
import { users } from "../store.js";

export function protect(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required. Please log in." });
    }
    const payload = jwt.verify(
      authorization.slice("Bearer ".length),
      process.env.JWT_SECRET || "development-secret",
      { algorithms: ["HS256"] },
    );
    const user = users.find((candidate) => candidate._id === payload.userId);
    if (!user) return res.status(401).json({ message: "User no longer exists." });
    req.user = user;
    return next();
  } catch (error) {
    if (["JsonWebTokenError", "TokenExpiredError", "NotBeforeError"].includes(error.name)) {
      return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
    }
    return res.status(500).json({ message: "Authentication could not be completed." });
  }
}

export function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin permission required." });
  }
  return next();
}
