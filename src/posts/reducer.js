// @flow

import { combineReducers } from 'redux';

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
    case '@posts/GET_POST_SUCCESS':
    case '@feed/GET_FEED_SUCCESS':
    case '@feed/GET_MORE_FEED_SUCCESS':
    case '@feed/REFRESH_FEED_SUCCESS':
      return { ...state, ...action.payload.entities.posts };
    case '@comments/GET_COMMENTS_SUCCESS':
      return { ...state, ...action.payload.entities.comments };
    default:
      return state;
  }
}

function pendingVotes(state: PendingVotes = [], action: Action): PendingVotes {
  switch (action.type) {
    case '@posts/VOTE_POST_REQUEST': {
      return [...state, action.meta.postId];
    }
    case '@posts/VOTE_POST_ERROR': {
      const { postId } = action.meta;
      return state.filter(id => id !== postId);
    }
    case '@posts/GET_POST_SUCCESS': {
      const postId = action.payload.result;
      return state.filter(id => id !== postId);
    }
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
