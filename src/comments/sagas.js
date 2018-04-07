import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import steem from '../services/steem';
import { getCommentsSuccess, refreshCommentsSuccess } from './actions';
import { getPostById } from '../reducers';

export function* loadComments(action) {
  const { postId } = action.meta;

  const post = yield select(getPostById, postId);

  const { author, permlink } = post;

  const payload = yield call([steem, steem.getComments], author, permlink);

  yield put(getCommentsSuccess(payload, postId));
}

export function* refreshComments(action) {
  const { postId } = action.meta;

  const post = yield select(getPostById, postId);

  const { author, permlink } = post;

  const payload = yield call([steem, steem.getComments], author, permlink);

  yield put(refreshCommentsSuccess(payload, postId));
}

function* watchLoadComments() {
  yield takeEvery('@comments/GET_COMMENTS_REQUEST', loadComments);
}

function* watchRefreshComments() {
  yield takeEvery('@comments/REFRESH_COMMENTS_REQUEST', refreshComments);
}

export default function* commentsSagas() {
  yield all([watchLoadComments(), watchRefreshComments()]);
}
