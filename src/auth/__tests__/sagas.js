import { call, put } from 'redux-saga/effects';
import * as sagas from '../sagas';
import * as actions from '../actions';
import sc2 from '../../services/sc2';

describe('auth sagas', () => {
  test('login saga', () => {
    const payload = {
      account: {
        name: 'sekhmet',
        post_count: 21,
      },
    };

    const saga = sagas.login();

    let next = saga.next();
    expect(next.value).toEqual(call([sc2, sc2.me]));

    next = saga.next(payload);
    expect(next.value).toEqual(put(actions.loginSuccess(payload.account)));
  });
});
