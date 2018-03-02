import { combineReducers } from 'redux';
import { GET_POST, VOTE_POST } from './actions';
import { GET_FEED, GET_MORE_FEED, REFRESH_FEED } from '../feed/actions';

function posts(state = {}, action) {
  switch (action.type) {
    case GET_POST.SUCCESS:
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
    case REFRESH_FEED.SUCCESS:
      return {
        ...state,
        ...action.payload.entities.posts,
      };
    default:
      return state;
  }
}

function pendingVotes(state = [], action) {
  switch (action.type) {
    case VOTE_POST.REQUEST:
      return [...state, action.meta.postId];
    case VOTE_POST.ERROR:
      return state.filter(postId => postId !== action.meta.postId);
    case GET_POST.SUCCESS:
      if (action.meta && action.meta.refresh) {
        return state.filter(postId => postId !== action.payload.result);
      }
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  pendingVotes,
});

export const getPostById = (state, id) => state.posts[id];
export const getIsPostPendingVote = (state, id) => state.pendingVotes.indexOf(id) !== -1;
