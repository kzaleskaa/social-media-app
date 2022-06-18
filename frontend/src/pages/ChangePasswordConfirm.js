import { useState } from "react";
import { useNavigate, useMatch } from "react-router";
import { confirmChangePassword } from "../actions/passwordAction";
import { useDispatch } from "react-redux";

const ChangePasswordConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let match = useMatch("/auth/password/reset/confirm/:uid/:token");
  const [enteredData, setEnteredData] = useState({
    password: "",
    re_password: "",
  });

  const onChangePasswordHandler = (e) => {
    e.preventDefault();
    setEnteredData({ ...enteredData, [e.target.id]: e.target.value });
  };

  const onSubmitPasswordHandler = () => {
    dispatch(
      confirmChangePassword(
        match.params.uid,
        match.params.token,
        enteredData.password,
        enteredData.re_password
      )
    );
    navigate("/home");
  };

  return (
    <div className="form-wrapper">
      <h1>Create New Password</h1>
      <form className="form" onSubmit={onSubmitPasswordHandler}>
        <input
          type="password"
          placeholder="New password"
          id="password"
          onChange={onChangePasswordHandler}
        />
        <input
          type="password"
          id="re_password"
          placeholder="Repeat password"
          onChange={onChangePasswordHandler}
        />
        <button
          className="btn-submit"
          type="submit"
          onSubmit={onSubmitPasswordHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordConfirm;
