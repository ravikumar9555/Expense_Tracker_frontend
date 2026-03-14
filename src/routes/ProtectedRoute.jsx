import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/authUtils";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  console.log(token);

  if (!token || isTokenExpired(token)) {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;

  }

  return children;

};

export default ProtectedRoute;