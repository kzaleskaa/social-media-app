import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./LoginLayout.module.css";
import { Link } from "react-router-dom";

const LoginLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      // let from = location.state?.from?.pathname;
      // navigate(from, { replace: true });
    }
    if (!isAuthenticated && location.pathname === "/auth") {
      return navigate("/auth/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <div className={classes["page-content"]}>
        <Link
          to={{ pathname: "/nextpath", state: { prevPath: location.pathname } }}
        >
          Example Link
        </Link>
        <Outlet />
      </div>
    </>
  );
};

export default LoginLayout;
