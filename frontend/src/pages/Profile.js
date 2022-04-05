import Information from "../components/profile/Information";
import Posts from "../components/profile/Posts";
import NewPostForm from "../components/forms/NewPostForm";

const Profile = () => {
  return (
    <>
      <Information />
      <NewPostForm />
      <Posts />
    </>
  );
};

export default Profile;
