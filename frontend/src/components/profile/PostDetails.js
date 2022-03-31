import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import classes from "./PostDetails.module.css";
import Modal from "../modal/Modal";

const PostDetails = (props) => {
  const [modalIsShow, setModalIsShown] = useState(false);
  const [like, setLike] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  const likeHandler = () => {
    setLike((prev) => !prev);
  };

  return (
    <>
      <div className={classes.post} onClick={showModalHandler}>
        <img src={props.item.img} alt="post" />
      </div>
      {modalIsShow && (
        <Modal onCloseModal={hideModalHandler}>
          <div className={classes.container}>
            <div className={classes.photo} onDoubleClick={likeHandler}>
              <img src={props.item.img} alt="post" />
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

export default PostDetails;
