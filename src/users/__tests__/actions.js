import * as fromActions from '../actions';

describe('users actions', () => {
  const username = 'sekhmet';

  it('should create get user request action', () => {
    const expected = { type: fromActions.GET_USER.REQUEST, meta: { username } };
    const actual = fromActions.getUser(username);

    expect(actual).toEqual(expected);
  });

  it('should craete get user success action', () => {
    const payload = { id: 42, name: 'sekhmet' };

    const expected = { type: fromActions.GET_USER.SUCCESS, payload, meta: { username } };
    const actual = fromActions.getUserSuccess(payload, username);

    expect(actual).toEqual(expected);
  });
});
