import { useEffect, useState } from "react";
import Button from "../components/Button";
import api from "../services/api";
export default function AdminDashboard() {
  const emptyForm = { title: "", description: "", date: "", time: "", location: "", category: "" };
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      setEvents((await api.get("/events")).data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load events.");
    }
  }

  useEffect(() => { load(); }, []);

  function edit(event) {
    setEditingId(event._id);
    setForm(Object.fromEntries(Object.keys(emptyForm).map((key) => [key, event[key] || ""])));
    setError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submit(event) {
    event.preventDefault();
    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, form);
      } else {
        await api.post("/events", form);
      }
      cancelEdit();
      await load();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save event.");
    }
  }

  async function remove(id) {
    try {
      await api.delete(`/events/${id}`);
      await load();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete event.");
    }
  }

  return (
    <main className="page">
      <div className="container">
        <h1>Admin dashboard</h1>
        {error && <p className="error">{error}</p>}
        <form className="card form grid" onSubmit={submit}>
          {Object.keys(form).map((key) => (
            <label key={key}>
              {key}
              <input
                required
                type={key === "date" ? "date" : "text"}
                value={form[key]}
                onChange={(event) => setForm({ ...form, [key]: event.target.value })}
              />
            </label>
          ))}
          <Button>{editingId ? "Update event" : "Create event"}</Button>
          {editingId && <Button type="button" onClick={cancelEdit}>Cancel</Button>}
        </form>
        <div className="grid">
          {events.map((event) => (
            <article className="card" key={event._id}>
              <h2>{event.title}</h2>
              <p className="muted">{event.category}</p>
              <Button onClick={() => edit(event)}>Edit</Button>
              <Button variant="danger" onClick={() => remove(event._id)}>Delete</Button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
