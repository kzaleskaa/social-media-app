import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <LoginForm />;
};

export default Login;
