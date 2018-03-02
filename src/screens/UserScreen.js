import React from 'react';
import PropTypes from 'prop-types';
import UserProfileContainer from '../users/containers/UserProfileContainer';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.name });

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    return <UserProfileContainer name={this.props.navigation.state.params.name} />;
  }
}
