import createAsyncType from '../helpers/createAsyncType';

export const GET_COMMENTS = createAsyncType('@comments/GET_COMMENTS');
export const REFRESH_COMMENTS = createAsyncType('@comments/REFRESH_COMMENTS');

export function getComments(postId) {
  return { type: GET_COMMENTS.REQUEST, meta: { postId } };
}

export function getCommentsSuccess(payload, postId) {
  return { type: GET_COMMENTS.SUCCESS, meta: { postId }, payload };
}

export function refreshComments(postId) {
  return { type: REFRESH_COMMENTS.REQUEST, meta: { postId } };
}

export function refreshCommentsSuccess(payload, postId) {
  return { type: REFRESH_COMMENTS.SUCCESS, meta: { postId }, payload };
}
