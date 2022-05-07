import { useEffect, useState } from "react";
import { useMatch } from "react-router";
import Information from "../components/profile/Information";
import Posts from "../components/profile/Posts";
import useHttp from "../hooks/use-http";

const Profile = () => {
  const [data, setData] = useState("");

  let match = useMatch("profile/:nick");
  const nickname = match.params.nick;

  const httpData = useHttp(
    {
      url: `${process.env.REACT_APP_BACKEND}/api/profile/${nickname}`,
    },
    (response) => {
      setData(response);
    }
  );

  const { isLoading, error, sendRequest: loadUser } = httpData;

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
