import { connect } from 'react-redux';
import { getCommentById } from '../../reducers';
import Comment from '../components/Comment';

const mapStateToProps = (state, { id }) => {
  const { author, body, depth } = getCommentById(state, id);
  return { id, author, contents: body, level: depth };
};

export default connect(mapStateToProps)(Comment);
