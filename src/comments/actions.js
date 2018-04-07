// @flow

import createAsyncType from '../helpers/createAsyncType';

import type { Action } from '../types';

export const GET_COMMENTS = createAsyncType('@comments/GET_COMMENTS');
export const REFRESH_COMMENTS = createAsyncType('@comments/REFRESH_COMMENTS');

export function getComments(postId: number): Action {
  return { type: GET_COMMENTS.REQUEST, meta: { postId } };
}

export function getCommentsSuccess(payload: Object, postId: number): Action {
  return { type: GET_COMMENTS.SUCCESS, meta: { postId }, payload };
}

export function refreshComments(postId: number): Action {
  return { type: REFRESH_COMMENTS.REQUEST, meta: { postId } };
}

export function refreshCommentsSuccess(payload: Object, postId: number): Action {
  return { type: REFRESH_COMMENTS.SUCCESS, meta: { postId }, payload };
}
