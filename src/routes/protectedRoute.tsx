import { ReactNode, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useProps } from "../hooks/useProps";

interface ProtectedRouteProps {
  roles?: string[]; // Allowed roles
  children?: ReactNode;
}

function ProtectedRoute({ roles = [], children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);

  const isAuthenticated = !!localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const storedUserRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: location.pathname + location.search } });
    } else if (roles.length && storedUserRole && !roles.includes(storedUserRole)) {
      navigate("/inicio");
    } else {
      setUserRole(storedUserRole); // Set the user role if authenticated
    }
  }, [isAuthenticated, roles, storedUserRole, location, navigate]);

  return isAuthenticated ? (children ? children : <Outlet />) : null;
}

export default ProtectedRoute;
