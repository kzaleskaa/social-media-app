import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import classes from "./ChangeProfileImage.module.css";

const ChangeProfileImage = (props) => {
  const enteredImage = useRef(null);
  const navigate = useNavigate();

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const configuration = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };

    const formData = new FormData();
    formData.append("image", enteredImage.current.files[0]);

    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND}/api/profile/me/`,
        formData,
        configuration
      );
      navigate(0);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal onCloseModal={props.onClose}>
      <form onSubmit={updateProfileHandler} className={classes.form}>
        <input
          type="file"
          name="post-img"
          accept="image/*"
          ref={enteredImage}
          required
        />
        <button type="submit" className="btn-social">
          Update profile image
        </button>
      </form>
    </Modal>
  );
};

export default ChangeProfileImage;
