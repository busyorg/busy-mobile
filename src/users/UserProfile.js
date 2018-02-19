import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LoadingScreen from '../components/LoadingScreen';
import Statistics from '../components/Statistics';

const Container = styled.View`
  padding: 16px;
  background-color: white;
`;

const Center = styled.View`
  align-items: center;
`;

const Avatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
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

export default class UserProfile extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    displayName: PropTypes.string,
    about: PropTypes.string,
    postCount: PropTypes.number,
    followerCount: PropTypes.number,
    followingCount: PropTypes.number,
    getUser: PropTypes.func,
  };

  static defaultProps = {
    loading: true,
    displayName: '',
    about: '',
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
    getUser: () => {},
  };

  componentDidMount() {
    const { name, getUser } = this.props;
    getUser(name);
  }

  render() {
    const {
      loading,
      name,
      displayName,
      about,
      postCount,
      followerCount,
      followingCount,
    } = this.props;

    if (loading) return <LoadingScreen />;

    return (
      <Container>
        <Center>
          <Avatar source={{ uri: `https://steemitimages.com/u/${name}/avatar` }} />
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
  }
}
