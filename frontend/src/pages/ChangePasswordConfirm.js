import { useState } from "react";
import { useNavigate, useMatch } from "react-router";

import { confirmChangePassword } from "../actions/passwordAction";
import { connect } from "react-redux";

// match to extract user's uid and token
const ChangePasswordConfirm = ({ confirmChangePassword }) => {
  const [enteredData, setEnteredData] = useState({
    password: "",
    re_password: "",
  });
  
  const navigate = useNavigate();
  let match = useMatch("/password/reset/confirm/:uid/:token");

  const onChangePasswordHandler = (e) => {
    e.preventDefault();

    const updatedData = { ...enteredData, [e.target.id]: e.target.value };

    setEnteredData(updatedData);
  };

  const onSubmitPasswordHandler = (e) => {
    e.preventDefault();

    const uid = match.params.uid;
    const token = match.params.token;

    console.log(uid, token, enteredData.password, enteredData.re_password);

    confirmChangePassword(
      uid,
      token,
      enteredData.password,
      enteredData.re_password
    );
    navigate("/");
  };

  return (
    <>
      <h1>Create New Password</h1>
      <form onSubmit={onSubmitPasswordHandler}>
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
        <button type="submit" onSubmit={onSubmitPasswordHandler}>
          Submit
        </button>
      </form>
    </>
  );
};

export default connect(null, { confirmChangePassword })(ChangePasswordConfirm);
