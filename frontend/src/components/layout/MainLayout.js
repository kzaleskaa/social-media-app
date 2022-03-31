import { useEffect } from "react";
import { checkAuthentication } from "../../actions/checkAuthenticationAction";
import { loadUser } from "../../actions/loginAction";

import { connect } from "react-redux";

const MainLayout = (props) => {
  useEffect(() => {
    props.checkAuthentication();
    props.loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{props.children}</div>;
};

export default connect(null, { checkAuthentication, loadUser })(MainLayout);
