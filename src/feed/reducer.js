// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import { GET_FEED, GET_MORE_FEED, REFRESH_FEED } from './actions';

import type { Action, SortBy } from '../types';

function getFeedName(sortBy: string, tag: string): string {
  return tag ? `tag/${tag}/${sortBy}` : `global/${sortBy}`;
}

type Ids = Array<number>;

type Feed = {
  ids: Ids,
  loading: boolean,
  refreshing: boolean,
};

type State = {
  [string]: Feed,
};

function ids(state: Ids = [], action: Action): Ids {
  switch (action.type) {
    case GET_FEED.REQUEST:
      return [];
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      if (action.payload && action.payload.result) {
        return [...state, ...action.payload.result];
      }
      return state;
    case REFRESH_FEED.SUCCESS:
      if (action.payload && action.payload.result) {
        return action.payload.result;
      }
      return state;
    default:
      return state;
  }
}

function loading(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case GET_FEED.REQUEST:
    case GET_MORE_FEED.REQUEST:
      return true;
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      return false;
    default:
      return state;
  }
}

function refreshing(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case REFRESH_FEED.REQUEST:
      return true;
    case REFRESH_FEED.SUCCESS:
      return false;
    default:
      return state;
  }
}

const feed: (state: Feed, action: Action) => State = combineReducers({
  ids,
  loading,
  refreshing,
});

export default function reducer(state: State = {}, action: Action): State {
  if (action.meta && action.meta.sortBy) {
    const feedName = getFeedName(action.meta.sortBy, action.meta.tag);
    return { ...state, [feedName]: feed(state[feedName], action) };
  }

  return state;
}

const getFeed = (state, sortBy, tag) => _.get(state, getFeedName(sortBy, tag));

export const getFeedIds = (state: State, sortBy: SortBy, tag: string) =>
  getFeed(state, sortBy, tag).ids;
export const getFeedLoading = (state: State, sortBy: SortBy, tag: string) =>
  getFeed(state, sortBy, tag).loading;
export const getFeedRefreshing = (state: State, sortBy: SortBy, tag: string) =>
  getFeed(state, sortBy, tag).refreshing;
export const getLastPostId = (state: State, sortBy: SortBy, tag: string) => {
  const list = getFeedIds((state: State), sortBy, tag);
  return list[list.length - 1];
};
