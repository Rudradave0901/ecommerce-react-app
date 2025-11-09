import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth.loading) return <div>Loading...</div>;
  if (!auth.uid) return <Navigate to="/login" replace />;
  return children;
}
