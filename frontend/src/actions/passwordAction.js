import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  PASSWORD_CONFIRMATION_SUCCESS,
  PASSWORD_CONFIRMATION_FAIL,
} from "../types/types";

import axios from "axios";

// send email to user with password reset link
export const changePassword = (email) => async (dispatch) => {
  const configuration = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      "http://127.0.0.1:8000/auth/users/reset_password/",
      body,
      configuration
    );

    dispatch({ type: CHANGE_PASSWORD_SUCCESS });
  } catch (err) {
    dispatch({ type: CHANGE_PASSWORD_FAIL });
  }
};

// finish reset password process
export const confirmChangePassword = (uid, token, new_password, re_new_password) => async (dispatch) => {
    const configuration = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
  
    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/users/reset_password_confirm/",
        body,
        configuration
      );
  
      dispatch({ type: PASSWORD_CONFIRMATION_SUCCESS });
    } catch (err) {
      dispatch({ type: PASSWORD_CONFIRMATION_FAIL });
    }
  };