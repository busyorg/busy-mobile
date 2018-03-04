import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import commentsSagas from './comments/sagas';
import feedSagas from './feed/sagas';
import postsSagas from './posts/sagas';
import usersSagas from './users/sagas';

export default function* rootSaga() {
  yield all([authSagas(), commentsSagas(), feedSagas(), postsSagas(), usersSagas()]);
}
