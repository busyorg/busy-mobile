import { call, put, select } from 'redux-saga/effects';
import steem from '../../services/steem';
import sc2 from '../../services/sc2';
import showAuthDialog from '../../helpers/showAuthDialog';
import * as actions from '../actions';
import * as sagas from '../sagas';
import { getAuthUser } from '../../reducers';

describe('users sagas', () => {
  const username = 'sekhmet';

  test('getUser', () => {
    const payload = {
      entities: { users: { sekhmet: { id: 21, post_count: 2521 } } },
      result: 'sekhmet',
    };
    const action = { meta: { username } };
    const saga = sagas.getUser(action);

    let next = saga.next();
    expect(next.value).toEqual(call([steem, steem.getUser], username));

    next = saga.next(payload);
    expect(next.value).toEqual(put(actions.getUserSuccess(payload, username)));

    next = saga.next();
    expect(next.done).toBe(true);
  });

  it('should follow user when logged in', () => {
    const user = {
      name: 'hellosteem',
    };
    const payload = { success: true };
    const action = { meta: { username } };
    const saga = sagas.followUser(action);

    let next = saga.next();
    expect(next.value).toEqual(select(getAuthUser));

    next = saga.next(user);
    expect(next.value).toEqual(call([sc2, sc2.follow], user.name, username));

    next = saga.next(payload);
    expect(next.value).toEqual(put(actions.followUserSuccess(payload, username)));

    next = saga.next();
    expect(next.done).toBe(true);
  });

  it('should show login dialog when following and not logged in', () => {
    const user = null;
    const action = { meta: { username } };
    const saga = sagas.followUser(action);

    let next = saga.next();
    expect(next.value).toEqual(select(getAuthUser));

    next = saga.next(user);
    expect(next.value).toEqual(call(showAuthDialog));

    next = saga.next();
    expect(next.done).toBe(true);
  });

  it('should unfollow user when logged in', () => {
    const user = { name: 'hellosteem' };
    const payload = { success: true };
    const action = { meta: { username } };
    const saga = sagas.unfollowUser(action);

    let next = saga.next();
    expect(next.value).toEqual(select(getAuthUser));

    next = saga.next(user);
    expect(next.value).toEqual(call([sc2, sc2.unfollow], user.name, username));

    next = saga.next(payload);
    expect(next.value).toEqual(put(actions.unfollowUserSuccess(payload, username)));

    next = saga.next();
    expect(next.done).toBe(true);
  });

  it('should show login dialog when unfollowing and not logged in', () => {
    const user = null;
    const action = { meta: { username } };
    const saga = sagas.unfollowUser(action);

    let next = saga.next();
    expect(next.value).toEqual(select(getAuthUser));

    next = saga.next(user);
    expect(next.value).toEqual(call(showAuthDialog));

    next = saga.next();
    expect(next.done).toBe(true);
  });
});
