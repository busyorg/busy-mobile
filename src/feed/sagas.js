import { all, put, take, call, fork, select } from 'redux-saga/effects';
import steem from '../services/steem';
import { GET_FEED, GET_MORE_FEED, REFRESH_FEED } from './actions';
import { getLastPostId, getPostById } from '../reducers';

function* loadFeed(sortBy, tag) {
  let result;
  if (tag) {
    result = yield call([steem, steem.getTag], tag, sortBy);
  } else {
    result = yield call([steem, steem.getGlobal], sortBy);
  }

  yield put({ type: GET_FEED.SUCCESS, payload: result, meta: { sortBy, tag } });
}

function* loadMoreFeed(sortBy, tag) {
  const postId = yield select(getLastPostId, sortBy, tag);
  const lastPost = yield select(getPostById, postId);

  let result;
  if (tag) {
    result = yield call([steem, steem.getMoreTag], tag, sortBy, lastPost.author, lastPost.permlink);
  } else {
    result = yield call([steem, steem.getMoreGlobal], sortBy, lastPost.author, lastPost.permlink);
  }

  yield put({ type: GET_MORE_FEED.SUCCESS, payload: result, meta: { sortBy, tag } });
}

function* refreshFeed(sortBy, tag) {
  let result;
  if (tag) {
    result = yield call([steem, steem.getTag], tag, sortBy);
  } else {
    result = yield call([steem, steem.getGlobal], sortBy);
  }

  yield put({ type: REFRESH_FEED.SUCCESS, payload: result, meta: { sortBy, tag } });
}

function* watchLoadFeed() {
  while (true) {
    const { meta } = yield take(GET_FEED.REQUEST);
    const { sortBy, tag } = meta;
    yield fork(loadFeed, sortBy, tag);
  }
}

function* watchLoadMoreFeed() {
  while (true) {
    const { meta } = yield take(GET_MORE_FEED.REQUEST);
    const { sortBy, tag } = meta;
    yield fork(loadMoreFeed, sortBy, tag);
  }
}

function* watchRefreshFeed() {
  while (true) {
    const { meta } = yield take(REFRESH_FEED.REQUEST);
    const { sortBy, tag } = meta;
    yield fork(refreshFeed, sortBy, tag);
  }
}

export default function* feedSagas() {
  yield all([watchLoadFeed(), watchLoadMoreFeed(), watchRefreshFeed()]);
}
