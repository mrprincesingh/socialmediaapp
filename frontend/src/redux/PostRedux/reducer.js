import {
  GET_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from "./actionTypes";

const initialState = {
  loading: false,
  post: {
    posts: [], // Array to hold posts
  },
  error: false,
};
  
const productreducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POST_REQUEST:
    case CREATE_POST_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_POST_SUCCESS:
      return { ...state, loading: false, post: payload };
    case CREATE_POST_SUCCESS:
      // Concatenate the new post to the existing posts array
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          posts: [payload, ...state.post.posts], // Add the new post to the beginning of the array
        },
      };
    case GET_POST_FAIL:
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default productreducer;


