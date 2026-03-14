import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/authUtils";

const PublicRoute = ({ children }) => {

  if (isTokenValid()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;

};

export default PublicRoute;