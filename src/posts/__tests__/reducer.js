import reducer, * as selectors from '../reducer';
import * as feedActions from '../../feed/actions';

describe('posts reducer', () => {
  const responseA = {
    entities: {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
    },
    result: [256, 257, 258],
  };

  const responseB = {
    entities: {
      posts: {
        259: { title: 'some post 4' },
        260: { title: 'some post 5' },
        261: { title: 'some post 6' },
      },
    },
    result: [259, 260, 261],
  };

  it('should return initial state', () => {
    const expected = {};
    const actual = reducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it('should handle GET_FEED_SUCCESS', () => {
    const initialState = {};
    const sortBy = 'trending';
    const action = feedActions.getFeedSuccess(responseA, sortBy);

    const expected = {
      256: { title: 'some post 1' },
      257: { title: 'some post 2' },
      258: { title: 'some post 3' },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle GET_MORE_FEED_SUCCESS', () => {
    const initialState = {
      256: { title: 'some post 1' },
      257: { title: 'some post 2' },
      258: { title: 'some post 3' },
    };
    const sortBy = 'trending';
    const action = feedActions.getMoreFeedSuccess(responseB, sortBy);

    const expected = {
      256: { title: 'some post 1' },
      257: { title: 'some post 2' },
      258: { title: 'some post 3' },
      259: { title: 'some post 4' },
      260: { title: 'some post 5' },
      261: { title: 'some post 6' },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle REFRESH_FEED_SUCCESS', () => {
    const initialState = {
      256: { title: 'some post 1' },
      257: { title: 'some post 2' },
      258: { title: 'some post 3' },
    };
    const sortBy = 'trending';
    const action = feedActions.refreshFeedSuccess(responseB, sortBy);

    const expected = {
      256: { title: 'some post 1' },
      257: { title: 'some post 2' },
      258: { title: 'some post 3' },
      259: { title: 'some post 4' },
      260: { title: 'some post 5' },
      261: { title: 'some post 6' },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});

describe('posts selectors', () => {
  const state = {
    256: { title: 'some post 1' },
    257: { title: 'some post 2' },
    258: { title: 'some post 3' },
    259: { title: 'some post 4' },
    260: { title: 'some post 5' },
    261: { title: 'some post 6' },
  };

  it('should get post by id', () => {
    const postId = 259;

    const expected = state[postId];
    const actual = selectors.getPostById(state, postId);

    expect(actual).toEqual(expected);
  });
});
