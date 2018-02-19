import _ from 'lodash';
import { takeEvery, put, take, all, call } from 'redux-saga/effects';
import steem from './services/steem';
import { GET_FEED, GET_MORE_FEED } from './ducks/feed';
import { GET_USER } from './ducks/users';

function* feedFlow() {
  while (true) {
    yield take(GET_FEED.REQUEST);
    yield put({ type: GET_FEED.START });

    const result = yield call(steem.sendAsync, 'get_discussions_by_trending', [
      {
        limit: 10,
      },
    ]);

    yield put({ type: GET_FEED.SUCCESS, payload: result });
    let lastPost = result[result.length - 1];

    while (true) {
      yield take(GET_MORE_FEED.REQUEST);
      yield put({ type: GET_MORE_FEED.START });

      const moreResult = yield call(steem.sendAsync, 'get_discussions_by_trending', [
        {
          limit: 11,
          start_author: lastPost.author,
          start_permlink: lastPost.permlink,
        },
      ]);

      yield put({ type: GET_MORE_FEED.SUCCESS, payload: moreResult.slice(1) });
      lastPost = moreResult[moreResult.length - 1];
    }
  }
}

function* getUser(action) {
  yield put({ type: GET_USER.START });

  const result = yield call(steem.sendAsync, 'get_accounts', [[action.payload]]);

  const user = result[0];
  const metadata = _.attempt(JSON.parse, user.json_metadata);
  user.json_metadata = !_.isError(metadata) ? metadata : {};

  yield put({ type: GET_USER.SUCCESS, payload: result[0] });
}

function* watchGetUser() {
  yield takeEvery(GET_USER.REQUEST, getUser);
}

export default function* rootSaga() {
  yield all([feedFlow(), watchGetUser()]);
}
