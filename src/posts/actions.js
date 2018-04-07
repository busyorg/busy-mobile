// @flow

import type { Action, PostResponse } from '../types';

export const getPost = (author: string, permlink: string, refresh: boolean = false): Action => ({
  type: '@posts/GET_POST_REQUEST',
  meta: { author, permlink, refresh },
});

export const getPostSuccess = (
  payload: PostResponse,
  author: string,
  permlink: string,
  refresh: boolean = false,
): Action => ({
  type: '@posts/GET_POST_SUCCESS',
  meta: { author, permlink, refresh },
  payload,
});

export const votePost = (postId: number, weight: number = 10000): Action => ({
  type: '@posts/VOTE_POST_REQUEST',
  meta: {
    postId,
    weight,
  },
});

export function votePostError(postId: number): Action {
  return {
    type: '@posts/VOTE_POST_ERROR',
    meta: {
      postId,
    },
  };
}
