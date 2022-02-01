import {
  LOGIN_ERR,
  LOGIN_REQ,
  LOGIN_SUCC,
  LOGOUT_SUCC,
  REGISTER_ERR,
  REGISTER_REQ,
  REGISTER_SUCC,
  RESET,
  CLEAR_NOTIF,
  MAIL_SEND_REQ,
  MAIL_SEND_SUCC,
  MAIL_SEND_ERR,
  RESET_PASS_REQ,
  RESET_PASS_ERR,
  RESET_PASS_SUCC,
} from "./types";

import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQ,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/login",
      { email, password },
      options
    );

    dispatch({
      type: LOGIN_SUCC,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: LOGIN_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_NOTIF,
      });
    }, 5000);
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT_SUCC,
  });
  // dispatch({
  //   type: RESET,
  // });
};

export const registerUser =
  (name, email, password, mobile) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQ,
      });

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/register",
        { email, password, name, mobile },
        options
      );

      dispatch({
        type: REGISTER_SUCC,
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: REGISTER_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_NOTIF,
        });
      }, 5000);
    }
  };

export const sendEmail = (email) => async (dispatch) => {
  try {
    dispatch({
      type: MAIL_SEND_REQ,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("/api/auth/forgotpassword", { email }, options);

    dispatch({
      type: MAIL_SEND_SUCC,
      payload: "Mail sent successfully, check your inbox",
    });
  } catch (err) {
    dispatch({
      type: MAIL_SEND_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const resetPassword = (password) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASS_REQ,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const token = window.location.search.split("=")[1];

    const { data } = await axios.put(
      `/api/auth/resetpassword/${token}`,
      { password },
      options
    );

    dispatch({
      type: RESET_PASS_SUCC,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: RESET_PASS_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_NOTIF,
      });
    }, 10000);
  }
};
