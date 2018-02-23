import { all } from 'redux-saga/effects';
import feedSagas from './feed/sagas';
import usersSagas from './users/sagas';

export default function* rootSaga() {
  yield all([feedSagas(), usersSagas()]);
}
