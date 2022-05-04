import { useState } from "react";
import { useSelector } from "react-redux";

import NewPost from "../forms/NewPostForm";
import classes from "./Information.module.css";

const Information = (props) => {
  const [follow, setFollow] = useState(true);
  const currentUser = useSelector((state) => state.auth.user);

  const addNewPost = (
    <div className={classes["new-post"]}>
      <NewPost />
    </div>
  );

  const followUserHandler = (e) => {
    e.preventDefault();
    setFollow((prev) => !prev);
  };

  const followNewUser = (
    <div>
      <button
        className={`btn-submit ${follow && "btn-gray"}`}
        onClick={followUserHandler}
      >
        {follow ? "Unfollow" : "Follow"}
      </button>
    </div>
  );

  return (
    <header className={classes.header}>
      <div className={classes.user}>
        <div className={classes["photo-container"]}>
          <img src="./photo.jpg" alt="user" />
        </div>
        <div>
          <h3>@{props.user.nickname}</h3>
          <h4>{`${props.user.first_name} ${props.user.last_name}`}</h4>
        </div>
      </div>
      <div className={classes["info-container"]}>
        <ul className={classes["profile-info"]}>
          <li>
            <div>
              <span className={classes.number}>1</span>
              posts
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
      {props.user.nickname === currentUser.nickname
        ? addNewPost
        : followNewUser}
    </header>
  );
};

export default Information;
