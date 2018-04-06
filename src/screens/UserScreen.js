// @flow

import React from 'react';
import PropTypes from 'prop-types';
import UserProfileContainer from '../users/containers/UserProfileContainer';

type Props = {
  navigation: Object,
};

export default class ProfileScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: Object }) => ({
    title: navigation.state.params.name,
  });

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    return <UserProfileContainer name={this.props.navigation.state.params.name} />;
  }
}
