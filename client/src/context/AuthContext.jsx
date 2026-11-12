import { createContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem("eventhub-token");
    if (!token) {
      setAuthLoading(false);
      return () => { active = false; };
    }

    api.get("/auth/me")
      .then(({ data }) => active && setUser(data.user))
      .catch(() => {
        localStorage.removeItem("eventhub-token");
        if (active) setUser(null);
      })
      .finally(() => active && setAuthLoading(false));

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("eventhub-user", JSON.stringify(user));
    else localStorage.removeItem("eventhub-user");
  }, [user]);
  async function login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("eventhub-token", data.token);
    setUser(data.user);
  }
  async function register(details) {
    const { data } = await api.post("/auth/register", details);
    localStorage.setItem("eventhub-token", data.token);
    setUser(data.user);
  }
  function logout() { localStorage.removeItem("eventhub-token"); setUser(null); }
  const value = useMemo(() => ({ user, authLoading, login, register, logout }), [authLoading, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
