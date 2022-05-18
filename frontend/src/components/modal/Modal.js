import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlayPost = (props) => {
  return (
    <div className={`${styles.modal} ${styles["modal-posts"]}`}>
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

const ModalBasic = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
      <button className={styles.close} onClick={props.onClose}>
        x
      </button>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onCloseModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        props.typeOfModal ? (
          <ModalOverlayPost
            onClose={props.onCloseModal}
            className={`modal ${props.classes}`}
            changePostNextHandler={props.changePostNextHandler}
            changePostBackHandler={props.changePostBackHandler}
          >
            {props.children}
          </ModalOverlayPost>
        ) : (
          <ModalBasic onClose={props.onCloseModal}>{props.children}</ModalBasic>
        ),
        portalElement
      )}
    </>
  );
};

export default Modal;
