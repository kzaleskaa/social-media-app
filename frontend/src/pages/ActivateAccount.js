import { verifyNewUser } from "../actions/signUpActions";
import { connect } from "react-redux";
import { useNavigate, useMatch } from "react-router";

const ActivateAccount = ({ verifyNewUser }) => {
  const navigate = useNavigate();
  let match = useMatch("/auth/activate/:uid/:token");

  const activateAccount = (e) => {
    e.preventDefault();

    const uid = match.params.uid;
    const token = match.params.token;

    verifyNewUser(uid, token);
    navigate("/");
  };

  return <button onClick={activateAccount}>Verify</button>;
};

export default connect(null, { verifyNewUser })(ActivateAccount);
