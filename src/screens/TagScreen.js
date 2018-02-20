import React from 'react';
import PropTypes from 'prop-types';
import FeedContainer from '../feed/FeedContainer';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.state.params.tag });

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    const { navigation } = this.props;

    return <FeedContainer sortBy="trending" tag={navigation.state.params.tag} />;
  }
}
