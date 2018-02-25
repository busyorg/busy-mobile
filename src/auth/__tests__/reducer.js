import reducer from '../reducer';
import * as actions from '../actions';

describe('auth reducer', () => {
  it('should return initial state', () => {
    const expected = {
      loading: false,
      user: null,
    };
    const actual = reducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it('should handle LOGIN_REQUEST', () => {
    const initialState = {
      loading: false,
      user: null,
    };
    const action = actions.login();

    const expected = {
      loading: true,
      user: null,
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const initialState = {
      loading: true,
      user: null,
    };
    const payload = {
      name: 'sekhmet',
      post_count: 21,
    };
    const action = actions.loginSuccess(payload);

    const expected = {
      loading: false,
      user: payload,
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
