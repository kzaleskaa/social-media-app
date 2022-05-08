import { useNavigate } from "react-router-dom";
import classes from "./PostInfo.module.css";
import useHttp from "../../hooks/use-http";

const PostInfo = (props) => {
  const naviagte = useNavigate();

  const httpData = useHttp(
    {
      url: `${process.env.REACT_APP_BACKEND}/api/posts/${props.postId}`,
      method: "delete",
    },
    (response) => {
      naviagte(0);
    }
  );

  const { isLoading, error, sendRequest: deletePostHandler } = httpData;

  return (
    <div className={classes.container}>
      <p>{props.description}</p>
      {props.curentUser && <button onClick={deletePostHandler}>Delete</button>}
    </div>
  );
};

export default PostInfo;
