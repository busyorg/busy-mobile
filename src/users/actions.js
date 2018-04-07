// @flow

import type { Action } from '../types';

export const getUser = (username: string): Action => ({
  type: '@users/GET_USER_REQUEST',
  meta: {
    username,
  },
});

export const getUserSuccess = (payload: Object, username: string): Action => ({
  type: '@users/GET_USER_SUCCESS',
  payload,
  meta: {
    username,
  },
});

export function followUser(username: string): Action {
  return {
    type: '@users/FOLLOW_USER_REQUEST',
    meta: { username },
  };
}

export function followUserSuccess(payload: Object, username: string): Action {
  return {
    type: '@users/FOLLOW_USER_SUCCESS',
    meta: { username },
    payload,
  };
}

export function unfollowUser(username: string): Action {
  return {
    type: '@users/UNFOLLOW_USER_REQUEST',
    meta: { username },
  };
}

export function unfollowUserSuccess(payload: Object, username: string): Action {
  return {
    type: '@users/UNFOLLOW_USER_SUCCESS',
    meta: { username },
    payload,
  };
}
