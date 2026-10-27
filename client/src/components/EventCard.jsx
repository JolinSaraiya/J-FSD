import { useState } from "react";
import Button from "./Button";
import api from "../services/api";

export default function EventCard({ event, title, description, date, location, category, registered: initiallyRegistered = false, onRegistered }) {
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(initiallyRegistered);
  const details = event || { title, description, date, location, category };
  async function register() {
    if (!event?._id) {
      setRegistered(true);
      return;
    }
    try { await api.post(`/registrations/${event._id}`); setRegistered(true); onRegistered?.(event._id); }
    catch (err) { setError(err.response?.data?.message || "Unable to register."); }
  }
  return <article className="card stack">
    <div><h2>{details.title}</h2><p className="muted">{details.description}</p></div>
    <p className="muted"><strong>{details.date}</strong> · {details.location}</p>
    {details.category && <span className="badge">{details.category}</span>}
    {registered ? <p className="success">Successfully registered!</p> : <Button onClick={register}>Register</Button>}
    {error && <small className="error">{error}</small>}
  </article>;
}
