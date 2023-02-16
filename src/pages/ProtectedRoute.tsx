import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
