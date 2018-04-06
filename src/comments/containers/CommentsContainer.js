// @flow

import React from 'react';
import { connect } from 'react-redux';
import { getComments, refreshComments } from '../actions';
import { getIsCommentsLoading, getCommentsIdsByPostId } from '../../reducers';
import Comments from '../components/Comments';

type Props = {
  id: number,
  autoload: boolean,
  loading: boolean,
  comments: Array<number>,
  getComments: (postId: number) => void,
};

class CommentsContainer extends React.Component<Props> {
  static navigationOptions = {
    title: 'Comments',
  };

  static defaultProps = {
    autoload: false,
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
    refreshComments,
  },
)(CommentsContainer);
