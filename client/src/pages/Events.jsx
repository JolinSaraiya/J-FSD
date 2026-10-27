import { useEffect, useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

function Events() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    async function loadEvents() {
      try {
        setEvents((await api.get("/events")).data);
      } catch {
        setError("Unable to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  useEffect(() => {
    if (!user) {
      setRegistrations([]);
      return;
    }
    api.get("/registrations/me")
      .then(({ data }) => setRegistrations(data.map(({ event }) => event?._id).filter(Boolean)))
      .catch(() => setRegistrations([]));
  }, [user]);

  const categories = useMemo(
    () => [...new Set(events.map((event) => event.category).filter(Boolean))].sort(),
    [events],
  );
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return events.filter((event) => {
      const matchesSearch = !query || [event.title, event.description, event.location]
        .some((value) => value?.toLowerCase().includes(query));
      const matchesCategory = category === "all" || event.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, events, search]);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">Upcoming Events</h1>
        <p className="mt-2 text-slate-600">
          Explore our upcoming events and register for the ones you like.
        </p>
        <div className="event-filters" aria-label="Event filters">
          <label>
            Search events
            <input
              type="search"
              placeholder="Search by title, description, or location"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label>
            Category
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        {loading && <Loading />}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          filteredEvents.length ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  registered={registrations.includes(event._id)}
                  onRegistered={(eventId) => setRegistrations((current) => [...new Set([...current, eventId])])}
                />
              ))}
            </div>
          ) : <p className="muted">No events match your search or category filter.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
