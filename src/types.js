// @flow

export type Post = {
  id: number,
  author: string,
  created: string,
  title: string,
  htmlBody: string,
  tags: Array<string>,
  upvoted: boolean,
  pendingVote: boolean,
  upvoteCount: number,
  commentCount: number,
  payout: number,
};

export type SortBy = 'trending' | 'created' | 'active' | 'hot' | 'trending';
