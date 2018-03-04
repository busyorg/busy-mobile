import * as actions from '../actions';

describe('users actions', () => {
  const username = 'sekhmet';

  it('should create get user request action', () => {
    const expected = { type: actions.GET_USER.REQUEST, meta: { username } };
    const actual = actions.getUser(username);

    expect(actual).toEqual(expected);
  });

  it('should craete get user success action', () => {
    const payload = { id: 42, name: 'sekhmet' };

    const expected = { type: actions.GET_USER.SUCCESS, payload, meta: { username } };
    const actual = actions.getUserSuccess(payload, username);

    expect(actual).toEqual(expected);
  });
});
