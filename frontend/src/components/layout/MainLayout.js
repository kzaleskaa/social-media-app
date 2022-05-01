import { useEffect } from "react";
import { checkAuthentication } from "../../actions/checkAuthenticationAction";
import { loadUser } from "../../actions/loginAction";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainLayout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthentication());
    dispatch(loadUser());

    if (!isAuthenticated) {
      navigate("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{props.children}</div>;
};

export default MainLayout;
