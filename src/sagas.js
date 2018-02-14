import { delay } from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';

function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' });
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
  yield all([watchIncrementAsync()]);
}
