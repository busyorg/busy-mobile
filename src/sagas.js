import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import feedSagas from './feed/sagas';
import usersSagas from './users/sagas';

export default function* rootSaga() {
  yield all([authSagas(), feedSagas(), usersSagas()]);
}
