import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import steem from '../services/steem';
import sc2 from '../services/sc2';
import showAuthDialog from '../helpers/showAuthDialog';
import * as usersActions from './actions';
import { getAuthUser } from '../reducers';

export function* getUser(action) {
  const { username } = action.meta;
  const user = yield call([steem, steem.getUser], username);

  yield put(usersActions.getUserSuccess(user, username));
}

export function* followUser(action) {
  const { username } = action.meta;

  const authUser = yield select(getAuthUser);

  if (!authUser) {
    yield call(showAuthDialog);
    return;
  }

  const payload = yield call([sc2, sc2.follow], authUser.name, username);
  yield put(usersActions.followUserSuccess(payload, username));
}

export function* unfollowUser(action) {
  const { username } = action.meta;

  const authUser = yield select(getAuthUser);

  if (!authUser) {
    yield call(showAuthDialog);
    return;
  }

  const payload = yield call([sc2, sc2.unfollow], authUser.name, username);
  yield put(usersActions.unfollowUserSuccess(payload, username));
}

function* watchGetUser() {
  yield takeEvery('@users/GET_USER_REQUEST', getUser);
}

function* watchFollowUser() {
  yield takeEvery('@users/FOLLOW_USER_REQUEST', followUser);
}

function* watchUnfollowUser() {
  yield takeEvery('@users/UNFOLLOW_USER_REQUEST', followUser);
}

export default function* usersSagas() {
  yield all([watchGetUser(), watchFollowUser(), watchUnfollowUser()]);
}
