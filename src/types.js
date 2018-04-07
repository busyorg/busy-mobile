// @flow

export type AsyncType = {
  ACTION: string,
  REQUEST: string,
  SUCCESS: string,
  ERROR: string,
};

export type Action = {
  type: string,
  payload?: Object,
  error?: Object,
  meta?: Object,
};

export type Post = {
  id: number,
  author: string,
  created: string,
  title: string,
  htmlBody: string,
  tags: Array<string>,
  upvoteCount: number,
  commentCount: number,
  payout: number,
};

export type SortBy = 'trending' | 'created' | 'active' | 'hot' | 'trending';
