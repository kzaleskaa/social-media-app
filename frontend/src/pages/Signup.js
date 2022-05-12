import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpNewUser } from "../actions/signUpActions";
import { NO_ERROR } from "../types/types";

const SignUp = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.error.msg.signup);
  const [error, setError] = useState("");
  const [enteredData, setEnteredData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    nickname: "",
    password1: "",
    password2: "",
  });

  const {
    enteredEmail,
    enteredFirstName,
    enteredLastName,
    enteredNickname,
    enteredPassword1,
    enteredPassword2,
  } = enteredData;

  const onChangeHandler = (e) => {
    setEnteredData({ ...enteredData, [e.target.id]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (enteredData.password1 === enteredData.password2) {
      dispatch(
        signUpNewUser(
          enteredData.first_name,
          enteredData.last_name,
          enteredData.email,
          enteredData.nickname,
          enteredData.password1,
          enteredData.password2
        )
      );
      setError("");
    } else {
      setError("Your passwords are not the same.");
    }
  };

  useEffect(() => {
    dispatch({ type: NO_ERROR });
  }, []);

  return (
    <>
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        {errorMsg &&
          Object.keys(errorMsg).map((item) => (
            <p key={item}>{errorMsg[item]}</p>
          ))}
        {error && <p>{error}</p>}
        <form className="form" onSubmit={onSubmitHandler}>
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
            id="nickname"
            name="nickname"
            placeholder="nickname"
            type="text"
            value={enteredNickname}
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
          <button
            className="btn-submit"
            type="submit"
            onSubmit={onSubmitHandler}
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="form-wrapper">
        <p>Have an account?</p>
        <NavLink to="/auth/login">Log in</NavLink>
      </div>
    </>
  );
};

export default SignUp;
