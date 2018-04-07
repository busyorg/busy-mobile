// @flow

import type { Action, User } from '../types';

export function login(): Action {
  return {
    type: '@auth/LOGIN_REQUEST',
  };
}

export function loginSuccess(payload: User): Action {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload,
  };
}

export function logout(): Action {
  return {
    type: '@auth/LOGOUT',
  };
}
