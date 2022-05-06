import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import classes from "./Comments.module.css";
import { useSelector } from "react-redux";

const Comments = (props) => {
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const currentUser = useSelector((state) => state.auth.user.nickname);
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
      setLikesNumber(result.data.likes_number);
      setLike(result.data.like);
    } catch (err) {
      alert("Something went wrong! Try again!");
    }
  };

  const deleteComment = async (comment_id) => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND}/api/posts/comment/${comment_id}`,
        configuration
      );
    } catch (err) {
      alert("Something went wrong! Try again!");
    }

    getAllComments();
  };

  const updateLike = async (post_id) => {
    setLike((prev) => !prev);

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      if (like) {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND}/api/posts/like/${post.id}`,
          configuration
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_BACKEND}/api/posts/like/${post.id}`,
          null,
          configuration
        );
      }
    } catch (err) {
      alert("Something went wrong! Try again!");
    }
  };

  useEffect(() => {
    getAllComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, like]);

  return (
    <div className={classes.info}>
      <p>{post.description}</p>
      <div id={classes.comments}>
        {comments.map((item) => (
          <div key={item.id} className={classes.comment}>
            <div>
              <div>
                <Link to={`/profile/${item.user.nickname}`}>
                  {item.user.nickname}
                </Link>
              </div>
              <div>{item.date}</div>
              <div>{item.text}</div>
            </div>

            {currentUser === item.user.nickname && (
              <div>
                <button
                  onClick={() => {
                    deleteComment(item.id);
                  }}
                >
                  X
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={classes.social}>
        {likesNumber} likes
        <FontAwesomeIcon
          icon={like ? faHeartSolid : faHeartRegular}
          color={like ? "#be0000" : "black"}
          onClick={updateLike}
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
