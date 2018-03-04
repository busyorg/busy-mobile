import * as actions from '../actions';
import reducer, * as selectors from '../reducer';

describe('users reducer', () => {
  const responseA = {
    entities: {
      users: {
        sekhmet: { id: 21, post_count: 2521 },
      },
    },
    result: 'sekhmet',
  };

  const responseB = {
    entities: {
      users: {
        jm90mm: { id: 42, post_count: 422 },
      },
    },
    result: 'jm90mm',
  };

  it('should return intial state', () => {
    const expected = {
      loading: false,
      users: {},
    };
    const actual = reducer(undefined, {});

    expect(actual).toEqual(expected);
  });

  it('should handle GET_USER_REQUEST', () => {
    const expected = {
      loading: true,
      users: {},
    };
    const actual = reducer(undefined, actions.getUser('sekhmet'));

    expect(actual).toEqual(expected);
  });

  it('should handle GET_USER_SUCCESS', () => {
    const initialState = {
      loading: true,
      users: {},
    };

    const expected = {
      loading: false,
      users: {
        sekhmet: { id: 21, post_count: 2521 },
      },
    };
    const actual = reducer(initialState, actions.getUserSuccess(responseA, 'sekhmet'));

    expect(actual).toEqual(expected);
  });

  it('should handle GET_USER_SUCCESS and load more users', () => {
    const initialState = {
      loading: true,
      users: { sekhmet: { id: 21, post_count: 2521 } },
    };

    const expected = {
      loading: false,
      users: {
        sekhmet: { id: 21, post_count: 2521 },
        jm90mm: { id: 42, post_count: 422 },
      },
    };
    const actual = reducer(initialState, actions.getUserSuccess(responseB, 'jm90mm'));

    expect(actual).toEqual(expected);
  });
});

describe('feed selectors', () => {
  const state = {
    loading: true,
    users: {
      sekhmet: {
        id: 21,
        post_count: 2521,
        follower_count: 400,
        following_count: 32,
        json_metadata: {
          profile: {
            name: 'Sekhmet',
            about: 'Hey!',
          },
        },
      },
      jm90mm: {
        id: 42,
        post_count: 422,
        follower_count: 224,
        following_count: 24,
        json_metadata: {
          profile: {
            name: 'JM Myers',
            about: 'Ho!',
          },
        },
      },
    },
  };

  it('should get users loading', () => {
    const expected = state.loading;
    const actual = selectors.getUsersLoading(state);

    expect(actual).toBe(expected);
  });

  it('should get user by name', () => {
    const username = 'jm90mm';

    const expected = state.users[username];
    const actual = selectors.getUserByName(state, username);

    expect(actual).toEqual(expected);
  });

  it('should get user post count', () => {
    const username = 'sekhmet';

    const expected = state.users[username].post_count;
    const actual = selectors.getUserPostCount(state, username);

    expect(actual).toBe(expected);
  });

  it('should get user follower count', () => {
    const username = 'jm90mm';

    const expected = state.users[username].follower_count;
    const actual = selectors.getUserFollowerCount(state, username);

    expect(actual).toBe(expected);
  });

  it('should get user following count', () => {
    const username = 'sekhmet';

    const expected = state.users[username].following_count;
    const actual = selectors.getUserFollowingCount(state, username);

    expect(actual).toBe(expected);
  });

  it('should get user metadata', () => {
    const username = 'jm90mm';

    const expected = state.users[username].json_metadata;
    const actual = selectors.getUserMetadata(state, username);

    expect(actual).toBe(expected);
  });

  it('should get user display name', () => {
    const username = 'sekhmet';

    const expected = state.users[username].json_metadata.profile.name;
    const actual = selectors.getUserDisplayName(state, username);

    expect(actual).toBe(expected);
  });

  it('should get user about', () => {
    const username = 'jm90mm';

    const expected = state.users[username].json_metadata.profile.about;
    const actual = selectors.getUserAbout(state, username);

    expect(actual).toBe(expected);
  });
});
