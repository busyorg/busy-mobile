import { takeEvery, put, take, all, call } from 'redux-saga/effects';
import steem from './services/steem';
import { GET_FEED, GET_MORE_FEED } from './ducks/feed';
import { GET_USER } from './ducks/users';

function* feedFlow() {
  while (true) {
    yield take(GET_FEED.REQUEST);
    yield put({ type: GET_FEED.START });

    const result = yield call([steem, steem.getGlobal], 'trending');
    yield put({ type: GET_FEED.SUCCESS, payload: result });
    let lastPost = result[result.length - 1];

    while (true) {
      yield take(GET_MORE_FEED.REQUEST);
      yield put({ type: GET_MORE_FEED.START });

      const moreResult = yield call(
        [steem, steem.getMoreGlobal],
        'trending',
        lastPost.author,
        lastPost.permlink,
      );
      yield put({ type: GET_MORE_FEED.SUCCESS, payload: moreResult });
      lastPost = moreResult[moreResult.length - 1];
    }
  }
}

function* getUser(action) {
  yield put({ type: GET_USER.START });

  const user = yield call([steem, steem.getUser], action.payload);

  yield put({ type: GET_USER.SUCCESS, payload: user });
}

function* watchGetUser() {
  yield takeEvery(GET_USER.REQUEST, getUser);
}

export default function* rootSaga() {
  yield all([feedFlow(), watchGetUser()]);
}
