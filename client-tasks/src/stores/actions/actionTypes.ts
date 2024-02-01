export const actionType = {
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNIN_FAIL: "SIGNIN_FAIL",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAIL: "SIGNUP_FAIL",
  LOGOUT: "LOGOUT",
};

export interface ISignup {
  username: string;
  password: string;
}

export interface ISignin {
  username: string;
  password: string;
  accessToken: string;
}

export interface ILogout {}
