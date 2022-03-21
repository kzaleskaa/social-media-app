import classes from "./SignUp.module.css";

const SignUp = () => {
  return (
    <>
      <div>
        <form>
          <input placeholder="Email address" type="email" required />
          <input placeholder="Full Name" type="text" required />
          <input placeholder="Username" type="text" required />
          <input placeholder="Password" type="password" required />
          <button>Next</button>
        </form>
      </div>
      <div>
        <p>Have an account?</p>
        <button>Log in</button>
      </div>
    </>
  );
};

export default SignUp;
