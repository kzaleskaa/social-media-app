import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Posts.module.css";
import useHttp from "../../hooks/use-http";
import PostDetails from "../profile/PostDetails";

const Posts = () => {
  const [posts, setPosts] = useState();

  const httpData = useHttp(
    {
      url: `${process.env.REACT_APP_BACKEND}/api/posts/home`,
    },
    (response) => {
      setPosts(response.posts);
    }
  );

  const { isLoading, error, sendRequest: downloadPosts } = httpData;

  useEffect(() => {
    downloadPosts();
  }, []);

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
            <PostDetails post={item} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
