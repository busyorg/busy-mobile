import { connect } from 'react-redux';
import { getFeedList, getFeedLoading } from '../ducks';
import { getFeed, getMoreFeed } from '../ducks/feed';
import Feed from './Feed';

export default connect(
  (state, { sortBy, tag }) => ({
    list: getFeedList(state, sortBy, tag),
    loading: getFeedLoading(state, sortBy, tag),
  }),
  { getFeed, getMoreFeed },
)(Feed);
