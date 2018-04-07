// @flow

import { connect } from 'react-redux';
import { getFeedIds, getFeedLoading, getFeedRefreshing } from '../../reducers';
import { getFeed, getMoreFeed, refreshFeed } from '../actions';
import Feed from '../components/Feed';

export default connect(
  (state, { sortBy, tag }) => ({
    list: getFeedIds(state, sortBy, tag),
    loading: getFeedLoading(state, sortBy, tag),
    refreshing: getFeedRefreshing(state, sortBy, tag),
  }),
  { getFeed, getMoreFeed, refreshFeed },
)(Feed);
