import {
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
} from "../types/types";

import axios from "axios";

export const checkAuthentication = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const data = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/verify/",
        data,
        configuration
      );

      if (response.data.code === "token_not_valid") {
        dispatch({ type: AUTHENTICATED_FAIL });
      } else {
        dispatch({ type: AUTHENTICATED_SUCCESS });
      }
    } catch (err) {
      dispatch({ type: AUTHENTICATED_FAIL });
    }
  } else {
    dispatch({ type: AUTHENTICATED_FAIL });
  }
};
