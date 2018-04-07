import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import steem from '../services/steem';
import sc2 from '../services/sc2';
import showAuthDialog from '../helpers/showAuthDialog';
import { getPost, getPostSuccess, votePostError } from './actions';
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

  if (!user) {
    yield call(showAuthDialog);
    yield put(votePostError(postId));
    return;
  }

  const { author, permlink } = post;
  yield call([sc2, sc2.vote], user.name, author, permlink, weight);

  yield put(getPost(author, permlink, true));
}

function* watchLoadPost() {
  yield takeEvery('@posts/GET_POST_REQUEST', loadPost);
}

function* watchVotePost() {
  yield takeEvery('@posts/VOTE_POST_REQUEST', votePost);
}

export default function* postsSagas() {
  yield all([watchLoadPost(), watchVotePost()]);
}
