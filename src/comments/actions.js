import createAsyncType from '../helpers/createAsyncType';

export const GET_COMMENTS = createAsyncType('@comments/GET_COMMENTS');

export function getComments(postId) {
  return { type: GET_COMMENTS.REQUEST, meta: { postId } };
}

export function getCommentsSuccess(payload, postId) {
  return {
    type: GET_COMMENTS.SUCCESS,
    meta: { postId },
    payload,
  };
}
