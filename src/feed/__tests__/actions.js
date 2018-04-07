import * as actions from '../actions';

describe('feed actions', () => {
  it('should create get feed request action', () => {
    const sortBy = 'active';
    const tag = 'busy';

    const expected = { type: '@feed/GET_FEED_REQUEST', meta: { sortBy, tag } };

    const actual = actions.getFeed(sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create get feed success action', () => {
    const sortBy = 'created';
    const tag = 'programming';
    const payload = [{ id: 42 }];

    const expected = { type: '@feed/GET_FEED_SUCCESS', meta: { sortBy, tag }, payload };

    const actual = actions.getFeedSuccess(payload, sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create get more feed request action', () => {
    const sortBy = 'trending';
    const tag = 'steem';

    const expected = { type: '@feed/GET_MORE_FEED_REQUEST', meta: { sortBy, tag } };

    const actual = actions.getMoreFeed(sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create get more feed success action', () => {
    const sortBy = 'created';
    const tag = 'steemit';
    const payload = [{ id: 21 }];

    const expected = { type: '@feed/GET_MORE_FEED_SUCCESS', meta: { sortBy, tag }, payload };

    const actual = actions.getMoreFeedSuccess(payload, sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create refresh feed request action', () => {
    const sortBy = 'trending';
    const tag = 'steem';

    const expected = { type: '@feed/REFRESH_FEED_REQUEST', meta: { sortBy, tag } };

    const actual = actions.refreshFeed(sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create refresh feed success action', () => {
    const sortBy = 'created';
    const tag = 'steemit';
    const payload = [{ id: 21 }];

    const expected = { type: '@feed/REFRESH_FEED_SUCCESS', meta: { sortBy, tag }, payload };

    const actual = actions.refreshFeedSuccess(payload, sortBy, tag);

    expect(actual).toEqual(expected);
  });
});
