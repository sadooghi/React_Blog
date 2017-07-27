import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case DELETE_POST:
      //next line says: if the state object has a key of post id (action.payload), drop it => return a new
      //object which doesn't have that post
      return _.omit(state, action.payload);
    case FETCH_POST:
      //const post = action.payload.data;
      //const newState = { ...state };
      //newState[post.id] = post;
      //return newState;
      //the above 4 lines are identical to [action.payload.data.id] : action.payload.data used below
      return { ...state, [action.payload.data.id] : action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}