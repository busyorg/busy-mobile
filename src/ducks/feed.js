import { createAction } from 'redux-actions';
import createAsyncType from '../helpers/createAsyncType';

export const GET_FEED = createAsyncType('@feed/GET_FEED');
export const GET_MORE_FEED = createAsyncType('@feed/GET_MORE_FEED');

const initialState = {
  loading: false,
  list: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEED.START:
    case GET_MORE_FEED.START:
      return {
        ...state,
        loading: true,
      };
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, ...action.payload.map(post => post.id)],
      };
    default:
      return state;
  }
}

export const getLastPostId = state => state.list[state.list.length - 1];

export const getFeed = createAction(GET_FEED.REQUEST);
export const getMoreFeed = createAction(GET_MORE_FEED.REQUEST);
