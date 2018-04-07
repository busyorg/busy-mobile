// @flow

import type { Action, PostsResponse, SortBy } from '../types';

export const getFeed = (sortBy: SortBy, tag: string): Action => ({
  type: '@feed/GET_FEED_REQUEST',
  meta: { sortBy, tag },
});

export const getFeedSuccess = (payload: PostsResponse, sortBy: SortBy, tag: string): Action => ({
  type: '@feed/GET_FEED_SUCCESS',
  meta: { sortBy, tag },
  payload,
});

export const getMoreFeed = (sortBy: SortBy, tag: string): Action => ({
  type: '@feed/GET_MORE_FEED_REQUEST',
  meta: { sortBy, tag },
});

export const getMoreFeedSuccess = (
  payload: PostsResponse,
  sortBy: SortBy,
  tag: string,
): Action => ({
  type: '@feed/GET_MORE_FEED_SUCCESS',
  meta: { sortBy, tag },
  payload,
});

export const refreshFeed = (sortBy: SortBy, tag: string): Action => ({
  type: '@feed/REFRESH_FEED_REQUEST',
  meta: { sortBy, tag },
});

export const refreshFeedSuccess = (
  payload: PostsResponse,
  sortBy: SortBy,
  tag: string,
): Action => ({
  type: '@feed/REFRESH_FEED_SUCCESS',
  meta: { sortBy, tag },
  payload,
});
