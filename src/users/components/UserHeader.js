import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import Statistics from '../../components/Statistics';

const Container = styled.View`
  padding: 16px;
  background-color: white;
  margin-bottom: 8px;
`;

const Center = styled.View`
  align-items: center;
`;

const Name = styled.Text`
  margin: 8px 0;
  font-size: 20px;
  font-weight: bold;
`;

const About = styled.Text`
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
`;

const Footer = styled.View`
  padding-top: 16px;
`;

const UserHeader = ({ name, displayName, about, postCount, followerCount, followingCount }) => (
  <Container>
    <Center>
      <Avatar size={72} username={name} />
      <Name>{displayName || name}</Name>
      <About>{about}</About>
    </Center>
    <Footer>
      <Statistics>
        <Statistics.Item title="posts" number={postCount} />
        <Statistics.Item title="followers" number={followerCount} />
        <Statistics.Item title="following" number={followingCount} />
      </Statistics>
    </Footer>
  </Container>
);

UserHeader.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  about: PropTypes.string,
  postCount: PropTypes.number,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
};

UserHeader.defaultProps = {
  displayName: '',
  about: '',
  postCount: 0,
  followerCount: 0,
  followingCount: 0,
};

export default UserHeader;
