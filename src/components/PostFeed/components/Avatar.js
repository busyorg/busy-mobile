import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const Avatar = ({ username }) => (
  <AvatarImage source={{ uri: `https://steemitimages.com/u/${username}/avatar` }} />
);

Avatar.propTypes = {
  username: PropTypes.string,
};

Avatar.defaultProps = {
  username: 'a',
};

export default Avatar;
