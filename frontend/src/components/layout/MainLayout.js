import { useEffect } from "react";
import { checkAuthentication } from "../../actions/checkAuthenticationAction";
import { loadUser } from "../../actions/loginAction";

import { useDispatch } from "react-redux";

const MainLayout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{props.children}</div>;
};

export default MainLayout;
