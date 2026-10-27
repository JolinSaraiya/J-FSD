import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
export default function Register() {
  const { register } = useAuth(); const navigate = useNavigate(); const [form, setForm] = useState({ name: "", email: "", password: "" }); const [error, setError] = useState("");
  async function submit(event) { event.preventDefault(); try { await register(form); navigate("/events"); } catch (err) { setError(err.response?.data?.message || "Registration failed."); } }
  return <main className="page"><form className="card form stack" onSubmit={submit}><h1>Create account</h1><label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Password<input required minLength="6" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label><Button>Register</Button>{error && <p className="error">{error}</p>}</form></main>;
}
