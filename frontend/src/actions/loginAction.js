import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../types/types";

import axios from "axios";

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/auth/users/me/",
        configuration
      );

      dispatch({ type: LOAD_USER_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: LOAD_USER_FAIL });
    }
  } else {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

export const login = (email, password) => async (dispatch) => {
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/jwt/create/",
      body,
      configuration
    );

    dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};
