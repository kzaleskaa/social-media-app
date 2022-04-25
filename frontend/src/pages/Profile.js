import { useEffect, useState } from "react";
import { useMatch } from "react-router";
import { connect } from "react-redux";
import Information from "../components/profile/Information";
import Posts from "../components/profile/Posts";

const Profile = ({ user }) => {
  const [postsNumber, setPostsNumber] = useState(0);
  const [profile, setProfile] = useState(false);

  let match = useMatch("profile/:nick");

  const nickname = match.params.nick;

  useEffect(() => {
    setProfile(user && user.nickname === nickname);
  }, [user, nickname]);

  if (!user) {
    return <h3>User logout!</h3>;
  }

  return (
    <>
      <Information
        postsNumber={postsNumber}
        nickname={nickname}
        user={user}
        profile={profile}
      />
      <Posts updatePostNumber={setPostsNumber} profile={profile} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
