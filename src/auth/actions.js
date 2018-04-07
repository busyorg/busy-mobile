// @flow

import createAsyncType from '../helpers/createAsyncType';

import type { Action } from '../types';

export const LOGIN = createAsyncType('@auth/LOGIN');
export const LOGOUT = '@auth/LOGOUT';

export const login = (): Action => ({ type: LOGIN.REQUEST });
export const loginSuccess = (payload: Object): Action => ({ type: LOGIN.SUCCESS, payload });
export const logout = (): Action => ({ type: LOGOUT });
