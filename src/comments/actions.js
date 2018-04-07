// @flow

import type { Action, PostsResponse } from '../types';

export function getComments(postId: number): Action {
  return { type: '@comments/GET_COMMENTS_REQUEST', meta: { postId } };
}

export function getCommentsSuccess(payload: PostsResponse, postId: number): Action {
  return { type: '@comments/GET_COMMENTS_SUCCESS', meta: { postId }, payload };
}

export function refreshComments(postId: number): Action {
  return { type: '@comments/REFRESH_COMMENTS_REQUEST', meta: { postId } };
}

export function refreshCommentsSuccess(payload: PostsResponse, postId: number): Action {
  return { type: '@comments/REFRESH_COMMENTS_SUCCESS', meta: { postId }, payload };
}
