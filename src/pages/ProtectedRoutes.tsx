import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Navigate } from "react-router-dom";

interface Props {
  children: any;
}

const ProtectedRoutes = ({ children }: Props) => {
  const [user, loading, error] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoutes;
