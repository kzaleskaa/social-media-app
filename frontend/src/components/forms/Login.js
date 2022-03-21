import classes from "./Login.module.css";

const Login = () => {
  return (
    <>
      <div className={classes["login-wrapper"]}>
        <h1>Instagram</h1>
        <div className={classes["login-form"]}>
          <form className={classes["login-form"]}>
            <input placeholder="email" type="email" required />
            <input placeholder="password" type="password" required />
            <button type="submit">Log In</button>
          </form>
          <span>or</span>
          <button type="button">Log In with Facebook</button>
        </div>
      </div>
      <div className={classes["login-wrapper"]}>
        <p>Don't have an account?</p>
        <button type="button">Sign up</button>
      </div>
    </>
  );
};

export default Login;
