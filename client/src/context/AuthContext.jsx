import { createContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("eventhub-user") || "null"));
  useEffect(() => user ? localStorage.setItem("eventhub-user", JSON.stringify(user)) : localStorage.removeItem("eventhub-user"), [user]);
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
  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
