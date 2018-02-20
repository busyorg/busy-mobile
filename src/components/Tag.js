import React from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  margin: 0 4px 4px 0;
  padding: 0 8px;
  background-color: #eaf4ef;
  border: 1px solid rgb(66, 187, 139);
  border-radius: 4px;
`;

const Text = styled.Text`
  margin-bottom: 2px;
  color: #42bb8b;
`;

const Tag = ({ name, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <Container>
      <Text>{name}</Text>
    </Container>
  </TouchableNativeFeedback>
);
Tag.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};
Tag.defaultProps = {
  onPress: () => {},
};

export default Tag;
