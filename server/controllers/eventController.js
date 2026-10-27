import { randomUUID } from "node:crypto";
import { events } from "../store.js";

const fields = ["title", "description", "date", "time", "location", "category"];

function getEventByIdValue(id) {
  const numericId = Number(id);
  return events.find((event) => event.id === numericId || event._id === id);
}

function getEventData(body) {
  const data = Object.fromEntries(fields.map((field) => [field, body[field]]));
  if (fields.some((field) => typeof data[field] !== "string" || !data[field].trim())) {
    return null;
  }
  return Object.fromEntries(fields.map((field) => [field, data[field].trim()]));
}

export function listEvents(req, res) {
  res.status(200).json(events);
}

export function getEventById(req, res) {
  const event = getEventByIdValue(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  return res.status(200).json(event);
}

export function createEvent(req, res) {
  const data = getEventData(req.body);
  if (!data) return res.status(400).json({ message: "All event fields are required" });

  const id = events.length ? Math.max(...events.map((event) => event.id)) + 1 : 1;
  const event = {
    id,
    _id: randomUUID(),
    ...data,
    ...(req.user ? { createdBy: req.user._id } : {}),
  };
  events.push(event);

  return res.status(201).json({ message: "Event created successfully", event });
}

export function updateEvent(req, res) {
  const event = getEventByIdValue(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const data = getEventData(req.body);
  if (!data) return res.status(400).json({ message: "All event fields are required" });

  Object.assign(event, data);
  return res.status(200).json({ message: "Event updated successfully", event });
}

export function deleteEvent(req, res) {
  const index = events.findIndex((event) => event.id === Number(req.params.id) || event._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  const [event] = events.splice(index, 1);
  return res.status(200).json({ message: "Event deleted successfully", event });
}
