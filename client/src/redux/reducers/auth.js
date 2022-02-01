import {
  CLEAR_NOTIF,
  LOGIN_ERR,
  LOGIN_REQ,
  LOGIN_SUCC,
  LOGOUT_SUCC,
  MAIL_SEND_ERR,
  MAIL_SEND_REQ,
  MAIL_SEND_SUCC,
  REGISTER_ERR,
  REGISTER_REQ,
  REGISTER_SUCC,
  RESET_PASS_REQ,
  RESET_PASS_SUCC,
  RESET_PASS_ERR,
} from "../actions/types";

const initialState = {
  loading: true,
  success: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_PASS_REQ:
    case REGISTER_REQ:
    case LOGIN_REQ:
      return {
        loading: true,
      };
    case RESET_PASS_SUCC:
    case REGISTER_SUCC:
    case LOGIN_SUCC:
      return {
        loading: false,
        user: payload,
      };
    case RESET_PASS_ERR:
    case REGISTER_ERR:
    case LOGIN_ERR:
      return {
        loading: false,
        error: payload,
      };
    case LOGOUT_SUCC:
      return {
        loading: false,
      };
    case CLEAR_NOTIF:
      return {
        ...state,
        error: null,
      };
    case MAIL_SEND_REQ:
      return {
        mailing: true,
      };
    case MAIL_SEND_SUCC:
      return {
        success: payload,
        mailing: false,
      };
    case MAIL_SEND_ERR:
      return {
        mailing: false,
        mailerror: payload,
      };
    default:
      return state;
  }
};
