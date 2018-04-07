// @flow

import { combineReducers } from 'redux';

import type { Action, User } from '../types';

export type State = {
  loading: boolean,
  user?: User,
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

function user(state: ?User = null, action: Action): ?User {
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

export const getIsAuthLoading = (state: State): boolean => state.loading;
export const getAuthUser = (state: State): ?User => state.user;
