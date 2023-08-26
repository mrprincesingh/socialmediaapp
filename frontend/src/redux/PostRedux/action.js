import axios from "axios";
import * as types from "./actionTypes";
const authToken = 'your_authentication_token'; 


 export const getAllPost = ()=>async (dispatch)=>{
    try {
        dispatch({ type: types.GET_POST_REQUEST });
    
        const response = await axios.get(`https://socialbackend.vercel.app/api/getpost`);
        const data = response.data; 
    
        dispatch({
          type: types.GET_POST_SUCCESS,
          payload: data, 
        });
      } catch (err) {
        dispatch({ type: types.GET_POST_FAIL });
      }
 }

 export const createPost = ({ content }) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_POST_REQUEST });

 
    const requestData = { content: content };

  
  

    const response = await axios.post('https://socialbackend.vercel.app/api/posts', requestData);

    console.log('Response from createPost API:', response.data); // Log the response data
    dispatch({ type: types.CREATE_POST_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error in createPost API:', error); // Log any errors
    dispatch({ type: types.CREATE_POST_FAIL });
  }
};

