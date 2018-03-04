import * as actions from '../actions';

describe('comments actions', () => {
  it('should create GET_COMMENTS_REQUEST action', () => {
    const postId = 251225;

    const expected = {
      type: actions.GET_COMMENTS.REQUEST,
      meta: { postId },
    };
    const actual = actions.getComments(postId);

    expect(actual).toEqual(expected);
  });

  it('should create GET_COMMETNS_SUCCESS action', () => {
    const postId = 27215;
    const payload = { entities: { comments: { 522: { id: 522 } } }, result: [522] };

    const expected = {
      type: actions.GET_COMMENTS.SUCCESS,
      meta: { postId },
      payload,
    };
    const actual = actions.getCommentsSuccess(payload, postId);

    expect(actual).toEqual(expected);
  });
});
