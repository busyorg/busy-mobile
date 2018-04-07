// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';

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
    case '@comments/GET_COMMENTS_SUCCESS':
    case '@comments/REFRESH_COMMENTS_SUCCESS':
      return action.payload.result;
    default:
      return state;
  }
}

function loading(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case '@comments/GET_COMMENTS_REQUEST':
    case '@comments/REFRESH_COMMENTS_REQUEST':
      return true;
    case '@comments/GET_COMMENTS_SUCCESS':
    case '@comments/REFRESH_COMMENTS_SUCCESS':
      return false;
    default:
      return state;
  }
}

function loaded(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case '@comments/GET_COMMENTS_REQUEST':
      return false;
    case '@comments/GET_COMMENTS_SUCCESS':
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
    case '@comments/GET_COMMENTS_REQUEST':
    case '@comments/GET_COMMENTS_SUCCESS':
    case '@comments/REFRESH_COMMENTS_REQUEST':
    case '@comments/REFRESH_COMMENTS_SUCCESS':
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

export const getCommentsIdsByPostId = (state: State, id: number) => _.get(state[id], 'replies', []);
export const getIsCommentsLoading = (state: State, id: number) =>
  _.get(state[id], 'loading', false);
export const getIsCommentsLoaded = (state: State, id: number) => _.get(state[id], 'loaded', false);
