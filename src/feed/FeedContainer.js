import { connect } from 'react-redux';
import { getFeed, getMoreFeed } from '../ducks/feed';
import Feed from './Feed';

export default connect(
  ({ feed }) => ({
    list: feed.list,
    loading: feed.loading,
  }),
  { getFeed, getMoreFeed },
)(Feed);
