import * as fromActions from '../actions';

describe('feed actions', () => {
  it('should create get feed request action', () => {
    const sortBy = 'active';
    const tag = 'busy';

    const expected = { type: fromActions.GET_FEED.REQUEST, meta: { sortBy, tag } };

    const actual = fromActions.getFeed(sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create get feed success action', () => {
    const sortBy = 'created';
    const tag = 'programming';
    const payload = [{ id: 42 }];

    const expected = { type: fromActions.GET_FEED.SUCCESS, meta: { sortBy, tag }, payload };

    const actual = fromActions.getFeedSuccess(payload, sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create get more feed request action', () => {
    const sortBy = 'trending';
    const tag = 'steem';

    const expected = { type: fromActions.GET_MORE_FEED.REQUEST, meta: { sortBy, tag } };

    const actual = fromActions.getMoreFeed(sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create get more feed success action', () => {
    const sortBy = 'created';
    const tag = 'steemit';
    const payload = [{ id: 21 }];

    const expected = { type: fromActions.GET_MORE_FEED.SUCCESS, meta: { sortBy, tag }, payload };

    const actual = fromActions.getMoreFeedSuccess(payload, sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create refresh feed request action', () => {
    const sortBy = 'trending';
    const tag = 'steem';

    const expected = { type: fromActions.REFRESH_FEED.REQUEST, meta: { sortBy, tag } };

    const actual = fromActions.refreshFeed(sortBy, tag);

    expect(actual).toEqual(expected);
  });

  it('should create refresh feed success action', () => {
    const sortBy = 'created';
    const tag = 'steemit';
    const payload = [{ id: 21 }];

    const expected = { type: fromActions.REFRESH_FEED.SUCCESS, meta: { sortBy, tag }, payload };

    const actual = fromActions.refreshFeedSuccess(payload, sortBy, tag);

    expect(actual).toEqual(expected);
  });
});
