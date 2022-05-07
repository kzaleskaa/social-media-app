import { useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./LoginLayout.module.css";

const LoginLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      return navigate(-1, { replace: true });
    }
    if (!isAuthenticated && location.pathname === "/auth") {
      return navigate("/auth/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  
  return (
    <>
      <div className={classes["page-content"]}>
        <Outlet />
      </div>
    </>
  );
};

export default LoginLayout;
