import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import steem from './services/steem';
import { GET_FEED, GET_MORE_FEED } from './ducks/feed';
import { getLastPostId, getPostById } from './ducks';

export function* getFeed() {
  yield put({ type: GET_FEED.START });
  const result = yield call(steem.sendAsync, 'get_discussions_by_trending', [
    {
      limit: 10,
    },
  ]);
  yield put({ type: GET_FEED.SUCCESS, payload: result });
}

export function* getMoreFeed() {
  yield put({ type: GET_MORE_FEED.START });

  const lastPostId = yield select(getLastPostId);
  const lastPost = yield select(getPostById, lastPostId);

  const result = yield call(steem.sendAsync, 'get_discussions_by_trending', [
    {
      limit: 11,
      start_author: lastPost.author,
      start_permlink: lastPost.permlink,
    },
  ]);
  yield put({ type: GET_MORE_FEED.SUCCESS, payload: result.slice(1) });
}

function* watchGetFeed() {
  yield takeEvery(GET_FEED.REQUEST, getFeed);
}

function* watchGetMoreFeed() {
  yield takeEvery(GET_MORE_FEED.REQUEST, getMoreFeed);
}

export default function* rootSaga() {
  yield all([watchGetFeed(), watchGetMoreFeed()]);
}
