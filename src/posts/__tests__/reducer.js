import * as actions from '../actions';
import * as feedActions from '../../feed/actions';
import * as commentsActions from '../../comments/actions';
import reducer, * as selectors from '../reducer';

describe('posts reducer', () => {
  const responseA = {
    entities: {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
    },
    result: [256, 257, 258],
  };

  const responseB = {
    entities: {
      posts: {
        259: { title: 'some post 4' },
        260: { title: 'some post 5' },
        261: { title: 'some post 6' },
      },
    },
    result: [259, 260, 261],
  };

  const responseC = {
    entities: {
      comments: {
        41: { title: 'some comment 1' },
        42: { title: 'some comment 2' },
        43: { title: 'some comment 3' },
      },
    },
    result: [41, 42, 43],
  };

  it('should return initial state', () => {
    const expected = { posts: {}, pendingVotes: [] };
    const actual = reducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it('should handle GET_FEED_SUCCESS', () => {
    const initialState = { posts: {}, pendingVotes: [] };
    const sortBy = 'trending';
    const action = feedActions.getFeedSuccess(responseA, sortBy);

    const expected = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
      pendingVotes: [],
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle GET_MORE_FEED_SUCCESS', () => {
    const initialState = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
      pendingVotes: [],
    };
    const sortBy = 'trending';
    const action = feedActions.getMoreFeedSuccess(responseB, sortBy);

    const expected = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
        259: { title: 'some post 4' },
        260: { title: 'some post 5' },
        261: { title: 'some post 6' },
      },
      pendingVotes: [],
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle REFRESH_FEED_SUCCESS', () => {
    const initialState = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
      pendingVotes: [],
    };
    const sortBy = 'trending';
    const action = feedActions.refreshFeedSuccess(responseB, sortBy);

    const expected = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
        259: { title: 'some post 4' },
        260: { title: 'some post 5' },
        261: { title: 'some post 6' },
      },
      pendingVotes: [],
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle VOTE_POST.REQUEST', () => {
    const initialState = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
      pendingVotes: [],
    };
    const postId = 525;
    const weight = 5200;
    const action = actions.votePost(postId, weight);

    const expected = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
      pendingVotes: [525],
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should handle GET_COMMENTS_SUCCESS', () => {
    const initialState = { posts: {}, pendingVotes: [] };
    const action = commentsActions.getCommentsSuccess(responseC, 256);

    const expected = {
      posts: {
        41: { title: 'some comment 1' },
        42: { title: 'some comment 2' },
        43: { title: 'some comment 3' },
      },
      pendingVotes: [],
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should remove pendingVote after GET_CONTENT.SUCCESS', () => {
    const initialState = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
      pendingVotes: [525],
    };
    const postId = 525;

    const payload = { entities: [{ postId: { id: postId } }], result: postId };
    const action = actions.getPostSuccess(payload, 'author', 'permlink', true);

    const expected = {
      posts: {
        256: { title: 'some post 1' },
        257: { title: 'some post 2' },
        258: { title: 'some post 3' },
      },
      pendingVotes: [],
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});

describe('posts selectors', () => {
  const state = {
    posts: {
      256: { title: 'some post 1' },
      257: { title: 'some post 2' },
      258: { title: 'some post 3' },
      259: { title: 'some post 4' },
      260: { title: 'some post 5' },
      261: { title: 'some post 6' },
    },
    pendingVotes: [260],
  };

  it('should get post by id', () => {
    const postId = 259;

    const expected = state.posts[postId];
    const actual = selectors.getPostById(state, postId);

    expect(actual).toEqual(expected);
  });

  it('should get is post pending vote', () => {
    const postId = 260;

    const actual = selectors.getIsPostPendingVote(state, postId);

    expect(actual).toBe(true);
  });
});
