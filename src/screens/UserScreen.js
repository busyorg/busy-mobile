// @flow

import React from 'react';
import UserProfileContainer from '../users/containers/UserProfileContainer';

type Props = {
  navigation: Object,
};

export default class ProfileScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: Object }) => ({
    title: navigation.state.params.name,
  });

  render() {
    return <UserProfileContainer name={this.props.navigation.state.params.name} />;
  }
}
