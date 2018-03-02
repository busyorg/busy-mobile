import React from 'react';
import ProfileMenuContainer from '../profile/containers/ProfileMenuContainer';
import ProfileContainer from '../profile/containers/ProfileContainer';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerRight: <ProfileMenuContainer />,
  };

  render() {
    return <ProfileContainer />;
  }
}
