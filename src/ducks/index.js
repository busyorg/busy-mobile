import { combineReducers } from 'redux';
import feed, * as fromFeed from './feed';
import posts, * as fromPosts from './posts';
import users, * as fromUsers from './users';

export default combineReducers({
  feed,
  posts,
  users,
});

export const getFeedList = (state, sortBy, tag) => fromFeed.getFeedList(state.feed, sortBy, tag);
export const getFeedLoading = (state, sortBy, tag) =>
  fromFeed.getFeedLoading(state.feed, sortBy, tag);
export const getFeedRefreshing = (state, sortBy, tag) =>
  fromFeed.getFeedRefreshing(state.feed, sortBy, tag);
export const getLastPostId = (state, sortBy, tag) =>
  fromFeed.getLastPostId(state.feed, sortBy, tag);

export const getPostById = (state, id) => fromPosts.getPostById(state.posts, id);

export const getUsersLoading = state => fromUsers.getUsersLoading(state.users);
export const getUserPostCount = (state, name) => fromUsers.getUserPostCount(state.users, name);
export const getUserFollowerCount = (state, name) =>
  fromUsers.getUserFollowerCount(state.users, name);
export const getUserFollowingCount = (state, name) =>
  fromUsers.getUserFollowingCount(state.users, name);
export const getUserMetadata = (state, name) => fromUsers.getUserMetadata(state.users, name);
export const getUserDisplayName = (state, name) => fromUsers.getUserDisplayName(state.users, name);
export const getUserAbout = (state, name) => fromUsers.getUserAbout(state.users, name);
