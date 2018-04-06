// @flow

import React from 'react';
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

type Props = {
  skipLoadingScreen: boolean,
};

type State = {
  isLoadingComplete: boolean,
};

export default class App extends React.Component<Props, State> {
  static defaultProps = { skipLoadingScreen: false };

  state = { isLoadingComplete: false };

  loadResourcesAsync = async () => {
    await Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font,
        ...MaterialCommunityIcons.font,
      }),
      initialize(store),
    ]);
  };

  handleFinishLoading = (): void => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading startAsync={this.loadResourcesAsync} onFinish={this.handleFinishLoading} />
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
