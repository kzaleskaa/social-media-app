import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Posts.module.css";
import PostDetails from "../profile/PostDetails";

const Posts = () => {
  const [posts, setPosts] = useState();
  const [mapIsShow, setMapIsShow] = useState(false);

  const configuration = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };

  const downloadPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/posts/home`,
        configuration
      );
      setPosts(response.data.posts);
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    downloadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(posts);
  return (
    <div className={classes["posts-container"]}>
      {posts &&
        posts.map((item, index) => (
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
            <div className={classes["post-container"]}>
              <img
                src={`${process.env.REACT_APP_BACKEND}${item.image}`}
                className={classes["post-image"]}
                alt="user's post"
              />
            </div>
            <PostDetails post={item} setMapIsShow={setMapIsShow} home={true}/>
          </div>
        ))}
    </div>
  );
};

export default Posts;
