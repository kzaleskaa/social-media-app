import { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/logoutAction";

import classes from "./MainNavigation.module.css";

const MainNavigation = ({ logout, isAuthenticated }) => {
  const [showUserOptions, setShowUserOptions] = useState(false);

  const logoutHandler = (e) => {
    e.preventDefault();

    logout();
  };

  const userOptions = () => {
    return (
      <div className={classes.options}>
        <ul>
          <li>
            <NavLink
              to="/profile/kzaleska"
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(MainNavigation);
