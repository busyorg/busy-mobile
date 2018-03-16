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
    const expected = {
      replies: {},
      loading: false,
    };
    const actual = reducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it('should handle GET_COMMENTS_REQUEST', () => {
    const initialState = { byId: {}, replies: {}, loading: false };
    const action = actions.getComments(222);

    const expected = {
      replies: {},
      loading: true,
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle GET_COMMENTS_SUCCESS', () => {
    const initialState = { byId: {}, replies: {}, loading: true };
    const action = actions.getCommentsSuccess(payload, 222);

    const expected = {
      replies: {
        222: [522, 523, 524],
      },
      loading: false,
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
