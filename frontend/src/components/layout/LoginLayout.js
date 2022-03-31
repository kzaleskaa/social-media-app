import { Outlet } from "react-router";

import classes from "./LoginLayout.module.css";

const LoginLayout = () => {
  return (
    <div className={classes["page-content"]}>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
