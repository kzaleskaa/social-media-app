import { useState } from "react";
import Information from "../components/profile/Information";
import Posts from "../components/profile/Posts";

const Profile = () => {
  const [postsNumber, setPostsNumber] = useState(0);

  return (
    <>
      <Information postsNumber={postsNumber} />
      <Posts updatePostNumber={setPostsNumber} />
    </>
  );
};

export default Profile;
