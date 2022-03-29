import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router";

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
