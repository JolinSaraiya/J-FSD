import mongoose from "mongoose";

export default async function connectDB() {
  if (!process.env.MONGODB_URI) return false;
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected successfully");
  return true;
}
