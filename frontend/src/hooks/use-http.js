import axios from "axios";
import { useState } from "react";

const defaultHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
};

const useHttp = (
  { url, method = "get", body = null, header = defaultHeader },
  applyData
) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sendRequest = async () => {
    setError(false);
    setIsLoading(true);

    try {
      const response = await axios[method](url, header, body);
      applyData(response.data);
    } catch (err) {
      setError(err.msg || "Something went wrong! Try again!");
    }

    setIsLoading(false);
  };

  return { isLoading, error, sendRequest };
};

export default useHttp;
