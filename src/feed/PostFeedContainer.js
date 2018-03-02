import { connect } from 'react-redux';
import _ from 'lodash';
import { votePost } from '../posts/actions';
import { getPostById, getAuthUser, getIsPostPendingVote } from '../reducers';
import PostFeed from '../components/PostFeed';

const mapStateToProps = (state, { id }) => {
  const post = getPostById(state, id);
  const pendingVote = getIsPostPendingVote(state, id);
  const user = getAuthUser(state);
  const {
    author,
    title,
    created,
    excerpt,
    upvoteCount,
    commentCount,
    metadata,
    payout,
    upvoters,
  } = post;

  const image = _.get(metadata, 'image[0]', null);

  const upvoted = user && user.name && upvoters.indexOf(user.name) !== -1;

  return {
    id,
    author,
    title,
    created,
    excerpt,
    upvoteCount,
    commentCount,
    image,
    payout,
    upvoted,
    pendingVote,
  };
};

export default connect(mapStateToProps, { votePost })(PostFeed);
