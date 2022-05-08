import { useState } from "react";
import classes from "./Posts.module.css";
import Modal from "../modal/Modal";
import PostDetails from "./PostDetails";

const Posts = (props) => {
  const [modalIsShow, setModalIsShown] = useState(false);
  const [showNumber, setShowNumber] = useState(0);

  const posts = props.posts;

  const showModalHandler = (e) => {
    setShowNumber(Number(e.target.id));
    setModalIsShown(true);
  };

  const changePostNextHandler = () => {
    if (showNumber + 1 < posts.length) {
      setShowNumber(showNumber + 1);
    }
  };

  const changePostBackHandler = () => {
    if (showNumber - 1 >= 0) {
      setShowNumber(showNumber - 1);
    }
  };

  const presentUserPosts = () => {
    if (typeof posts === "string") {
      return <p>{posts}</p>;
    }

    const postsCard = (
      <div className={classes["posts-container"]}>
        {posts.map((item, index) => (
          <div
            className={classes.post}
            onClick={showModalHandler}
            key={index}
            id={index}
          >
            <img
              src={`${process.env.REACT_APP_BACKEND}${item.image}`}
              alt="post"
              id={index}
            />
          </div>
        ))}
      </div>
    );

    return postsCard;
  };

  return (
    <>
      {presentUserPosts()}
      {modalIsShow && (
        <Modal
          onCloseModal={() => setModalIsShown(false)}
          changePostNextHandler={changePostNextHandler}
          changePostBackHandler={changePostBackHandler}
          typeOfModal="posts"
        >
          <div className={classes.container}>
            <div className={classes.photo}>
              <img
                src={`${process.env.REACT_APP_BACKEND}${posts[showNumber].image}`}
                alt="post"
              />
            </div>
            <PostDetails post={posts[showNumber]} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Posts;
