import _ from 'lodash';
import { combineReducers } from 'redux';
import { GET_FEED, GET_MORE_FEED, REFRESH_FEED } from './actions';

function getFeedName(sortBy, tag) {
  return tag ? `tag/${tag}/${sortBy}` : `global/${sortBy}`;
}

const initialFeedState = {
  loading: false,
  refreshing: false,
  ids: [],
};

function ids(state = initialFeedState.ids, action) {
  switch (action.type) {
    case GET_FEED.REQUEST:
      return [];
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      return [...state, ...action.payload.result];
    case REFRESH_FEED.SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
}

function loading(state = initialFeedState.loading, action) {
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

function refreshing(state = initialFeedState.refreshing, action) {
  switch (action.type) {
    case REFRESH_FEED.REQUEST:
      return true;
    case REFRESH_FEED.SUCCESS:
      return false;
    default:
      return state;
  }
}

const feed = combineReducers({
  ids,
  loading,
  refreshing,
});

export default function reducer(state = {}, action) {
  if (action.meta && action.meta.sortBy) {
    const feedName = getFeedName(action.meta.sortBy, action.meta.tag);
    return { ...state, [feedName]: feed(state[feedName], action) };
  }

  return state;
}

const getFeed = (state, sortBy, tag) => _.get(state, getFeedName(sortBy, tag), initialFeedState);

export const getFeedIds = (state, sortBy, tag) => getFeed(state, sortBy, tag).ids;
export const getFeedLoading = (state, sortBy, tag) => getFeed(state, sortBy, tag).loading;
export const getFeedRefreshing = (state, sortBy, tag) => getFeed(state, sortBy, tag).refreshing;
export const getLastPostId = (state, sortBy, tag) => {
  const list = getFeedIds(state, sortBy, tag);
  return list[list.length - 1];
};
