import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions/loginAction";
import { NO_ERROR } from "../types/types";

const Login = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.error.msg);
  const [enteredData, setEnteredData] = useState({ email: "", password: "" });
  const { enteredEmail, enteredPassword } = enteredData;

  const onChangeHandler = (e) => {
    setEnteredData({ ...enteredData, [e.target.id]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(enteredData.email, enteredData.password));
  };

  useEffect(() => {
    dispatch({ type: NO_ERROR });
  }, []);

  return (
    <>
      <div className="form-wrapper">
        <h1>Log In</h1>
        {errorMsg.login && <p>{errorMsg.login.detail}</p>}
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
