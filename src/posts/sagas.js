import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import steem from '../services/steem';
import sc2 from '../services/sc2';
import { VOTE_POST, getPost, getPostSuccess, GET_POST } from './actions';
import { getPostById, getAuthUser } from '../reducers';

export function* loadPost(action) {
  const { author, permlink, refresh } = action.meta;

  const payload = yield call([steem, steem.getPost], author, permlink);

  yield put(getPostSuccess(payload, author, permlink, refresh));
}

export function* votePost(action) {
  const { postId, weight } = action.meta;

  const user = yield select(getAuthUser);
  const post = yield select(getPostById, postId);

  if (!user) return;

  const { author, permlink } = post;
  yield call([sc2, sc2.vote], user.name, author, permlink, weight);

  yield put(getPost(author, permlink, true));
}

function* watchLoadPost() {
  yield takeEvery(GET_POST.REQUEST, loadPost);
}

function* watchVotePost() {
  yield takeEvery(VOTE_POST.REQUEST, votePost);
}

export default function* postsSagas() {
  yield all([watchLoadPost(), watchVotePost()]);
}
