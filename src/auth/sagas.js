import { takeEvery, all, call, put } from 'redux-saga/effects';
import sc2 from '../services/sc2';
import * as authActions from './actions';

export function* login() {
  const result = yield call([sc2, sc2.me]);

  yield put(authActions.loginSuccess(result.account));
}

function* watchLogin() {
  yield takeEvery(authActions.LOGIN.REQUEST, login);
}

export default function* authSagas() {
  yield all([watchLogin()]);
}
