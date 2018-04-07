// @flow

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getPostById, getAuthUser, getIsPostPendingVote } from '../../reducers';
import { votePost } from '../actions';
import SinglePost from '../components/SinglePost';

import type { Post } from '../../types';

type OwnProps = {
  navigation: Object,
  upvoted: boolean,
  pendingVote: boolean,
};

type Props = Post & OwnProps;

class SinglePostContainer extends React.PureComponent<Props> {
  handleUserNavigate = () => {
    const { author } = this.props;
    this.props.navigation.navigate('User', { name: author });
  };

  handleTagNavigate = (tag: string) => {
    this.props.navigation.navigate('Tag', { tag });
  };

  handleCommentsNavigate() {
    const { id } = this.props;
    this.props.navigation.navigate('Comments', { id });
  }

  render() {
    return (
      <SinglePost
        {...this.props}
        onUserNavigate={this.handleUserNavigate}
        onTagNavigate={this.handleTagNavigate}
        onCommentsNavigate={this.handleCommentsNavigate}
      />
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const post = getPostById(state, id);
  const pendingVote = getIsPostPendingVote(state, id);
  const user = getAuthUser(state);
  const { metadata, upvoters } = post;

  const image = _.get(metadata, 'image[0]', null);

  const upvoted = user && user.name && upvoters.indexOf(user.name) !== -1;

  return { ...post, image, upvoted, pendingVote };
};

export default connect(mapStateToProps, { votePost })(withNavigation(SinglePostContainer));
