import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

interface ProtectedRouteProps {
  roles?: string[];
}

function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { userToken, userType } = useUser();
  const isAuthenticated = localStorage.getItem("token") || userToken;
  const storedUserRole = localStorage.getItem("userType") || userType;
  
  useEffect(() => {
    if (roles && storedUserRole && !roles.includes(storedUserRole)) {
      navigate("/");
      return
    }
    
    if (!isAuthenticated) {
      navigate("/");

      return;
    }
  }, [isAuthenticated, roles, navigate, userType]);

  return <Outlet />;
}

export default ProtectedRoute;
