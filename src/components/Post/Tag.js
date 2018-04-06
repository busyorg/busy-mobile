// @flow

import React from 'react';
import styled from 'styled-components';
import CrossTouchable from '../CrossTouchable';

const Container = styled.View`
  margin: 0 4px 4px 0;
  padding: 0 8px;
  background-color: #e9e7e7;
  border-radius: 4px;
`;

const Text = styled.Text`
  color: #777676;
  margin-bottom: 2px;
`;

type Props = {
  name: string,
  onPress: Function,
};

const Tag = ({ name, onPress }: Props) => (
  <CrossTouchable onPress={onPress}>
    <Container>
      <Text>{name}</Text>
    </Container>
  </CrossTouchable>
);
Tag.defaultProps = {
  onPress: () => {},
};

export default Tag;
