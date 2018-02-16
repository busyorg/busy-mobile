import { combineReducers } from 'redux';
import feed, * as fromFeed from './feed';
import posts, * as fromPosts from './posts';

export default combineReducers({
  feed,
  posts,
});

export const getLastPostId = state => fromFeed.getLastPostId(state.feed);

export const getPostById = (state, id) => fromPosts.getPostById(state.posts, id);
