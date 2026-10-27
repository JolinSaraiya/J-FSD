import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { users } from "../store.js";
import generateToken from "../utils/generateToken.js";
function response(user) { return { token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } }; }
export async function register(req, res) { const { name, email, password } = req.body; if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: "Name, email, and a password of at least 6 characters are required." }); if (users.some((user) => user.email === email.toLowerCase())) return res.status(409).json({ message: "Email is already registered." }); const user = { _id: randomUUID(), name, email: email.toLowerCase(), password: await bcrypt.hash(password, 12), role: "user" }; users.push(user); res.status(201).json(response(user)); }
export async function login(req, res) { const user = users.find((candidate) => candidate.email === req.body.email?.toLowerCase()); if (!user || !(await bcrypt.compare(req.body.password || "", user.password))) return res.status(401).json({ message: "Invalid email or password." }); res.json(response(user)); }
