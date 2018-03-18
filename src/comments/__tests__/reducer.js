import * as actions from '../actions';
import reducer from '../reducer';

describe('comments reducer', () => {
  const payload = {
    entities: {
      comments: {
        522: { id: 522 },
        523: { id: 523 },
        524: { id: 524 },
      },
    },
    result: [522, 523, 524],
  };

  it('should return initial state', () => {
    const expected = {};
    const actual = reducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it('should handle GET_COMMENTS_REQUEST', () => {
    const initialState = {};
    const action = actions.getComments(222);

    const expected = {
      222: {
        loaded: false,
        loading: true,
        replies: [],
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle GET_COMMENTS_SUCCESS', () => {
    const initialState = {
      222: {
        loaded: false,
        loading: true,
        replies: [],
      },
    };
    const action = actions.getCommentsSuccess(payload, 222);

    const expected = {
      222: {
        loaded: true,
        loading: false,
        replies: [522, 523, 524],
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle REFRESH_COMMENTS_REQUEST', () => {
    const initialState = {
      222: {
        loaded: true,
        loading: false,
        replies: [11, 12, 13],
      },
    };
    const action = actions.refreshComments(222);

    const expected = {
      222: {
        loaded: true,
        loading: true,
        replies: [11, 12, 13],
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle REFRESH_COMMENTS_SUCCESS', () => {
    const initialState = {
      222: {
        loaded: true,
        loading: true,
        replies: [11, 12, 13],
      },
    };
    const action = actions.refreshCommentsSuccess(payload, 222);

    const expected = {
      222: {
        loaded: true,
        loading: false,
        replies: [522, 523, 524],
      },
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
