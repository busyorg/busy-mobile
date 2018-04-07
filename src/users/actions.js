// @flow

import createAsyncType from '../helpers/createAsyncType';

import type { Action } from '../types';

export const GET_USER = createAsyncType('@users/GET_USER');
export const FOLLOW_USER = createAsyncType('@users/FOLLOW_USER');
export const UNFOLLOW_USER = createAsyncType('@users/UNFOLLOW_USER');

export const getUser = (username: string): Action => ({
  type: GET_USER.REQUEST,
  meta: {
    username,
  },
});

export const getUserSuccess = (payload: Object, username: string): Action => ({
  type: GET_USER.SUCCESS,
  payload,
  meta: {
    username,
  },
});

export function followUser(username: string): Action {
  return {
    type: FOLLOW_USER.REQUEST,
    meta: { username },
  };
}

export function followUserSuccess(payload: Object, username: string): Action {
  return {
    type: FOLLOW_USER.SUCCESS,
    meta: { username },
    payload,
  };
}

export function unfollowUser(username: string): Action {
  return {
    type: UNFOLLOW_USER.REQUEST,
    meta: { username },
  };
}

export function unfollowUserSuccess(payload: Object, username: string): Action {
  return {
    type: UNFOLLOW_USER.SUCCESS,
    meta: { username },
    payload,
  };
}
