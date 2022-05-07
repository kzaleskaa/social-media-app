import axios from "axios";

import { useEffect } from "react";

const Home = () => {
  const downloadPosts = async () => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/posts/home`,
        configuration
      );

      console.log(result);
    } catch (err) {
      alert("Something went wrong! Try again!");
    }
  };

  // useEffect(() => {
  downloadPosts();

  return <h1>Home</h1>;
};

export default Home;
