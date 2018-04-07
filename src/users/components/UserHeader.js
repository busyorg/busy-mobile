// @flow

import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import FollowButtonContainer from '../containers/FollowButtonContainer';
import ImagePreview from '../../components/Post/ImagePreview';
import Avatar from '../../components/Avatar';
import Statistics from '../../components/Statistics';

const Container = styled.View`
  padding: 0 16px 16px;
  background-color: white;
  margin-bottom: 8px;
`;

const Center = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TopContainer = styled.View`
  background: white;
  position: relative;
  padding-bottom: 16px;
`;

const AvatarContainer = styled.View`
  position: absolute;
  left: 16px;
  bottom: 0px;
`;

const Name = styled.Text`
  margin: 8px 0;
  font-size: 20px;
  font-weight: bold;
`;

const About = styled.Text`
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
`;

const Footer = styled.View`
  padding-top: 16px;
`;

const DefaultBackground = styled.View`
  height: 80px;
`;

type Props = {
  name: string,
  displayName: string,
  about: string,
  cover: string,
  postCount: number,
  followerCount: number,
  followingCount: number,
};

const UserHeader = ({
  name,
  displayName,
  about,
  cover,
  postCount,
  followerCount,
  followingCount,
}: Props) => (
  <React.Fragment>
    <TopContainer>
      {cover ? <ImagePreview source={{ uri: cover }} /> : <DefaultBackground />}
      <AvatarContainer>
        <Avatar size={72} username={name} />
      </AvatarContainer>
    </TopContainer>
    <Container>
      <Center>
        <View>
          <Name>{displayName || name}</Name>
        </View>
        <View>
          <FollowButtonContainer username={name} />
        </View>
      </Center>
      <About>{about}</About>
      <Footer>
        <Statistics>
          <Statistics.Item title="Posts" number={postCount} />
          <Statistics.Item title="Followers" number={followerCount} />
          <Statistics.Item title="Following" number={followingCount} />
          <Statistics.Item title="Voting power" number={0.98} displayStyle="percent" />
        </Statistics>
      </Footer>
    </Container>
  </React.Fragment>
);
UserHeader.defaultProps = {
  displayName: '',
  about: '',
  cover: '',
  postCount: 0,
  followerCount: 0,
  followingCount: 0,
};

export default UserHeader;
