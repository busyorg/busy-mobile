import _ from 'lodash';
import { combineReducers } from 'redux';
import { GET_COMMENTS, REFRESH_COMMENTS } from './actions';

function replies(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS.SUCCESS:
      return [...state, ...action.payload.result];
    case REFRESH_COMMENTS.SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
}

function loading(state = false, action) {
  switch (action.type) {
    case GET_COMMENTS.REQUEST:
    case REFRESH_COMMENTS.REQUEST:
      return true;
    case GET_COMMENTS.SUCCESS:
    case GET_COMMENTS.ERROR:
    case REFRESH_COMMENTS.SUCCESS:
    case REFRESH_COMMENTS.ERROR:
      return false;
    default:
      return state;
  }
}

function loaded(state = false, action) {
  switch (action.type) {
    case GET_COMMENTS.REQUEST:
    case GET_COMMENTS.ERROR:
      return false;
    case GET_COMMENTS.SUCCESS:
      return true;
    default:
      return state;
  }
}

const byId = combineReducers({
  replies,
  loading,
  loaded,
});

export default function(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS.REQUEST:
    case GET_COMMENTS.SUCCESS:
    case GET_COMMENTS.ERROR:
    case REFRESH_COMMENTS.REQUEST:
    case REFRESH_COMMENTS.SUCCESS:
    case REFRESH_COMMENTS.ERROR:
      return {
        ...state,
        [action.meta.postId]: {
          ...state[action.meta.postId],
          ...byId(state[action.meta.postId], action),
        },
      };
    default:
      return state;
  }
}

export const getCommentsIdsByPostId = (state, id) => _.get(state[id], 'replies', []);
export const getIsCommentsLoading = (state, id) => _.get(state[id], 'loading', false);
export const getIsCommentsLoaded = (state, id) => _.get(state[id], 'loaded', false);
