const DUMMY_POSTS = [
  { img: "./photo.jpg" },
  { img: "./photo2.jpg" },
  { img: "./photo3.jpg" },
  { img: "./photo.jpg" },
];

/* eslint-disable import/first */
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import classes from "./Posts.module.css";
import Modal from "../modal/Modal";

const Posts = () => {
  const [modalIsShow, setModalIsShown] = useState(false);
  const [like, setLike] = useState(false);
  const [showNumber, setShowNumber] = useState(0);

  const showModalHandler = (e) => {
    setShowNumber(Number(e.target.id));
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  const likeHandler = () => {
    setLike((prev) => !prev);
  };

  const changePostNextHandler = () => {
    if (showNumber + 1 < DUMMY_POSTS.length) {
      setShowNumber(showNumber + 1);
    }
  };

  const changePostBackHandler = () => {
    if (showNumber - 1 >= 0) {
      setShowNumber(showNumber - 1);
    }
    console.log("here")
  };


  console.log(DUMMY_POSTS.length)
  return (
    <>
      <div className={classes["posts-container"]}>
        {DUMMY_POSTS.map((item, index) => (
          <div
            className={classes.post}
            onClick={showModalHandler}
            key={index}
            id={index}
          >
            <img src={item.img} alt="post" id={index} />
          </div>
        ))}
      </div>
      {modalIsShow && (
        <Modal
          onCloseModal={hideModalHandler}
          changePostNextHandler={changePostNextHandler}
          changePostBackHandler={changePostBackHandler}
        >
          <div className={classes.container}>
            <div className={classes.photo} onDoubleClick={likeHandler}>
              <img src={DUMMY_POSTS[showNumber].img} alt="post" />
            </div>
            <div className={classes.comments}>
              <FontAwesomeIcon
                icon={like ? faHeartSolid : faHeartRegular}
                color={like ? "#be0000" : "black"}
                onClick={likeHandler}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Posts;
