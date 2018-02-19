import React from 'react';
import { View } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.username : 'A Nested Details Screen',
    }
  };

  render() {
    return <View />;
  }
}
