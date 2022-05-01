import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/logoutAction";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const logoutHandler = (e) => {
    e.preventDefault();
    navigate("auth/login");
    dispatch(logout());
  };

  const userOptions = () => {
    return (
      <div className={classes.options}>
        <ul>
          <li>
            <NavLink
              to={`/profile/${user.nickname}`}
              onClick={() => setShowUserOptions(false)}
            >
              Profile
            </NavLink>
          </li>
          <li onClick={logoutHandler}>
            <p>Logout</p>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <nav className={classes.navigation}>
      <ul className={classes["links-list"]}>
        <li>
          <NavLink to="/" onClick={() => setShowUserOptions(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <div className={classes["user-options"]}>
            <div
              className={classes.user}
              onClick={() => setShowUserOptions((prev) => !prev)}
            >
              <img src="./photo.jpg" alt="user" />
            </div>
            {showUserOptions && userOptions()}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
