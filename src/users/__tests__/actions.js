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

  it('should create FOLLOW_USER.REQUEST action', () => {
    const expected = { type: actions.FOLLOW_USER.REQUEST, meta: { username } };
    const actual = actions.followUser(username);

    expect(actual).toEqual(expected);
  });

  it('should craete FOLLOW_USER.SUCCESS action', () => {
    const payload = { success: true };

    const expected = { type: actions.FOLLOW_USER.SUCCESS, payload, meta: { username } };
    const actual = actions.followUserSuccess(payload, username);

    expect(actual).toEqual(expected);
  });

  it('should create UNFOLLOW_USER.REQUEST action', () => {
    const expected = { type: actions.UNFOLLOW_USER.REQUEST, meta: { username } };
    const actual = actions.unfollowUser(username);

    expect(actual).toEqual(expected);
  });

  it('should craete UNFOLLOW_USER.SUCCESS action', () => {
    const payload = { success: true };

    const expected = { type: actions.UNFOLLOW_USER.SUCCESS, payload, meta: { username } };
    const actual = actions.unfollowUserSuccess(payload, username);

    expect(actual).toEqual(expected);
  });
});
