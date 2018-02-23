import { connect } from 'react-redux';
import { getFeedList, getFeedLoading, getFeedRefreshing } from '../reducers';
import { getFeed, getMoreFeed, refreshFeed } from './actions';
import Feed from './Feed';

export default connect(
  (state, { sortBy, tag }) => ({
    list: getFeedList(state, sortBy, tag),
    loading: getFeedLoading(state, sortBy, tag),
    refreshing: getFeedRefreshing(state, sortBy, tag),
  }),
  { getFeed, getMoreFeed, refreshFeed },
)(Feed);
