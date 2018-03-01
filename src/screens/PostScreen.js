import React from 'react';
import PropTypes from 'prop-types';
import SinglePostContainer from '../posts/SinglePostContainer';

export default class PostScreen extends React.Component {
  static navigationOptions = {
    title: 'Post',
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    const { id } = this.props.navigation.state.params;
    return <SinglePostContainer id={id} />;
  }
}
