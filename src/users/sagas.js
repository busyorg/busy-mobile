import { all, takeEvery, put, call } from 'redux-saga/effects';
import steem from '../services/steem';
import { GET_USER } from './actions';

function* getUser(action) {
  const user = yield call([steem, steem.getUser], action.payload);

  yield put({ type: GET_USER.SUCCESS, payload: user });
}

function* watchGetUser() {
  yield takeEvery(GET_USER.REQUEST, getUser);
}

export default function* usersSagas() {
  yield all([watchGetUser()]);
}
