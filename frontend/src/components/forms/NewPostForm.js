import axios from "axios";
import { useRef, useState } from "react";
import Modal from "../modal/Modal";
import classes from "./NewPostForm.module.css";

const NewPost = (props) => {
  const enteredImage = useRef(null);
  const enteredDescrption = useRef("");
  const enteredLocation = useRef("");
  const [addPost, setAddPost] = useState(false);
  const [location, setLocation] = useState("");

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
    formData.append("lat", location.lat);
    formData.append("lon", location.lon);
    formData.append(
      "location",
      `${location.address_line1}, ${location.address_line2}`
    );

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

    axios
      .get(
        `${process.env.REACT_APP_LOCATION_API_URL}${enteredLocation.current.value}&apiKey=${process.env.REACT_APP_LOCATION_API}`
      )
      .then((response) => {
        setLocation(response.data.features[0].properties);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const searchLocationForm = (
    <form onSubmit={searchLocation}>
      <label htmlFor="location">1. Choose location</label>
      <input
        type="text"
        name="location"
        ref={enteredLocation}
        placeholder="Location"
      />
      <button type="submit">Search</button>
    </form>
  );

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
            setLocation("");
          }}
          extraClass="form"
        >
          <div className={classes.modal}>
            <h1>Create your new post!</h1>
            {location.length === 0 ? (
              searchLocationForm
            ) : (
              <div align="left" style={{ align: "left", marginTop: 30 }}>
                <label>1. Location</label>
                <p style={{ padding: 2 }}>
                  {location.address_line1},{location.address_line2}
                </p>
                <button onClick={() => setLocation("")}>
                  Choose new location
                </button>
              </div>
            )}
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
