import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
