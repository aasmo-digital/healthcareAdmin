import { LOGIN_USER, LOGIN_SUCCESS, API_ERROR, LOGOUT_USER, LOGOUT_USER_SUCCESS } from './actionTypes';

// Login User
export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});

// Login Success
export const loginSuccess = (response) => ({
  type: LOGIN_SUCCESS,
  payload: response,
});

// API Error
export const apiError = (error) => ({
  type: API_ERROR,
  payload: error,
});

// Logout User
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

// Logout User Success
export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});
