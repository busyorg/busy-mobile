// @flow

import type { Action } from '../types';

export function getComments(postId: number): Action {
  return { type: '@comments/GET_COMMENTS_REQUEST', meta: { postId } };
}

export function getCommentsSuccess(payload: Object, postId: number): Action {
  return { type: '@comments/GET_COMMENTS_SUCCESS', meta: { postId }, payload };
}

export function refreshComments(postId: number): Action {
  return { type: '@comments/REFRESH_COMMENTS_REQUEST', meta: { postId } };
}

export function refreshCommentsSuccess(payload: Object, postId: number): Action {
  return { type: '@comments/REFRESH_COMMENTS_SUCCESS', meta: { postId }, payload };
}
