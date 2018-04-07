import * as actions from '../actions';

describe('posts actions', () => {
  it('should create VOTE_POST.REQUEST action', () => {
    const postId = 4525;
    const weight = 525;

    const expected = { type: '@posts/VOTE_POST_REQUEST', meta: { postId, weight } };
    const actual = actions.votePost(postId, weight);

    expect(actual).toEqual(expected);
  });

  it('should create VOTE_POST.REQUEST action with default weight', () => {
    const postId = 4525;

    const expected = { type: '@posts/VOTE_POST_REQUEST', meta: { postId, weight: 10000 } };
    const actual = actions.votePost(postId);

    expect(actual).toEqual(expected);
  });

  it('should create GET_POST_REQUEST action', () => {
    const author = 'sekhmet';
    const permlink = 'my-post';

    const expected = {
      type: '@posts/GET_POST_REQUEST',
      meta: { author, permlink, refresh: false },
    };
    const actual = actions.getPost(author, permlink);

    expect(actual).toEqual(expected);
  });

  it('should create GET_POST_SUCCESS action', () => {
    const author = 'sekhmet';
    const permlink = 'my-post';
    const payload = {
      id: 4214,
      body: 'Hello!',
    };

    const expected = {
      type: '@posts/GET_POST_SUCCESS',
      payload,
      meta: { author, permlink, refresh: false },
    };
    const actual = actions.getPostSuccess(payload, author, permlink);

    expect(actual).toEqual(expected);
  });
});
