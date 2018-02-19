import { combineReducers } from 'redux';
import feed, * as fromFeed from './feed';
import posts, * as fromPosts from './posts';
import users, * as fromUsers from './users';

export default combineReducers({
  feed,
  posts,
  users,
});

export const getLastPostId = state => fromFeed.getLastPostId(state.feed);

export const getPostById = (state, id) => fromPosts.getPostById(state.posts, id);

export const getUsersLoading = state => fromUsers.getUsersLoading(state.users);
export const getUserMetadata = (state, name) => fromUsers.getUserMetadata(state.users, name);
export const getUserDisplayName = (state, name) => fromUsers.getUserDisplayName(state.users, name);
export const getUserAbout = (state, name) => fromUsers.getUserAbout(state.users, name);
