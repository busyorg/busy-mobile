import _ from 'lodash';
import { GET_USER } from './actions';

const initialState = {
  loading: false,
  users: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        users: {
          ...state.users,
          [action.meta.username]: action.payload,
        },
      };
    default:
      return state;
  }
}

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
