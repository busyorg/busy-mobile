// @flow

import React from 'react';
import CommentsContainer from '../comments/containers/CommentsContainer';

type Props = {
  navigation: Object,
};

export default class PostScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Post',
  };

  render() {
    const { id } = this.props.navigation.state.params;
    return <CommentsContainer autoload id={id} />;
  }
}
