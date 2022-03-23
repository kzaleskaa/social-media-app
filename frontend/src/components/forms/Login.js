import { NavLink } from "react-router-dom";
import classes from "./LoginSignup.module.css";

const Login = () => {
  return (
    <>
      <div className={classes["form-wrapper"]}>
        <h1>Instagram</h1>
        <div className={classes.form}>
          <form className={classes.form}>
            <input placeholder="email" type="email" required />
            <input placeholder="password" type="password" required />
            <button type="submit">Log In</button>
          </form>
          <span>or</span>
          <button type="button">Log In with Facebook</button>
        </div>
      </div>
      <div className={classes["form-wrapper"]}>
        <p>Don't have an account?</p>
        <NavLink to="/sign-up">Sign up</NavLink>
      </div>
    </>
  );
};

export default Login;
