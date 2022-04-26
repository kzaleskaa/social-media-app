import SignUpForm from "./../components/forms/SignUpForm";

import { useNavigate } from "react-router";

import { useEffect } from "react";

import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return <SignUpForm />;
};

export default Signup;
