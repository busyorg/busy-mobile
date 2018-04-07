// @flow

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

export type AsyncType = {
  ACTION: string,
  REQUEST: string,
  SUCCESS: string,
  ERROR: string,
};

type AuthAction =
  | {|
      type: '@auth/LOGIN_REQUEST',
    |}
  | {|
      type: '@auth/LOGIN_SUCCESS',
      payload: Object,
    |}
  | {|
      type: '@auth/LOGOUT',
    |};

type CommentsAction =
  | {|
      type: '@comments/GET_COMMENTS_REQUEST',
      meta: {
        postId: number,
      },
    |}
  | {|
      type: '@comments/GET_COMMENTS_SUCCESS',
      payload: Object,
      meta: {
        postId: number,
      },
    |}
  | {|
      type: '@comments/REFRESH_COMMENTS_REQUEST',
      meta: {
        postId: number,
      },
    |}
  | {|
      type: '@comments/REFRESH_COMMENTS_SUCCESS',
      payload: Object,
      meta: {
        postId: number,
      },
    |};

type FeedAction =
  | {|
      type: '@feed/GET_FEED_REQUEST',
      meta: {
        sortBy: SortBy,
        tag: string,
      },
    |}
  | {|
      type: '@feed/GET_FEED_SUCCESS',
      payload: Object,
      meta: {
        sortBy: SortBy,
        tag: string,
      },
    |}
  | {|
      type: '@feed/GET_MORE_FEED_REQUEST',
      meta: {
        sortBy: SortBy,
        tag: string,
      },
    |}
  | {|
      type: '@feed/GET_MORE_FEED_SUCCESS',
      payload: Object,
      meta: {
        sortBy: SortBy,
        tag: string,
      },
    |}
  | {|
      type: '@feed/REFRESH_FEED_REQUEST',
      meta: {
        sortBy: SortBy,
        tag: string,
      },
    |}
  | {|
      type: '@feed/REFRESH_FEED_SUCCESS',
      payload: Object,
      meta: {
        sortBy: SortBy,
        tag: string,
      },
    |};

type PostsAction =
  | {|
      type: '@posts/GET_POST_REQUEST',
      meta: {
        author: string,
        permlink: string,
        refresh: boolean,
      },
    |}
  | {|
      type: '@posts/GET_POST_SUCCESS',
      payload: any,
      meta: {
        author: string,
        permlink: string,
        refresh: boolean,
      },
    |}
  | {|
      type: '@posts/VOTE_POST_ERROR',
      meta: {
        postId: number,
      },
    |}
  | {|
      type: '@posts/VOTE_POST_REQUEST',
      meta: {
        postId: number,
        weight: number,
      },
    |};

type UsersAction =
  | {
      type: '@users/GET_USER_REQUEST',
      meta: {
        username: string,
      },
    }
  | {
      type: '@users/GET_USER_SUCCESS',
      payload: Object,
      meta: {
        username: string,
      },
    }
  | {
      type: '@users/FOLLOW_USER_REQUEST',
      meta: {
        username: string,
      },
    }
  | {
      type: '@users/FOLLOW_USER_SUCCESS',
      payload: Object,
      meta: {
        username: string,
      },
    }
  | {
      type: '@users/UNFOLLOW_USER_REQUEST',
      meta: {
        username: string,
      },
    }
  | {
      type: '@users/UNFOLLOW_USER_SUCCESS',
      payload: Object,
      meta: {
        username: string,
      },
    };

export type Action = AuthAction | CommentsAction | FeedAction | PostsAction | UsersAction;
