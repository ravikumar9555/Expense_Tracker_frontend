import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {


  const token = localStorage.getItem("user");
  console.log(token);

  // If token not present → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists → allow access
  return children;

};

export default ProtectedRoute;