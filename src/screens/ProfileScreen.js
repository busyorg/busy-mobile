import React from 'react';
import ProfileContainer from '../profile/ProfileContainer';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return <ProfileContainer />;
  }
}
