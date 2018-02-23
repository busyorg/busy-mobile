import _ from 'lodash';
import { combineReducers } from 'redux';
import { GET_USER } from './actions';

function loading(state = false, action) {
  switch (action.type) {
    case GET_USER.REQUEST:
      return true;
    case GET_USER.SUCCESS:
      return false;
    default:
      return state;
  }
}

function users(state = {}, action) {
  switch (action.type) {
    case GET_USER.SUCCESS:
      return {
        ...state,
        [action.meta.username]: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  users,
});

export const getUsersLoading = state => state.loading;
export const getUserByName = (state, name) => _.get(state, `users[${name}]`, {});
export const getUserPostCount = (state, name) => _.get(getUserByName(state, name), 'post_count', 0);
export const getUserFollowerCount = (state, name) =>
  _.get(getUserByName(state, name), 'follower_count', 0);
export const getUserFollowingCount = (state, name) =>
  _.get(getUserByName(state, name), 'following_count', 0);
export const getUserMetadata = (state, name) =>
  _.get(getUserByName(state, name), 'json_metadata', {});
export const getUserDisplayName = (state, name) =>
  _.get(getUserMetadata(state, name), 'profile.name', '');
export const getUserAbout = (state, name) =>
  _.get(getUserMetadata(state, name), 'profile.about', '');
