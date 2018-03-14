import { connect } from 'react-redux';
import { getCommentById } from '../../reducers';
import Comment from '../components/Comment';

const mapStateToProps = (state, { id }) => {
  const { author, body, depth, children } = getCommentById(state, id);
  return { id, author, children, contents: body, level: depth };
};

export default connect(mapStateToProps)(Comment);
