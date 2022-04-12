import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import classes from "./Posts.module.css";
import Modal from "../modal/Modal";

const Posts = () => {
  const [modalIsShow, setModalIsShown] = useState(false);
  const [like, setLike] = useState(false);
  const [showNumber, setShowNumber] = useState(0);
  const [posts, setPosts] = useState([]);

  const showModalHandler = (e) => {
    setShowNumber(Number(e.target.id));
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  const changePostNextHandler = () => {
    if (showNumber + 1 < posts.length) {
      setShowNumber(showNumber + 1);
    }
  };

  const changePostBackHandler = () => {
    if (showNumber - 1 >= 0) {
      setShowNumber(showNumber - 1);
    }
  };

  const loadPosts = async () => {
    const configuration = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/posts",
        configuration
      );
      setPosts(response.data.posts);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <div className={classes["posts-container"]}>
        {posts.map((item, index) => (
          <div
            className={classes.post}
            onClick={showModalHandler}
            key={index}
            id={index}
          >
            <img
              src={`http://127.0.0.1:8000${item.image}`}
              alt="post"
              id={index}
            />
          </div>
        ))}
      </div>

      {modalIsShow && (
        <Modal
          onCloseModal={hideModalHandler}
          changePostNextHandler={changePostNextHandler}
          changePostBackHandler={changePostBackHandler}
          typeOfModal="posts"
        >
          <div className={classes.container}>
            <div
              className={classes.photo}
              onDoubleClick={() => {
                setLike((prev) => !prev);
              }}
            >
              <img
                src={`http://127.0.0.1:8000${posts[showNumber].image}`}
                alt="post"
              />
            </div>
            <div className={classes.info}>
              <p>{posts[showNumber].description}</p>
              <div className={classes.social}>
                <FontAwesomeIcon
                  icon={like ? faHeartSolid : faHeartRegular}
                  color={like ? "#be0000" : "black"}
                  onClick={() => {
                    setLike((prev) => !prev);
                  }}
                />
                <p>{new Date(posts[showNumber].date).toLocaleDateString()}</p>
                <form>
                  <input type="text" placeholder="Add new comment" />
                </form>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Posts;
