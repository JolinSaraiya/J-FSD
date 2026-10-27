import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
export default function Login() {
  const { login } = useAuth(); const navigate = useNavigate(); const [form, setForm] = useState({ email: "", password: "" }); const [error, setError] = useState("");
  async function submit(event) { event.preventDefault(); try { await login(form); navigate("/events"); } catch (err) { setError(err.response?.data?.message || "Login failed."); } }
  return <main className="page"><form className="card form stack" onSubmit={submit}><h1>Welcome back</h1><label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Password<input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label><Button>Login</Button>{error && <p className="error">{error}</p>}<p className="muted">New here? <Link to="/register">Create an account</Link></p></form></main>;
}
