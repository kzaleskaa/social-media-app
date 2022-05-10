import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./PostInfo.module.css";

const PostInfo = (props) => {
  const naviagte = useNavigate();

  const configuration = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };

  const deletePostHandler = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND}/api/posts/${props.postId}`,
        configuration
      );
      naviagte(0);
    } catch (err) {
      alert("Something went wrong! Try again!");
    }
  };

  return (
    <div className={classes.container}>
      <p>{props.description}</p>
      {props.curentUser && <button onClick={deletePostHandler}>Delete</button>}
    </div>
  );
};

export default PostInfo;
