import classes from "./Information.module.css";

const Information = () => {
  return (
    <header className={classes.header}>
      <div className={classes["photo-container"]}>
        <img src="./photo.jpg" alt="user" />
      </div>
      <div>
        <h2>@kzaleskaa</h2>
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
        <span>Kasia Zaleska</span>
      </div>
    </header>
  );
};

export default Information;
