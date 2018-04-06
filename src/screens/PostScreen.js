// @flow

import React from 'react';
import SinglePostContainer from '../posts/containers/SinglePostContainer';

type Props = {
  navigation: Object,
};

export default class PostScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Post',
  };

  render() {
    const { id } = this.props.navigation.state.params;
    return <SinglePostContainer id={id} />;
  }
}
