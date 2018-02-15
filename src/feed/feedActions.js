import { createAction } from 'redux-actions';
import createAsyncType from '../helpers/createAsyncType';

export const GET_FEED = createAsyncType('@feed/GET_FEED');
export const GET_MORE_FEED = createAsyncType('@feed/GET_MORE_FEED');

export const getFeed = createAction(GET_FEED.REQUEST);
export const getMoreFeed = createAction(GET_MORE_FEED.REQUEST);

export default null;
