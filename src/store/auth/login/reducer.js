import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  isUserLogout: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT_USER:
      return { ...state, isUserLogout: false };
    case LOGOUT_USER_SUCCESS:
      return { ...state, isUserLogout: true };
    case API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isUserLogout: false,
      };
    default:
      return state;
  }
};

export default login;
