import jwt from "jsonwebtoken";

export default function generateToken(user) {
  return jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET || "development-secret",
    { algorithm: "HS256", expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );
}
