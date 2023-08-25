import axios from "axios";
import { CREATE_USER_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, VERIFY_USER_FAIL, VERIFY_USER_REQUEST, VERIFY_USER_SUCCESS } from "./actionTypes";


const get_singup_request = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};

const get_singup_success = (payload) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload,
  };
};

const get_singup_Error = () => {
  return {
    type: CREATE_USER_FAIL,
  };
};

const get_login_request = () => {
  return {
    type: VERIFY_USER_REQUEST,
  };
};
const get_login_success = (payload) => {
  return {
    type: VERIFY_USER_SUCCESS,
    payload,
  };
};

const get_login_Error = () => {
  return {
    type: VERIFY_USER_FAIL,
  };
};

export const signupfunc = ({
   email,
   password,
  bio,
  name
}) => (dispatch) => {
  dispatch(get_singup_request());
  axios
    .post("https://socialbackend.vercel.app/api/users", {
        email: email,
        password: password,
        bio:bio,
        name:name
    })
    .then((res) => {
      console.log(res);
      dispatch(get_singup_success(res));
    })
    .catch((err) => dispatch(get_singup_Error()));
};

export const loginfunc = ({ email,  password }) => (dispatch) => {
  dispatch(get_login_request());
  axios
    .post("https://socialbackend.vercel.app/api/verifyusers", {  email:email, password:password } )
    .then((res) => {
      console.log(res);
      dispatch(get_login_success(res));
    })
    .catch((err) => dispatch(get_login_Error()));
};
