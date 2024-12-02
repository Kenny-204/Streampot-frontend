import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }:{children:ReactNode}) {
    const { currentUser } = useAuth();
    if (!currentUser) {
      
      return <Navigate to="/login" />;

    }
    return children;
  }