import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";


type ProtectedRouteProps = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children
  return children;
}
