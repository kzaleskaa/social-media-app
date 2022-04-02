import ReactDOM from "react-dom";
import { Fragment } from "react/cjs/react.production.min";

import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <button
        className={styles["left-btn"]}
        onClick={props.changePostBackHandler}
      >
        <span className={`${styles.arrow} ${styles["arrow-left"]}`} />
      </button>
      <div className={styles.content}>{props.children}</div>
      <button
        className={styles["right-btn"]}
        onClick={props.changePostNextHandler}
      >
        <span className={`${styles.arrow} ${styles["arrow-right"]}`} />
      </button>
      <button className={styles.close} onClick={props.onClose}>
        x
      </button>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onCloseModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onCloseModal}
          className={`modal ${props.classes}`}
          changePostNextHandler={props.changePostNextHandler}
          changePostBackHandler={props.changePostBackHandler}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
