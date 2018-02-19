import _ from 'lodash';
import { createAction } from 'redux-actions';
import createAsyncType from '../helpers/createAsyncType';

export const GET_USER = createAsyncType('@users/GET_USER');

const initialState = {
  loading: false,
  users: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER.START:
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
          [action.payload.name]: action.payload,
        },
      };
    default:
      return state;
  }
}

export const getUsersLoading = state => state.loading;
export const getUserMetadata = (state, name) => _.get(state, `users[${name}].json_metadata`, {});
export const getUserDisplayName = (state, name) =>
  _.get(getUserMetadata(state, name), 'profile.name', '');
export const getUserAbout = (state, name) =>
  _.get(getUserMetadata(state, name), 'profile.about', '');

export const getUser = createAction(GET_USER.REQUEST);
