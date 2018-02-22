import { GET_FEED, GET_MORE_FEED, REFRESH_FEED } from './feed';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_FEED.SUCCESS:
    case GET_MORE_FEED.SUCCESS:
    case REFRESH_FEED.SUCCESS:
      return {
        ...state,
        ...action.payload.reduce(
          (a, b) => ({
            ...a,
            [b.id]: b,
          }),
          {},
        ),
      };
    default:
      return state;
  }
}

export const getPostById = (state, id) => state[id];
