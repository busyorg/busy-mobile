import { createAction } from 'redux-actions';
import createAsyncType from '../helpers/createAsyncType';

export const GET_USER = createAsyncType('@users/GET_USER');

export const getUser = createAction(GET_USER.REQUEST);
