import React from 'react';
import ProfileMenuContainer from '../profile/ProfileMenuContainer';
import ProfileContainer from '../profile/ProfileContainer';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerRight: <ProfileMenuContainer />,
  };

  render() {
    return <ProfileContainer />;
  }
}
