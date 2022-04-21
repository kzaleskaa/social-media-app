import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
} from "../types/types";

import axios from "axios";

export const signUpNewUser =
  (first_name, last_name, email, nickname, password, re_password) => async (dispatch) => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      nickname,
      email,
      password,
      re_password,
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/users/",
        body,
        configuration
      );

      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: SIGNUP_FAIL });
    }
  };

export const verifyNewUser =
  (uid, token) => async (dispatch) => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      uid, token
    });

    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/users/activation/",
        body,
        configuration
      );

      dispatch({ type: ACTIVATION_SUCCESS });
    } catch (err) {
      dispatch({ type: ACTIVATION_FAIL });
    }
  };
