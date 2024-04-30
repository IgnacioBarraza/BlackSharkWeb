import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  roles?: string[];
}

function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const isAuthenticated = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } 
  }, [isAuthenticated, userId, roles, userRole, navigate]);

  return <Outlet />;
}

export default ProtectedRoute;