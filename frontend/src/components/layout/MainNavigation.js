import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/logoutAction";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/auth/login");
  };

  const searchUser = (e) => {
    e.preventDefault();
    const nick = inputRef.current.value;
    inputRef.current.value = "";
    navigate(`profile/${nick}`);
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
        <form onSubmit={searchUser}>
          <input
            type="text"
            ref={inputRef}
            placeholder="Search user by nickname"
          />
        </form>
        <li>
          <div className={classes["user-options"]}>
            <div
              className={classes.user}
              onClick={() => setShowUserOptions((prev) => !prev)}
            >
              <img src="/avatar.png" alt="profile" />
            </div>
            {showUserOptions && userOptions()}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
