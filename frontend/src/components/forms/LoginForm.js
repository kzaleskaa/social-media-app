import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

import { login } from "../../actions/loginAction";

const Login = () => {
  const dispatch = useDispatch();

  const [enteredData, setEnteredData] = useState({ email: "", password: "" });

  const { enteredEmail, enteredPassword } = enteredData;

  const onChangeHandler = (e) => {
    setEnteredData({ ...enteredData, [e.target.id]: e.target.value });
  };

  const onSubmitHandler = () => {
    dispatch(login(enteredData.email, enteredData.password));
  };

  return (
    <>
      <div className="form-wrapper">
        <h1>Log In</h1>
        <div className="form">
          <form className="form" onSubmit={onSubmitHandler}>
            <input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={enteredEmail}
              onChange={onChangeHandler}
              required
            />
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={enteredPassword}
              onChange={onChangeHandler}
              required
            />
            <button
              className="btn-submit"
              type="submit"
              onSubmit={onSubmitHandler}
            >
              Log In
            </button>
          </form>
          <span className="separator">
            <span className="line" />
            <p>or</p>
            <span className="line" />
          </span>
          <button className="btn-social" type="button">
            <FontAwesomeIcon
              icon={faFacebookSquare}
              style={{
                marginRight: "6px",
                color: "#3b5998",
                fontSize: "14px",
              }}
            />
            Log In with Facebook
          </button>
          <NavLink className="reset-password" to="/auth/reset-password">
            Forgot password?
          </NavLink>
        </div>
      </div>
      <div className="form-wrapper">
        <p>Don't have an account?</p>
        <NavLink to="/auth/sign-up">Sign up</NavLink>
      </div>
    </>
  );
};

export default Login;
