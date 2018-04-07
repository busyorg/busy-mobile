// @flow

import { combineReducers } from 'redux';
import { GET_POST, VOTE_POST } from './actions';
import { GET_FEED, GET_MORE_FEED, REFRESH_FEED } from '../feed/actions';
import { GET_COMMENTS } from '../comments/actions';

import type { Action, Post } from '../types';

type Posts = {
  [number]: Post,
};
type PendingVotes = Array<number>;

type State = {
  posts: Posts,
  pendingVotes: PendingVotes,
};

function posts(state: Posts = {}, action: Action): Posts {
  switch (action.type) {
    case GET_POST.SUCCESS:
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
    case REFRESH_FEED.SUCCESS:
      if (action.payload && action.payload.entities) {
        return { ...state, ...action.payload.entities.posts };
      }
      return state;
    case GET_COMMENTS.SUCCESS:
      if (action.payload && action.payload.comments) {
        return { ...state, ...action.payload.entities.comments };
      }
      return state;
    default:
      return state;
  }
}

function pendingVotes(state: PendingVotes = [], action: Action): PendingVotes {
  switch (action.type) {
    case VOTE_POST.REQUEST:
      if (action.meta && action.meta.postId) {
        return [...state, action.meta.postId];
      }
      return state;
    case VOTE_POST.ERROR:
      if (action.meta && action.meta.postId) {
        return state.filter(postId => postId !== action.meta.postId);
      }
      return state;
    case GET_POST.SUCCESS:
      if (action.meta && action.meta.refresh && action.payload && action.payload.result) {
        return state.filter(postId => postId !== action.payload.result);
      }
      return state;
    default:
      return state;
  }
}

const reducer: (state: ?State, action: Action) => State = combineReducers({
  posts,
  pendingVotes,
});

export default reducer;

export const getPostById = (state: State, id: number) => state.posts[id];
export const getIsPostPendingVote = (state: State, id: number) =>
  state.pendingVotes.indexOf(id) !== -1;
