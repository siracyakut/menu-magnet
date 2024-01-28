import { useAuth } from "~/store/auth/hooks";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const user = useAuth();

  return user ? children : <Navigate to="/" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
