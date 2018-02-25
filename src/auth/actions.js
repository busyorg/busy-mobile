import createAsyncType from '../helpers/createAsyncType';

export const LOGIN = createAsyncType('@auth/LOGIN');

export const login = () => ({ type: LOGIN.REQUEST });
export const loginSuccess = payload => ({ type: LOGIN.SUCCESS, payload });
