import { connect } from 'react-redux';
import { getPostById } from '../../reducers';
import { getComments } from '../actions';
import Comment from '../components/Comment';

const mapStateToProps = (state, { id }) => {
  const { author, body, depth, commentCount } = getPostById(state, id);
  return { id, author, commentCount, contents: body, level: depth };
};

export default connect(mapStateToProps, { getComments })(Comment);
