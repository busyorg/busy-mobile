import * as actions from '../actions';

describe('comments actions', () => {
  it('should create GET_COMMENTS_REQUEST action', () => {
    const postId = 251225;

    const expected = {
      type: '@comments/GET_COMMENTS_REQUEST',
      meta: { postId },
    };
    const actual = actions.getComments(postId);

    expect(actual).toEqual(expected);
  });

  it('should create GET_COMMETNS_SUCCESS action', () => {
    const postId = 27215;
    const payload = { entities: { comments: { 522: { id: 522 } } }, result: [522] };

    const expected = {
      type: '@comments/GET_COMMENTS_SUCCESS',
      meta: { postId },
      payload,
    };
    const actual = actions.getCommentsSuccess(payload, postId);

    expect(actual).toEqual(expected);
  });

  it('should create REFRESH_COMMENTS_REQUEST action', () => {
    const postId = 22;

    const expected = { type: '@comments/REFRESH_COMMENTS_REQUEST', meta: { postId } };
    const actual = actions.refreshComments(postId);

    expect(actual).toEqual(expected);
  });

  it('should create REFRESH_COMMETNS_SUCCESS action', () => {
    const postId = 22;
    const payload = { entities: { comments: { 522: { id: 522 } } }, result: [522] };

    const expected = { type: '@comments/REFRESH_COMMENTS_SUCCESS', meta: { postId }, payload };
    const actual = actions.refreshCommentsSuccess(payload, postId);

    expect(actual).toEqual(expected);
  });
});
