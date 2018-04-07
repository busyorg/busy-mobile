// @flow

import type { Action, SortBy } from '../types';

export const getFeed = (sortBy: SortBy, tag: string): Action => ({
  type: '@feed/GET_FEED_REQUEST',
  meta: { sortBy, tag },
});

export const getFeedSuccess = (payload: Object, sortBy: SortBy, tag: string): Action => ({
  type: '@feed/GET_FEED_SUCCESS',
  meta: { sortBy, tag },
  payload,
});

export const getMoreFeed = (sortBy: SortBy, tag: string): Action => ({
  type: '@feed/GET_MORE_FEED_REQUEST',
  meta: { sortBy, tag },
});

export const getMoreFeedSuccess = (payload: Object, sortBy: SortBy, tag: string): Action => ({
  type: '@feed/GET_MORE_FEED_SUCCESS',
  meta: { sortBy, tag },
  payload,
});

export const refreshFeed = (sortBy: SortBy, tag: string): Action => ({
  type: '@feed/REFRESH_FEED_REQUEST',
  meta: { sortBy, tag },
});

export const refreshFeedSuccess = (payload: Object, sortBy: SortBy, tag: string): Action => ({
  type: '@feed/REFRESH_FEED_SUCCESS',
  meta: { sortBy, tag },
  payload,
});
