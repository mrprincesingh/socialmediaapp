import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer';
import userPost from './PostRedux/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  post: userPost,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
