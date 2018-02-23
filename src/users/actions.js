import createAsyncType from '../helpers/createAsyncType';

export const GET_USER = createAsyncType('@users/GET_USER');

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
