import { useState } from "react";

import classes from "./PostDetails.module.css";
import Modal from "../UI/Modal";

const PostDetails = (props) => {
  const [modalIsShow, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  return (
    <>
      <div onClick={showModalHandler}>
        <img src={props.item.img} alt="post" />
      </div>
      {modalIsShow && (
        <Modal onCloseModal={hideModalHandler}>
          <div className={classes.container}>
            <div className={classes.photo}>
              <img src={props.item.img} alt="post" />
            </div>
            <div className={classes.comments}>comments</div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PostDetails;
