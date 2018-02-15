import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  padding: 16px 0;
  justify-content: center;
`;

const LoadingScreen = () => (
  <Container>
    <ActivityIndicator size="large" />
  </Container>
);

export default LoadingScreen;
