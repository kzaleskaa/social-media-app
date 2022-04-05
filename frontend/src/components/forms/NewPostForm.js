import axios from "axios";
import { useRef } from "react";

const NewPost = () => {
  const enteredImage = useRef(null);
  const enteredDescrption = useRef("");

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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/posts",
        formData,
        configuration
      );
      alert("You added new post!");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Add new post</h1>
      <form onSubmit={addNewPostHandler}>
        <input
          type="file"
          name="post-img"
          accept="image/*"
          ref={enteredImage}
          required
        />
        <input type="text" ref={enteredDescrption} />
        <button type="submit" onSubmit={addNewPostHandler}>
          Add
        </button>
      </form>
    </div>
  );
};

export default NewPost;
