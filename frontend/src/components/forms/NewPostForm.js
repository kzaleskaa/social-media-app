import axios from "axios";
import { useRef, useState } from "react";
import Modal from "../modal/Modal";
import classes from "./NewPostForm.module.css";

const NewPost = (props) => {
  const enteredImage = useRef(null);
  const enteredDescrption = useRef("");
  const enteredLocation = useRef("");
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

  const searchLocation = async (e) => {
    e.preventDefault();

    console.log(process.env.LOCATION_API);
    axios
      .get(`${process.env.LOCATION_API}${enteredLocation.current.value}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          extraClass="form"
        >
          <div className={classes.modal}>
            <h1>Create your new post!</h1>
            <form onSubmit={searchLocation}>
              <label htmlFor="location">1. Choose location</label>
              <input
                type="text"
                name="location"
                ref={enteredLocation}
                placeholder="Location"
              />
              <button>Search</button>
            </form>
            <form onSubmit={addNewPostHandler}>
              <label htmlFor="post-img">2. Select your photo</label>
              <input
                type="file"
                name="post-img"
                accept="image/*"
                ref={enteredImage}
                required
              />
              <label htmlFor="description">3. Add description</label>
              <input
                type="text"
                name="description"
                ref={enteredDescrption}
                placeholder="Your description"
              />
              <button type="submit">Add post</button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewPost;
