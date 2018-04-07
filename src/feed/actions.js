// @flow

import createAsyncType from '../helpers/createAsyncType';

import type { Action, SortBy } from '../types';

export const GET_FEED = createAsyncType('@feed/GET_FEED');
export const GET_MORE_FEED = createAsyncType('@feed/GET_MORE_FEED');
export const REFRESH_FEED = createAsyncType('@feed/REFRESH_FEED');

export const getFeed = (sortBy: SortBy, tag: string): Action => ({
  type: GET_FEED.REQUEST,
  meta: { sortBy, tag },
});

export const getFeedSuccess = (payload: Object, sortBy: SortBy, tag: string): Action => ({
  type: GET_FEED.SUCCESS,
  meta: { sortBy, tag },
  payload,
});

export const getMoreFeed = (sortBy: SortBy, tag: string): Action => ({
  type: GET_MORE_FEED.REQUEST,
  meta: { sortBy, tag },
});

export const getMoreFeedSuccess = (payload: Object, sortBy: SortBy, tag: string): Action => ({
  type: GET_MORE_FEED.SUCCESS,
  meta: { sortBy, tag },
  payload,
});

export const refreshFeed = (sortBy: SortBy, tag: string): Action => ({
  type: REFRESH_FEED.REQUEST,
  meta: { sortBy, tag },
});

export const refreshFeedSuccess = (payload: Object, sortBy: SortBy, tag: string): Action => ({
  type: REFRESH_FEED.SUCCESS,
  meta: { sortBy, tag },
  payload,
});
