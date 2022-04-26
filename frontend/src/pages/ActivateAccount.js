import { verifyNewUser } from "../actions/signUpActions";
import { useDispatch } from "react-redux";
import { useNavigate, useMatch } from "react-router";
import { useEffect } from "react";

const ActivateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let match = useMatch("/auth/activate/:uid/:token");

  const visitHomePage = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    dispatch(verifyNewUser(match.params.uid, match.params.token));
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

export default ActivateAccount;
