import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getComments } from '../actions';
import { getIsCommentsLoading, getCommentsIdsByPostId } from '../../reducers';
import Comments from '../components/Comments';

class CommentsContainer extends React.Component {
  static navigationOptions = {
    title: 'Comments',
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.number),
    getComments: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    comments: [],
    getComments: () => {},
  };

  componentDidMount() {
    const { id, autoload, loading, comments } = this.props;

    if (!autoload) return;

    if (!loading && comments.length === 0) {
      this.props.getComments(id);
    }
  }

  render() {
    // return null;
    return <Comments {...this.props} />;
  }
}

export default connect(
  (state, { id }) => ({
    loading: getIsCommentsLoading(state, id),
    comments: getCommentsIdsByPostId(state, id),
  }),
  {
    getComments,
  },
)(CommentsContainer);
