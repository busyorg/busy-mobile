// @flow

import React from 'react';
import styled from 'styled-components';

const AvatarImage = styled.Image`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
`;

type Props = {
  username: string,
  size: number,
};

const Avatar = ({ username, size }: Props) => (
  <AvatarImage size={size} source={{ uri: `https://steemitimages.com/u/${username}/avatar` }} />
);
Avatar.defaultProps = {
  username: 'a',
  size: 32,
};

export default Avatar;
