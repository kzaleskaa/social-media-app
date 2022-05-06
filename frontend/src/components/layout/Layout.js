import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/auth/login");
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
