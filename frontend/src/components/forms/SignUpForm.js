import { useState } from "react";

import { NavLink } from "react-router-dom";

import classes from "./LoginSignupForm.module.css";

const SignUp = () => {
  const [enteredData, setEnteredData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password1: "",
    password2: "",
  });

  const {
    enteredEmail,
    enteredFirstName,
    enteredLastName,
    enteredPassword1,
    enteredPassword2,
  } = enteredData;

  const onChangeHandler = (e) => {
    const updatedData = { ...enteredData, [e.target.id]: e.target.value };

    setEnteredData(updatedData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(enteredData);
  };

  return (
    <div className={classes["page-content"]}>
      <div className={classes["form-wrapper"]}>
        <h1>Sign Up</h1>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <input
            id="email"
            name="email"
            placeholder="Email address"
            type="email"
            value={enteredEmail}
            onChange={onChangeHandler}
            required
          />
          <input
            id="first_name"
            name="first_name"
            placeholder="First Name"
            type="text"
            value={enteredFirstName}
            onChange={onChangeHandler}
            required
          />
          <input
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            type="text"
            value={enteredLastName}
            onChange={onChangeHandler}
            required
          />
          <input
            id="password1"
            name="password1"
            placeholder="Password"
            type="password"
            value={enteredPassword1}
            onChange={onChangeHandler}
            required
          />
          <input
            id="password2"
            name="password2"
            placeholder="Repeat password"
            type="password"
            value={enteredPassword2}
            onChange={onChangeHandler}
            required
          />
          <button type="submit" onSubmit={onSubmitHandler}>
            Sign Up
          </button>
        </form>
      </div>
      <div className={classes["form-wrapper"]}>
        <p>Have an account?</p>
        <NavLink to="/login">Log in</NavLink>
      </div>
    </div>
  );
};

export default SignUp;
