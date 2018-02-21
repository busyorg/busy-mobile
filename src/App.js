import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { AppLoading, Asset, Font } from 'expo';
import styled from 'styled-components';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import store from './store';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default class App extends React.Component {
  static propTypes = { skipLoadingScreen: PropTypes.bool };

  static defaultProps = { skipLoadingScreen: false };

  state = { isLoadingComplete: false };

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require('../assets/images/robot-dev.png'),
        require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        ...MaterialIcons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <Container>
          <RootNavigation />
        </Container>
      </Provider>
    );
  }
}
