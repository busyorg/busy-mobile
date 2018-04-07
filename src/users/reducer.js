// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';

import type { Action } from '../types';

type Users = {
  [string]: Object,
};

type State = {
  users: Users,
  loading: boolean,
};

function loading(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case '@users/GET_USER_REQUEST':
      return true;
    case '@users/GET_USER_SUCCESS':
      return false;
    default:
      return state;
  }
}

function users(state: Users = {}, action: Action): Users {
  switch (action.type) {
    case '@users/GET_USER_SUCCESS':
      return {
        ...state,
        ...action.payload.entities.users,
      };
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  users,
});

export const getUsersLoading = (state: State): boolean => state.loading;
export const getUserByName = (state: State, name: string) => _.get(state, `users[${name}]`, {});
export const getUserPostCount = (state: State, name: string) =>
  _.get(getUserByName(state, name), 'post_count', 0);
export const getUserFollowerCount = (state: State, name: string) =>
  _.get(getUserByName(state, name), 'follower_count', 0);
export const getUserFollowingCount = (state: State, name: string) =>
  _.get(getUserByName(state, name), 'following_count', 0);
export const getUserMetadata = (state: State, name: string) =>
  _.get(getUserByName(state, name), 'json_metadata', {});
export const getUserDisplayName = (state: State, name: string) =>
  _.get(getUserMetadata(state, name), 'profile.name', '');
export const getUserAbout = (state: State, name: string) =>
  _.get(getUserMetadata(state, name), 'profile.about', '');
export const getUserCover = (state: State, name: string) =>
  _.get(getUserMetadata(state, name), 'profile.cover_image');
