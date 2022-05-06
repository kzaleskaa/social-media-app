import { useState } from "react";
import { useNavigate, useMatch } from "react-router";

import { confirmChangePassword } from "../../actions/passwordAction";
import { useDispatch } from "react-redux";

const ChangePasswordConfirmForm = () => {
  const dispatch = useDispatch();

  const [enteredData, setEnteredData] = useState({
    password: "",
    re_password: "",
  });

  const navigate = useNavigate();
  let match = useMatch("/auth/password/reset/confirm/:uid/:token");

  const onChangePasswordHandler = (e) => {
    e.preventDefault();

    const updatedData = { ...enteredData, [e.target.id]: e.target.value };

    setEnteredData(updatedData);
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
    navigate("/");
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

export default ChangePasswordConfirmForm;
