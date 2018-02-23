import _ from 'lodash';
import { GET_FEED, GET_MORE_FEED, REFRESH_FEED } from './actions';

function getFeedName(sortBy, tag) {
  return tag ? `tag/${tag}/${sortBy}` : `global/${sortBy}`;
}

const initialFeedState = {
  loading: false,
  refreshing: false,
  list: [],
};

const initialState = {};

function feedList(state = initialFeedState.list, action) {
  switch (action.type) {
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      return [...state, ...action.payload.result];
    case REFRESH_FEED.SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
}

function feed(state = initialFeedState, action) {
  switch (action.type) {
    case GET_FEED.REQUEST:
      return { ...state, loading: true, list: [] };
    case GET_MORE_FEED.REQUEST:
      return { ...state, loading: true };
    case REFRESH_FEED.REQUEST:
      return { ...state, refreshing: true };
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      return {
        ...state,
        loading: false,
        list: feedList(state.list, action),
      };
    case REFRESH_FEED.SUCCESS:
      return {
        ...state,
        refreshing: false,
        list: feedList(state.list, action),
      };
    default:
      return state;
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEED.REQUEST:
    case GET_MORE_FEED.REQUEST:
    case REFRESH_FEED.REQUEST:
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
    case REFRESH_FEED.SUCCESS: {
      const { sortBy, tag } = action.meta;
      const feedName = getFeedName(sortBy, tag);
      return {
        ...state,
        [feedName]: feed(state[feedName], action),
      };
    }
    default:
      return state;
  }
}

export const getFeedList = (state, sortBy, tag) =>
  _.get(state, getFeedName(sortBy, tag), initialFeedState).list;
export const getFeedLoading = (state, sortBy, tag) =>
  _.get(state, getFeedName(sortBy, tag), initialFeedState).loading;
export const getFeedRefreshing = (state, sortBy, tag) =>
  _.get(state, getFeedName(sortBy, tag), initialFeedState).refreshing;
export const getLastPostId = (state, sortBy, tag) => {
  const list = getFeedList(state, sortBy, tag);
  return list[list.length - 1];
};
