// @flow

import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { AuthSession, SecureStore } from 'expo';
import styled from 'styled-components';
import { login } from './actions';
import sc2 from '../services/sc2';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
`;

type Props = {
  login: () => void,
};

class Login extends React.Component<Props> {
  static defaultProps = {
    login: () => {},
  };

  handleSignIn = async () => {
    sc2.setCallbackURL(AuthSession.getRedirectUrl());
    const authUrl = sc2.getLoginURL();

    const result = await AuthSession.startAsync({
      authUrl,
    });

    if (result.type !== 'success') {
      console.log('failed');
      return;
    }

    const accessToken = result.params.access_token;
    SecureStore.setItemAsync('accessToken', accessToken);
    sc2.setAccessToken(accessToken);

    this.props.login();
  };

  render() {
    return (
      <Container>
        <Button title="Sign in with SteemConnect" onPress={this.handleSignIn} />
      </Container>
    );
  }
}

export default connect(null, { login })(Login);
