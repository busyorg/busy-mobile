// @flow

import { combineReducers } from 'redux';

import type { Action } from '../types';

export type State = {
  loading: boolean,
  user?: Object,
};

function loading(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case '@auth/LOGIN_REQUEST':
      return true;
    case '@auth/LOGIN_SUCCESS':
      return false;
    default:
      return state;
  }
}

function user(state: ?Object = null, action: Action): ?Object {
  switch (action.type) {
    case '@auth/LOGIN_SUCCESS':
      return action.payload;
    case '@auth/LOGOUT':
      return null;
    default:
      return state;
  }
}

const auth: (state: ?State, action: Action) => State = combineReducers({
  loading,
  user,
});

export default auth;

export const getIsAuthLoading = (state: State) => state.loading;
export const getAuthUser = (state: State) => state.user;
