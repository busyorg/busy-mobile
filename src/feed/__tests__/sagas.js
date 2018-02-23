import { call, put, select, take, fork } from 'redux-saga/effects';
import * as sagas from '../sagas';
import * as actions from '../actions';
import { getLastPostId, getPostById } from '../../reducers';
import steem from '../../services/steem';

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

      const saga = sagas.loadFeed(sortBy, tag);

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

      const saga = sagas.loadFeed(sortBy, tag);

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

      const saga = sagas.loadMoreFeed(sortBy);

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

      const saga = sagas.loadMoreFeed(sortBy, tag);

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

      const saga = sagas.refreshFeed(sortBy, tag);

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

      const saga = sagas.refreshFeed(sortBy, tag);

      let next = saga.next();
      expect(next.value).toEqual(call([steem, steem.getTag], tag, sortBy));

      next = saga.next(payload);
      expect(next.value).toEqual(put(actions.refreshFeedSuccess(payload, sortBy, tag)));

      next = saga.next();
      expect(next.done).toBe(true);
    });
  });

  describe('watchers', () => {
    const action = {
      meta: {
        sortBy: 'trending',
        tag: 'busy',
      },
    };

    test('watchLoadFeed', () => {
      const watcher = sagas.watchLoadFeed();

      let next;
      for (let i = 0; i < 5; i += 1) {
        next = watcher.next();
        expect(next.value).toEqual(take(actions.GET_FEED.REQUEST));

        next = watcher.next(action);
        expect(next.value).toEqual(fork(sagas.loadFeed, action.meta.sortBy, action.meta.tag));
      }

      next = watcher.next(action);
      expect(next.done).toBe(false);
    });

    test('watchLoadMoreFeed', () => {
      const watcher = sagas.watchLoadMoreFeed();

      let next;
      for (let i = 0; i < 5; i += 1) {
        next = watcher.next();
        expect(next.value).toEqual(take(actions.GET_MORE_FEED.REQUEST));

        next = watcher.next(action);
        expect(next.value).toEqual(fork(sagas.loadMoreFeed, action.meta.sortBy, action.meta.tag));
      }

      next = watcher.next(action);
      expect(next.done).toBe(false);
    });

    test('watchRefreshFeed', () => {
      const watcher = sagas.watchRefreshFeed();

      let next;
      for (let i = 0; i < 5; i += 1) {
        next = watcher.next();
        expect(next.value).toEqual(take(actions.REFRESH_FEED.REQUEST));

        next = watcher.next(action);
        expect(next.value).toEqual(fork(sagas.refreshFeed, action.meta.sortBy, action.meta.tag));
      }

      next = watcher.next(action);
      expect(next.done).toBe(false);
    });
  });
});
