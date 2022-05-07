import { useLocation, useNavigate } from "react-router";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/auth/login");
    }
    if (isAuthenticated && location.pathname === "/") {
      return navigate("/home", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
