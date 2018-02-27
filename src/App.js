import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { AppLoading, Font } from 'expo';
import styled from 'styled-components';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import store from './store';
import initialize from './auth/initialize';
import RootNavigation from './navigation/RootNavigation';

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
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font,
        ...MaterialCommunityIcons.font,
      }),
      initialize(store),
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
