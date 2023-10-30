import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};
export default ProtectedRoute;
ProtectedRoute.propTypes = {
  isLogged: PropTypes.any,
  children: PropTypes.any,
};
