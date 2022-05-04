import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useMatch } from "react-router";

import Information from "../components/profile/Information";
import Posts from "../components/profile/Posts";

const Profile = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [postsNumber, setPostsNumber] = useState(0);

  let match = useMatch("profile/:nick");

  const nickname = match.params.nick;

  const loadUser = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/profile/${nickname}`,
        configuration
      );
      setData(response.data);
    } catch (err) {
      setError("User not found!");
    }
    setIsLoading(false);
  }, [nickname]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Not found</p>;
  }

  return (
    <>
      <Information
        postsNumber={postsNumber}
        nickname={nickname}
        user={data.user}
        follow={data.follow}
        loadUser={loadUser}
      />
      <Posts updatePostNumber={setPostsNumber} posts={data.posts} />
    </>
  );
};

export default Profile;
