import { Router } from "express";
import { registrations, events } from "../store.js";
import { randomUUID } from "node:crypto";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/me", protect, async (req, res) => res.json(registrations.filter((item) => item.user === req.user._id).map((item) => ({ ...item, event: events.find((event) => event._id === item.event) }))));
router.post("/:eventId", protect, async (req, res) => { if (!events.some((event) => event._id === req.params.eventId)) return res.status(404).json({ message: "Event not found." }); if (registrations.some((item) => item.user === req.user._id && item.event === req.params.eventId)) return res.status(409).json({ message: "You are already registered for this event." }); const registration = { _id: randomUUID(), user: req.user._id, event: req.params.eventId }; registrations.push(registration); res.status(201).json(registration); });
export default router;
