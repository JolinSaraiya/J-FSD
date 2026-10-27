import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

const admin = {
  _id: randomUUID(),
  name: "Administrator",
  email: "admin@example.com",
  password: await bcrypt.hash("admin123", 12),
  role: "admin",
};

export const users = [admin];
export const events = [
  {
    id: 1,
    _id: randomUUID(),
    title: "Tech Fest 2026",
    description: "A technology event for students.",
    date: "2026-11-15",
    time: "10:00",
    location: "Mumbai",
    category: "Technology",
    createdBy: admin._id,
  },
  {
    id: 2,
    _id: randomUUID(),
    title: "React Workshop",
    description: "Learn React from basics to advanced.",
    date: "2026-11-20",
    time: "14:00",
    location: "Pune",
    category: "Workshop",
    createdBy: admin._id,
  },
  {
    id: 3,
    _id: randomUUID(),
    title: "AI Conference",
    description: "Explore the latest AI developments.",
    date: "2026-11-25",
    time: "09:30",
    location: "Bengaluru",
    category: "Conference",
    createdBy: admin._id,
  },
];
export const registrations = [];
