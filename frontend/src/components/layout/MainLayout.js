import { useEffect } from "react";
import { checkAuthentication, loadUser } from "../../actions/auth";

import { connect } from "react-redux";

const MainLayout = (props) => {
  useEffect(() => {
    props.checkAuthentication();
    props.loadUser();
  }, []);
  
  return <div>{props.children}</div>;
};

export default connect(null, { checkAuthentication, loadUser })(MainLayout);
