import {
  CREATE_USER_FAIL,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  VERIFY_USER_FAIL,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
} from "./actionTypes";

const initialState = {
  isLoad: false,
  isError: false,
  userdata: [],
  isAuth: false,
  createAccount: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isLoad: true,
        isError: false,
        isAuth: false,
        createAccount: false,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoad: false,
        isError: false,
        userdata: payload,
        isAuth: true,
        createAccount: true,
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        isLoad: false,
        isError: true,
        isAuth: false,
        createAccount: false,
      };
    case VERIFY_USER_REQUEST:
      return {
        ...state,
        isLoad: true,
        isError: false,
        isAuth: false,
      };
    case VERIFY_USER_SUCCESS:
      return {
        ...state,
        isLoad: true,
        isError: false,
        isAuth: true,
        userdata: payload,
      };
    case VERIFY_USER_FAIL:
      return {
        ...state,
        isLoad: true,
        isError: false,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default reducer;
