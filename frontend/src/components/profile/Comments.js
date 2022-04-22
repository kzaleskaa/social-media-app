import { useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import classes from "./Comments.module.css";

const Comments = (props) => {
  const [like, setLike] = useState(false);
  const newEnteredComment = useRef("");

  const addNewComment = async (e) => {
    e.preventDefault();
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/posts/comments/${props.post.id}`,
        JSON.stringify({ text: newEnteredComment.current.value }),
        configuration
      );
    } catch (err) {
      alert("Something went wrong! Try again!");
    }
  };

  return (
    <div className={classes.info}>
      <p>{props.post.description}</p>
      <div className={classes.social}>
        <FontAwesomeIcon
          icon={like ? faHeartSolid : faHeartRegular}
          color={like ? "#be0000" : "black"}
          onClick={() => {
            setLike((prev) => !prev);
          }}
        />
        <p>{new Date(props.post.date).toLocaleDateString()}</p>
        <form className={classes["comment-section"]} onSubmit={addNewComment}>
          <input
            type="text"
            placeholder="Add new comment"
            ref={newEnteredComment}
          />
          <button type="submit" onSubmit={addNewComment}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
