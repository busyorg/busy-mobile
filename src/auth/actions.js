import createAsyncType from '../helpers/createAsyncType';

export const LOGIN = createAsyncType('@auth/LOGIN');
export const LOGOUT = '@auth/LOGOUT';

export const login = () => ({ type: LOGIN.REQUEST });
export const loginSuccess = payload => ({ type: LOGIN.SUCCESS, payload });
export const logout = () => ({ type: LOGOUT });
