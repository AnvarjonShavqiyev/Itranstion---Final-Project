import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "../../helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Private = () => {
  const userdata = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = userdata && validateToken(token);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/"/>
  );
};

export default Private;
