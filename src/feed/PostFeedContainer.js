import { connect } from 'react-redux';
import _ from 'lodash';
import { getPostById } from '../reducers';
import PostFeed from '../components/PostFeed';

const mapStateToProps = (state, { id }) => {
  const post = getPostById(state, id);
  const { author, title, created, upvoteCount, commentCount, metadata, payout } = post;

  const image = _.get(metadata, 'image[0]', null);

  return { id, author, title, created, upvoteCount, commentCount, image, payout };
};

export default connect(mapStateToProps)(PostFeed);
