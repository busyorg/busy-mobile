import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarImage = styled.Image`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
`;

const Avatar = ({ username, size }) => (
  <AvatarImage size={size} source={{ uri: `https://steemitimages.com/u/${username}/avatar` }} />
);

Avatar.propTypes = {
  username: PropTypes.string,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  username: 'a',
  size: 32,
};

export default Avatar;
