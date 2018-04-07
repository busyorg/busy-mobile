import { call, put, select } from 'redux-saga/effects';
import steem from '../../services/steem';
import * as actions from '../actions';
import { getLastPostId, getPostById } from '../../reducers';
import * as sagas from '../sagas';

describe('feed sagas', () => {
  describe('actions', () => {
    const payload = {
      entities: {
        posts: {
          11: { title: 'post 1' },
          12: { title: 'post 2' },
          13: { title: 'post 3' },
        },
      },
      result: [11, 12, 13],
    };
    const lastPostId = 256;
    const lastPost = {
      author: 'sekhmet',
      permlink: 'busy-mobile',
    };

    test('loadFeed saga - global', () => {
      const sortBy = 'trending';
      const tag = undefined;

      const action = {
        meta: {
          sortBy,
          tag,
        },
      };

      const saga = sagas.loadFeed(action);

      let next = saga.next();
      expect(next.value).toEqual(call([steem, steem.getGlobal], sortBy));

      next = saga.next(payload);
      expect(next.value).toEqual(put(actions.getFeedSuccess(payload, sortBy, tag)));

      next = saga.next();
      expect(next.done).toBe(true);
    });

    test('loadFeed saga - tag', () => {
      const sortBy = 'created';
      const tag = 'busy';

      const action = {
        meta: {
          sortBy,
          tag,
        },
      };

      const saga = sagas.loadFeed(action);

      let next = saga.next();
      expect(next.value).toEqual(call([steem, steem.getTag], tag, sortBy));

      next = saga.next(payload);
      expect(next.value).toEqual(put(actions.getFeedSuccess(payload, sortBy, tag)));

      next = saga.next();
      expect(next.done).toBe(true);
    });

    test('loadMoreFeed saga - global', () => {
      const sortBy = 'trending';
      const tag = undefined;

      const action = {
        meta: {
          sortBy,
          tag,
        },
      };

      const saga = sagas.loadMoreFeed(action);

      let next = saga.next();
      expect(next.value).toEqual(select(getLastPostId, sortBy, tag));

      next = saga.next(lastPostId);
      expect(next.value).toEqual(select(getPostById, lastPostId));

      next = saga.next(lastPost);
      expect(next.value).toEqual(
        call([steem, steem.getMoreGlobal], sortBy, lastPost.author, lastPost.permlink),
      );

      next = saga.next(payload);
      expect(next.value).toEqual(put(actions.getMoreFeedSuccess(payload, sortBy, tag)));

      next = saga.next();
      expect(next.done).toBe(true);
    });

    test('loadMoreFeed saga - tag', () => {
      const sortBy = 'created';
      const tag = 'busy';

      const action = {
        meta: {
          sortBy,
          tag,
        },
      };

      const saga = sagas.loadMoreFeed(action);

      let next = saga.next();
      expect(next.value).toEqual(select(getLastPostId, sortBy, tag));

      next = saga.next(lastPostId);
      expect(next.value).toEqual(select(getPostById, lastPostId));

      next = saga.next(lastPost);
      expect(next.value).toEqual(
        call([steem, steem.getMoreTag], tag, sortBy, lastPost.author, lastPost.permlink),
      );

      next = saga.next(payload);
      expect(next.value).toEqual(put(actions.getMoreFeedSuccess(payload, sortBy, tag)));

      next = saga.next();
      expect(next.done).toBe(true);
    });

    test('refreshFeed saga - global', () => {
      const sortBy = 'trending';
      const tag = undefined;

      const action = {
        meta: {
          sortBy,
          tag,
        },
      };

      const saga = sagas.refreshFeed(action);

      let next = saga.next();
      expect(next.value).toEqual(call([steem, steem.getGlobal], sortBy));

      next = saga.next(payload);
      expect(next.value).toEqual(put(actions.refreshFeedSuccess(payload, sortBy, tag)));

      next = saga.next();
      expect(next.done).toBe(true);
    });

    test('refreshFeed saga - tag', () => {
      const sortBy = 'created';
      const tag = 'busy';

      const action = {
        meta: {
          sortBy,
          tag,
        },
      };

      const saga = sagas.refreshFeed(action);

      let next = saga.next();
      expect(next.value).toEqual(call([steem, steem.getTag], tag, sortBy));

      next = saga.next(payload);
      expect(next.value).toEqual(put(actions.refreshFeedSuccess(payload, sortBy, tag)));

      next = saga.next();
      expect(next.done).toBe(true);
    });
  });
});
