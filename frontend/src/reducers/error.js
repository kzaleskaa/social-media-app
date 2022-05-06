import { GET_ERROR } from "../types/types";

const initialState = {
  msg: "",
  status: null,
};

export const errorRedcer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ERROR:
      return {
        msg: payload.msg,
        status: payload.status,
      };
    default:
      return state;
  }
};

export default errorRedcer;
