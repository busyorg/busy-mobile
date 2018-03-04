import { call, put, select } from 'redux-saga/effects';
import steem from '../../services/steem';
import sc2 from '../../services/sc2';
import showAuthDialog from '../../helpers/showAuthDialog';
import { getAuthUser, getPostById } from '../../reducers';
import * as actions from '../actions';
import * as sagas from '../sagas';

describe('posts sagas', () => {
  test('loadPost', () => {
    const author = 'sekhmet';
    const permlink = 'hello-world';
    const refresh = false;
    const action = {
      meta: {
        author,
        permlink,
        refresh,
      },
    };

    const payload = {
      entities: [{ 52: {} }],
      result: 52,
    };

    const saga = sagas.loadPost(action);

    let next = saga.next();
    expect(next.value).toEqual(call([steem, steem.getPost], author, permlink));

    next = saga.next(payload);
    expect(next.value).toEqual(put(actions.getPostSuccess(payload, author, permlink, refresh)));

    next = saga.next();
    expect(next.done).toBe(true);
  });

  it('should votePost when logged in', () => {
    const postId = 5225;
    const author = 'sekhmet';
    const permlink = 'hello-world';
    const weight = 7500;
    const name = 'sekhmet';
    const user = {
      name,
    };
    const post = {
      author,
      permlink,
    };

    const action = { meta: { postId, weight } };

    const saga = sagas.votePost(action);

    let next = saga.next();
    expect(next.value).toEqual(select(getAuthUser));

    next = saga.next(user);
    expect(next.value).toEqual(select(getPostById, postId));

    next = saga.next(post);
    expect(next.value).toEqual(call([sc2, sc2.vote], user.name, author, permlink, weight));

    next = saga.next();
    expect(next.value).toEqual(put(actions.getPost(author, permlink, true)));

    next = saga.next();
    expect(next.done).toBe(true);
  });

  it('should show dialog when not logged in', () => {
    const postId = 5225;
    const author = 'sekhmet';
    const permlink = 'hello-world';
    const weight = 7500;
    const user = null;
    const post = { author, permlink };

    const action = { meta: { postId, weight } };

    const saga = sagas.votePost(action);

    let next = saga.next();
    expect(next.value).toEqual(select(getAuthUser));

    next = saga.next(user);
    expect(next.value).toEqual(select(getPostById, postId));

    next = saga.next(post);
    expect(next.value).toEqual(call(showAuthDialog));

    next = saga.next();
    expect(next.value).toEqual(put(actions.votePostError(postId)));

    next = saga.next();
    expect(next.done).toBe(true);
  });
});
