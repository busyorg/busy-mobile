// @flow

import createAsyncType from '../helpers/createAsyncType';

import type { Action, Post } from '../types';

export const GET_POST = createAsyncType('@posts/GET_POST');

export const VOTE_POST = createAsyncType('@posts/VOTE_POST');

export const getPost = (author: string, permlink: string, refresh: boolean = false): Action => ({
  type: '@posts/GET_POST_REQUEST',
  meta: { author, permlink, refresh },
});

export const getPostSuccess = (
  payload: Post,
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
