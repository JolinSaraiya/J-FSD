import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import api from "../services/api";
export default function MyRegistrations() {
  const [items, setItems] = useState(null);
  useEffect(() => { api.get("/registrations/me").then(({ data }) => setItems(data)).catch(() => setItems([])); }, []);
  return <main className="page"><div className="container"><h1>My registrations</h1>{items === null ? <Loading /> : items.length ? <div className="grid">{items.map(({ event, _id }) => <article className="card" key={_id}><h2>{event.title}</h2><p className="muted">{event.location} · {new Date(event.date).toLocaleDateString()}</p></article>)}</div> : <p className="muted">You have no registrations yet.</p>}</div></main>;
}
