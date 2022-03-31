import { useState } from "react";
import { useNavigate } from "react-router";

import { changePassword } from "../actions/passwordAction";
import { connect } from "react-redux";

const ChangePassword = ({changePassword}) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const navigate = useNavigate();

  const onChangeEmailHandler = (e) => {
    e.preventDefault();

    setEnteredEmail(e.target.value);
  };

  const onSubmitEmailHandler = (e) => {
    e.preventDefault();

    changePassword(enteredEmail);
    navigate("/");
  };

  return (
    <>
      <h1>Change Password</h1>
      <form onSubmit={onSubmitEmailHandler}>
        <input
          placeholder="Your Email Address"
          onChange={onChangeEmailHandler}
        />
        <button type="submit" onSubmit={onSubmitEmailHandler}>
          Submit
        </button>
      </form>
    </>
  );
};

export default connect(null, { changePassword })(ChangePassword);
