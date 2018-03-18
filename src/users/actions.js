import createAsyncType from '../helpers/createAsyncType';

export const GET_USER = createAsyncType('@users/GET_USER');
export const FOLLOW_USER = createAsyncType('@users/FOLLOW_USER');
export const UNFOLLOW_USER = createAsyncType('@users/UNFOLLOW_USER');

export const getUser = username => ({
  type: GET_USER.REQUEST,
  meta: {
    username,
  },
});

export const getUserSuccess = (payload, username) => ({
  type: GET_USER.SUCCESS,
  payload,
  meta: {
    username,
  },
});

export function followUser(username) {
  return {
    type: FOLLOW_USER.REQUEST,
    meta: { username },
  };
}

export function followUserSuccess(payload, username) {
  return {
    type: FOLLOW_USER.SUCCESS,
    meta: { username },
    payload,
  };
}

export function unfollowUser(username) {
  return {
    type: UNFOLLOW_USER.REQUEST,
    meta: { username },
  };
}

export function unfollowUserSuccess(payload, username) {
  return {
    type: UNFOLLOW_USER.SUCCESS,
    meta: { username },
    payload,
  };
}
