import axios from "axios";
import { useEffect, useState } from "react";
import { useMatch } from "react-router";
import Information from "../components/profile/Information";
import Posts from "../components/profile/Posts";

const Profile = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatePosts, setUpdatePosts] = useState(0);

  let match = useMatch("profile/:nick");
  const nickname = match.params.nick;

  const configuration = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };

  const loadUser = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/profile/${nickname}`,
        configuration
      );

      setData(response.data);
      setError(false);
      setUpdatePosts(response.data.user.posts_number);
    } catch (err) {
      setError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname, updatePosts]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Not found</p>;
  }

  return (
    <>
      <Information
        nickname={nickname}
        user={data.user}
        follow={data.follow}
        loadUser={loadUser}
        setUpdatePosts={setUpdatePosts}
      />
      <Posts posts={data.posts} setUpdatePosts={setUpdatePosts} />
    </>
  );
};

export default Profile;
