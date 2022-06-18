import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import PostInfo from "./PostInfo";
import classes from "./PostDetails.module.css";

const PostDetails = (props) => {
  const [like, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const currentUser = useSelector((state) => state.auth.user.nickname);
  const newEnteredComment = useRef("");
  const post = props.post;

  const configuration = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };

  const addNewComment = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/posts/comments/${post.id}`,
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

  const updateLike = async () => {
    setLike((prev) => !prev);

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
      <PostInfo
        description={post.description}
        postId={post.id}
        curentUser={currentUser === post.user.nickname}
        setUpdatePosts={props.setUpdatePosts}
      />
      {post.location && (
        <p className={classes["location-name"]} onClick={() => props.setMapIsShow((prev) => !prev)}>
          {post.location}
        </p>
      )}
      <div id={classes.comments}>
        {comments.map((item) => (
          <div key={item.id} className={classes.comment}>
            <div>
              <div>
                <Link to={`/profile/${item.user.nickname}`}>
                  {item.user.nickname}
                </Link>
              </div>
              <div className={classes.date}>{item.date}</div>
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
        <p className={classes.date}>
          Publication date: {new Date(post.date).toLocaleDateString()}
        </p>
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

export default PostDetails;
