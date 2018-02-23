import { all, takeEvery, put, call } from 'redux-saga/effects';
import steem from '../services/steem';
import * as usersActions from './actions';

function* getUser(action) {
  const { username } = action.meta;
  const user = yield call([steem, steem.getUser], username);

  yield put(usersActions.getUserSuccess(user, username));
}

function* watchGetUser() {
  yield takeEvery(usersActions.GET_USER.REQUEST, getUser);
}

export default function* usersSagas() {
  yield all([watchGetUser()]);
}
