import { NavLink } from "react-router-dom";

import classes from "./LoginSignup.module.css";

const SignUp = () => {
  return (
    <>
      <div className={classes["form-wrapper"]}>
        <form className={classes.form}>
          <input placeholder="Email address" type="email" required />
          <input placeholder="First Name" type="text" required />
          <input placeholder="Last Name" type="text" required />
          <input placeholder="Username" type="text" required />
          <input placeholder="Password" type="password" required />
          <button>Next</button>
        </form>
      </div>
      <div className={classes["form-wrapper"]}>
        <p>Have an account?</p>
        <NavLink to="/">Log in</NavLink>
      </div>
    </>
  );
};

export default SignUp;
