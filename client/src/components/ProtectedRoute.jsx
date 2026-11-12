import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}
