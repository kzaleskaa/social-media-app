const DUMMY_POSTS = [
  { img: "./photo.jpg" },
  { img: "./photo2.jpg" },
  { img: "./photo3.jpg" },
  { img: "./photo.jpg" },
];
/* eslint-disable import/first */
import PostDetails from "./PostDetails";
import classes from "./Posts.module.css";

const Posts = () => {
  return (
    <div className={classes["posts-container"]}>
      {DUMMY_POSTS.map((item, index) => (
        <PostDetails item={item} key={index} />
      ))}
    </div>
  );
};

export default Posts;
