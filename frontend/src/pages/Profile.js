import axios from "axios";
import { useEffect, useState } from "react";
import { useMatch } from "react-router";
import Information from "../components/profile/Information";
import Posts from "../components/profile/Posts";

const Profile = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
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
    } catch (err) {
      setError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, [nickname]);

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
      />
      <Posts posts={data.posts} />
    </>
  );
};

export default Profile;
