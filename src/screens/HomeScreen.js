import React from 'react';
import FeedContainer from '../feed/FeedContainer';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Busy',
  };
  render() {
    return <FeedContainer />;
  }
}
