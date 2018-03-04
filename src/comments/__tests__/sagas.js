import { select, call, put } from 'redux-saga/effects';
import steem from '../../services/steem';
import { getCommentsSuccess } from '../actions';
import { getPostById } from '../../reducers';
import * as sagas from '../sagas';

describe('comments sagas', () => {
  test('loadComments', () => {
    const id = 5225;
    const author = 'sekhmet';
    const permlink = 'hello-world';
    const action = {
      meta: { postId: id },
    };
    const post = {
      id,
      author,
      permlink,
    };
    const payload = {
      entities: {
        comments: {
          522: { id: 522 },
        },
      },
      result: [522],
    };

    const saga = sagas.loadComments(action);

    let next = saga.next();
    expect(next.value).toEqual(select(getPostById, id));

    next = saga.next(post);
    expect(next.value).toEqual(call([steem, steem.getComments], author, permlink));

    next = saga.next(payload);
    expect(next.value).toEqual(put(getCommentsSuccess(payload, id)));

    next = saga.next(payload);
    expect(next.done).toBe(true);
  });
});
