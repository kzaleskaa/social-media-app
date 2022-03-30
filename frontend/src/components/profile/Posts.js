const DUMMY_POSTS = [
  { img: "./photo.jpg" },
  { img: "./photo.jpg" },
  { img: "./photo.jpg" },
  { img: "./photo.jpg" },
];

/* eslint-disable import/first */
import classes from "./Posts.module.css";

const Posts = () => {
  return (
    <div className={classes["posts-container"]}>
      {DUMMY_POSTS.map((item, index) => (
        <div key={index}>
          <img src={item.img} alt="post" />
        </div>
      ))}
    </div>
  );
};

export default Posts;
