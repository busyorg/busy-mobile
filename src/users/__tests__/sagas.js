import { call, put } from 'redux-saga/effects';
import steem from '../../services/steem';
import * as actions from '../actions';
import * as sagas from '../sagas';

describe('users sagas', () => {
  const username = 'sekhmet';
  const action = {
    meta: {
      username,
    },
  };

  const payload = {
    entities: {
      users: {
        sekhmet: { id: 21, post_count: 2521 },
      },
    },
    result: 'sekhmet',
  };

  test('getUser', () => {
    const saga = sagas.getUser(action);

    let next = saga.next();
    expect(next.value).toEqual(call([steem, steem.getUser], username));

    next = saga.next(payload);
    expect(next.value).toEqual(put(actions.getUserSuccess(payload, username)));

    next = saga.next();
    expect(next.done).toBe(true);
  });
});
