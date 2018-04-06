// @flow

import React from 'react';
import styled from 'styled-components';
import CrossTouchable from './CrossTouchable';

const Container = styled.View`
  background: #eff0f8;
  padding: 4px 12px;
  border: 1px solid #2088ff;
  border-radius: 4px;
`;

const Text = styled.Text`
  color: #2088ff;
  font-weight: bold;
`;

type Props = {
  title: string,
  onPress: Function,
};

const BButton = ({ title, onPress }: Props) => (
  <CrossTouchable onPress={onPress}>
    <Container>
      <Text>{title}</Text>
    </Container>
  </CrossTouchable>
);
BButton.defaultProps = {
  title: '',
  onPress: () => {},
};

export default BButton;
