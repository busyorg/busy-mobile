import { all, put, takeEvery, call, select } from 'redux-saga/effects';
import steem from '../services/steem';
import * as feedActions from './actions';
import { getLastPostId, getPostById } from '../reducers';

export function* loadFeed({ meta }) {
  const { sortBy, tag } = meta;

  let result;
  if (tag) {
    result = yield call([steem, steem.getTag], tag, sortBy);
  } else {
    result = yield call([steem, steem.getGlobal], sortBy);
  }

  yield put(feedActions.getFeedSuccess(result, sortBy, tag));
}

export function* loadMoreFeed({ meta }) {
  const { sortBy, tag } = meta;

  const postId = yield select(getLastPostId, sortBy, tag);
  const lastPost = yield select(getPostById, postId);

  let result;
  if (tag) {
    result = yield call([steem, steem.getMoreTag], tag, sortBy, lastPost.author, lastPost.permlink);
  } else {
    result = yield call([steem, steem.getMoreGlobal], sortBy, lastPost.author, lastPost.permlink);
  }

  yield put(feedActions.getMoreFeedSuccess(result, sortBy, tag));
}

export function* refreshFeed({ meta }) {
  const { sortBy, tag } = meta;

  let result;
  if (tag) {
    result = yield call([steem, steem.getTag], tag, sortBy);
  } else {
    result = yield call([steem, steem.getGlobal], sortBy);
  }

  yield put(feedActions.refreshFeedSuccess(result, sortBy, tag));
}

export function* watchLoadFeed() {
  yield takeEvery('@feed/GET_FEED_REQUEST', loadFeed);
}

export function* watchLoadMoreFeed() {
  yield takeEvery('@feed/GET_MORE_FEED_REQUEST', loadMoreFeed);
}

export function* watchRefreshFeed() {
  yield takeEvery('@feed/REFRESH_FEED_REQUEST', refreshFeed);
}

export default function* feedSagas() {
  yield all([watchLoadFeed(), watchLoadMoreFeed(), watchRefreshFeed()]);
}
