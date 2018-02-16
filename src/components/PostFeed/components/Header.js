import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styled from 'styled-components';
import moment from 'moment';
import Avatar from './Avatar';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
`;

const TextContainer = styled.View`
  justify-content: space-between;
  margin-left: 16px;
`;

const Date = styled.Text`
  color: rgba(0, 0, 0, 0.54);
`;

const Header = ({ author, created }) => (
  <Container>
    <Avatar username={author} />
    <TextContainer>
      <Text>{author}</Text>
      <Date>{moment(created).fromNow()}</Date>
    </TextContainer>
  </Container>
);

Header.propTypes = {
  author: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
};

export default Header;
