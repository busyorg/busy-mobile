import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default class PostScreen extends React.Component {
  static navigationOptions = {
    title: 'Post',
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    console.log('Navigated to post', this.props.navigation.state.params.id);
    return <View />;
  }
}
