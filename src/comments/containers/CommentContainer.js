import { connect } from 'react-redux';
import { getPostById, getIsCommentsLoaded, getIsCommentsLoading } from '../../reducers';
import { getComments } from '../actions';
import Comment from '../components/Comment';

const mapStateToProps = (state, { id }) => {
  const { author, body, depth, commentCount } = getPostById(state, id);
  return {
    id,
    author,
    commentCount,
    contents: body,
    level: depth,
    commentsLoaded: getIsCommentsLoaded(state, id),
    commentsLoading: getIsCommentsLoading(state, id),
  };
};

export default connect(mapStateToProps, { getComments })(Comment);
