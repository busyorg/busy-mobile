import React from 'react';
import { View } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.tag });

  render() {
    return <View />;
  }
}
