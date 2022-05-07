import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const downloadPosts = async () => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/posts/home`,
        configuration
      );

      setPosts(result.data.posts);
    } catch (err) {
      alert("Something went wrong! Try again!");
    }
  };

  useEffect(() => {
    downloadPosts();
  }, []);

  console.log(posts);

  return (
    <div className={classes["posts-container"]}>
      {posts.map((item, index) => (
        <div key={index} className={classes.post}>
          <div className={classes.info}>
            <div className={classes.profile}>
              <img
                src={`${process.env.REACT_APP_BACKEND}${item.user.image}`}
                alt="user profile"
                className={classes["profile-image"]}
              />
            </div>
            <Link to={`/profile/${item.user.nickname}`}>
              {item.user.nickname}
            </Link>
          </div>
            <img
              src={`${process.env.REACT_APP_BACKEND}${item.image}`}
              className={classes["post-image"]}
              alt="user's post"
            />
        </div>
      ))}
    </div>
  );
};

export default Posts;
