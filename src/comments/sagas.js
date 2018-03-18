import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import steem from '../services/steem';
import {
  GET_COMMENTS,
  REFRESH_COMMENTS,
  getCommentsSuccess,
  refreshCommentsSuccess,
} from './actions';
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
  yield takeEvery(GET_COMMENTS.REQUEST, loadComments);
}

function* watchRefreshComments() {
  yield takeEvery(REFRESH_COMMENTS.REQUEST, refreshComments);
}

export default function* commentsSagas() {
  yield all([watchLoadComments(), watchRefreshComments()]);
}
