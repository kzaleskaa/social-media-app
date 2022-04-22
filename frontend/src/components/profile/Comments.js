import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import classes from "./Comments.module.css";

const Comments = (props) => {
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState([]);
  const newEnteredComment = useRef("");
  const post = props.post;

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
        `http://127.0.0.1:8000/api/posts/comments/${post.id}`,
        JSON.stringify({ text: newEnteredComment.current.value }),
        configuration
      );

      getAllComments();
      newEnteredComment.current.value = "";
    } catch (err) {
      alert("Something went wrong! Try again!");
    }
  };

  const getAllComments = async () => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/posts/comments/${post.id}`,
        configuration
      );

      setComments(result.data.comments);
    } catch (err) {
      alert("Something went wrong! Try again!");
    }
  };

  useEffect(() => {
    getAllComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <div className={classes.info}>
      <p>{post.description}</p>
      <div id={classes.comments}>
        {comments.map((item) => (
          <div key={item.id} className={classes.comment}>
            <div>{item.user}</div>
            <div>{item.date}</div>
            <div>{item.text}</div>
          </div>
        ))}
      </div>
      <div className={classes.social}>
        <FontAwesomeIcon
          icon={like ? faHeartSolid : faHeartRegular}
          color={like ? "#be0000" : "black"}
          onClick={() => {
            setLike((prev) => !prev);
          }}
        />
        <p>{new Date(post.date).toLocaleDateString()}</p>
        <form className={classes["comment-section"]} onSubmit={addNewComment}>
          <input
            type="text"
            placeholder="Add new comment"
            ref={newEnteredComment}
            required
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
