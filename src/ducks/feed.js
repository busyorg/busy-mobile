import { createAction } from 'redux-actions';
import createAsyncType from '../helpers/createAsyncType';

export const GET_FEED = createAsyncType('@feed/GET_FEED');
export const GET_MORE_FEED = createAsyncType('@feed/GET_MORE_FEED');

const initialState = {
  loading: false,
  posts: [],
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
        posts: [...state.posts, ...action.payload],
      };
    default:
      return state;
  }
}

export const getFeed = createAction(GET_FEED.REQUEST);
export const getMoreFeed = createAction(GET_MORE_FEED.REQUEST);
