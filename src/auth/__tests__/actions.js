import * as fromActions from '../actions';

describe('auth actions', () => {
  it('should create login request action', () => {
    const expected = {
      type: fromActions.LOGIN.REQUEST,
    };
    const actual = fromActions.login();

    expect(actual).toEqual(expected);
  });

  it('should create login success action', () => {
    const payload = {
      name: 'sekhmet',
      post_count: 55,
    };

    const expected = {
      type: fromActions.LOGIN.SUCCESS,
      payload,
    };
    const actual = fromActions.loginSuccess(payload);

    expect(actual).toEqual(expected);
  });

  it('should create logout action', () => {
    const expected = {
      type: fromActions.LOGOUT,
    };
    const actual = fromActions.logout();

    expect(actual).toEqual(expected);
  });
});
