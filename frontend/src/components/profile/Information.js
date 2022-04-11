import NewPost from "../forms/NewPostForm";
import classes from "./Information.module.css";

const Information = () => {
  return (
    <header className={classes.header}>
      <div className={classes.user}>
        <div className={classes["photo-container"]}>
          <img src="./photo.jpg" alt="user" />
        </div>
        <div>
          <h3>@kzaleskaa</h3>
          <h4>Kasia Zaleskddddddddda</h4>
        </div>
      </div>
      <div className={classes["info-container"]}>
        <ul className={classes["profile-info"]}>
          <li>
            <div>
              <span className={classes.number}>20</span>posts
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
