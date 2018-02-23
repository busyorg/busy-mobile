import reducer, * as selectors from '../reducer';
import * as actions from '../actions';

describe('feed reducer', () => {
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

  it('should return intial state', () => {
    const expected = {};
    const actual = reducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it('should handle GET_FEED_REQUEST', () => {
    const initialState = {};
    const sortBy = 'trending';
    const action = actions.getFeed(sortBy);

    const expected = {
      'global/trending': {
        ids: [],
        loading: true,
        refreshing: false,
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle GET_FEED_SUCCESS', () => {
    const initialState = {
      'global/trending': {
        ids: [],
        loading: true,
        refreshing: false,
      },
    };
    const sortBy = 'trending';
    const action = actions.getFeedSuccess(responseA, sortBy);

    const expected = {
      'global/trending': {
        ids: [256, 257, 258],
        loading: false,
        refreshing: false,
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle GET_MORE_FEED_REQUEST', () => {
    const initialState = {
      'tag/busy/trending': {
        ids: [256, 257, 258],
        loading: false,
        refreshing: false,
      },
    };
    const sortBy = 'trending';
    const tag = 'busy';
    const action = actions.getMoreFeed(sortBy, tag);

    const expected = {
      'tag/busy/trending': {
        ids: [256, 257, 258],
        loading: true,
        refreshing: false,
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle GET_MORE_FEED_SUCCESS', () => {
    const initialState = {
      'tag/busy/trending': {
        ids: [256, 257, 258],
        loading: true,
        refreshing: false,
      },
    };
    const sortBy = 'trending';
    const tag = 'busy';
    const action = actions.getMoreFeedSuccess(responseB, sortBy, tag);

    const expected = {
      'tag/busy/trending': {
        ids: [256, 257, 258, 259, 260, 261],
        loading: false,
        refreshing: false,
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle REFRESH_FEED_REQUEST', () => {
    const initialState = {
      'tag/busy/trending': {
        ids: [256, 257, 258],
        loading: false,
        refreshing: false,
      },
    };
    const sortBy = 'trending';
    const tag = 'busy';
    const action = actions.refreshFeed(sortBy, tag);

    const expected = {
      'tag/busy/trending': {
        ids: [256, 257, 258],
        loading: false,
        refreshing: true,
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle REFRESH_FEED_SUCCESS', () => {
    const initialState = {
      'tag/busy/trending': {
        ids: [256, 257, 258],
        loading: false,
        refreshing: true,
      },
    };
    const sortBy = 'trending';
    const tag = 'busy';
    const action = actions.refreshFeedSuccess(responseB, sortBy, tag);

    const expected = {
      'tag/busy/trending': {
        ids: [259, 260, 261],
        loading: false,
        refreshing: false,
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});

describe('feed selectors', () => {
  const sortBy = 'trending';
  const tag = 'busy';
  const state = {
    'tag/busy/trending': {
      ids: [256, 257, 258, 259, 260, 261],
      loading: false,
      refreshing: false,
    },
  };

  it('should get feed ids', () => {
    const expected = state['tag/busy/trending'].ids;
    const actual = selectors.getFeedIds(state, sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should get feed loading', () => {
    const expected = state['tag/busy/trending'].loading;
    const actual = selectors.getFeedLoading(state, sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should get feed refreshing', () => {
    const expected = state['tag/busy/trending'].refreshing;
    const actual = selectors.getFeedRefreshing(state, sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should get last post id', () => {
    const expected = 261;
    const actual = selectors.getLastPostId(state, sortBy, tag);

    expect(actual).toEqual(expected);
  });
});
