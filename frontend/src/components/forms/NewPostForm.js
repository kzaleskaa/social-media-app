import axios from "axios";
import { useRef, useState } from "react";
import Modal from "../modal/Modal";
import classes from "./NewPostForm.module.css";

const NewPost = (props) => {
  const enteredImage = useRef(null);
  const enteredDescrption = useRef("");
  const [addPost, setAddPost] = useState(false);

  const addNewPostHandler = async (e) => {
    e.preventDefault();
    const configuration = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    const formData = new FormData();

    formData.append("image", enteredImage.current.files[0]);
    formData.append("description", enteredDescrption.current.value);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/posts/`,
        formData,
        configuration
      );
      setAddPost((prev) => !prev);
      props.setUpdatePosts((prev) => prev + 1);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setAddPost((prev) => !prev);
        }}
      >
        Add new post
      </button>
      {addPost && (
        <Modal
          onCloseModal={() => {
            setAddPost(false);
          }}
        >
          <div className={classes.modal}>
            <h1>Create your new post!</h1>
            <form onSubmit={addNewPostHandler}>
              <input
                type="file"
                name="post-img"
                accept="image/*"
                ref={enteredImage}
                required
              />
              <input
                type="text"
                ref={enteredDescrption}
                placeholder="Your description"
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewPost;
