import { verifyNewUser } from "../actions/signUpActions";
import { connect } from "react-redux";
import { useNavigate, useMatch } from "react-router";
import { useEffect } from "react";

const ActivateAccount = ({ verifyNewUser }) => {
  const navigate = useNavigate();
  let match = useMatch("/auth/activate/:uid/:token");

  const visitHomePage = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    verifyNewUser(match.params.uid, match.params.token);
  }, []);

  return (
    <>
      <h2>Your account was successfully activated!</h2>
      <h4>Click the button to log in.</h4>
      <button type="button" className="btn-submit" onClick={visitHomePage}>
        Log In
      </button>
    </>
  );
};

export default connect(null, { verifyNewUser })(ActivateAccount);
