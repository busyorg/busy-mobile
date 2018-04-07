// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import { GET_COMMENTS, REFRESH_COMMENTS } from './actions';

import type { Action } from '../types';

type Replies = Array<number>;

type ById = {
  replies: Replies,
  loading: boolean,
  loeaded: boolean,
};

export type State = {
  [number]: ById,
};

function replies(state: Replies = [], action: Action): Replies {
  switch (action.type) {
    case GET_COMMENTS.SUCCESS:
      if (action.payload && action.payload.result) {
        return [...state, ...action.payload.result];
      }
      return state;
    case REFRESH_COMMENTS.SUCCESS:
      if (action.payload && action.payload.result) {
        return action.payload.result;
      }
      return state;
    default:
      return state;
  }
}

function loading(state: boolean = false, action): boolean {
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

function loaded(state: boolean = false, action): boolean {
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

const byId: (state: ById, action: Action) => ById = combineReducers({
  replies,
  loading,
  loaded,
});

export default function(state: State = {}, action: Action): State {
  switch (action.type) {
    case GET_COMMENTS.REQUEST:
    case GET_COMMENTS.SUCCESS:
    case GET_COMMENTS.ERROR:
    case REFRESH_COMMENTS.REQUEST:
    case REFRESH_COMMENTS.SUCCESS:
    case REFRESH_COMMENTS.ERROR:
      if (action.meta && action.meta.postId) {
        return {
          ...state,
          [action.meta.postId]: {
            ...state[action.meta.postId],
            ...byId(state[action.meta.postId], action),
          },
        };
      }

      return state;

    default:
      return state;
  }
}

export const getCommentsIdsByPostId = (state: State, id: number) => _.get(state[id], 'replies', []);
export const getIsCommentsLoading = (state: State, id: number) =>
  _.get(state[id], 'loading', false);
export const getIsCommentsLoaded = (state: State, id: number) => _.get(state[id], 'loaded', false);
