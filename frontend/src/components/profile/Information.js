import axios from "axios";
import { useEffect, useState } from "react";

import NewPost from "../forms/NewPostForm";
import classes from "./Information.module.css";

const Information = (props) => {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    nickname: "",
  });

  const loadUserInformation = async () => {
    const configuration = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/profile/me/",
        configuration
      );

      setUserInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUserInformation();
  }, []);

  return (
    <header className={classes.header}>
      <div className={classes.user}>
        <div className={classes["photo-container"]}>
          <img src="./photo.jpg" alt="user" />
        </div>
        <div>
          <h3>@{userInfo.nickname}</h3>
          <h4>{`${userInfo.first_name} ${userInfo.last_name}`}</h4>
        </div>
      </div>
      <div className={classes["info-container"]}>
        <ul className={classes["profile-info"]}>
          <li>
            <div>
              <span className={classes.number}>{props.postsNumber}</span>posts
            </div>
          </li>
          <li>
            <div>
              <span className={classes.number}>1mln</span>followers
            </div>
          </li>
          <li>
            <div>
              <span className={classes.number}>0</span>following
            </div>
          </li>
        </ul>
      </div>
      <div className={classes["new-post"]}>
        <NewPost />
      </div>
    </header>
  );
};

export default Information;
