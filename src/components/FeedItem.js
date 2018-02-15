import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Text } from 'react-native';
import styled, { css } from 'styled-components';
import moment from 'moment';

const window = Dimensions.get('window');

const Container = styled.View`
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const HeaderText = styled.View`
  justify-content: space-between;
  margin-left: 16px;
`;

const Date = styled.Text`
  color: rgba(0, 0, 0, 0.54);
`;

const PostImage = styled.Image`
  width: 100%;
  height: ${window.width / 16 * 9};
`;

const Title = styled.Text`
  padding: 16px 16px 0 16px;
  font-size: 14px;
  font-weight: 500;

  ${({ narrow }) =>
    narrow &&
    css`
      padding-top: 0;
    `};
`;

const Body = styled.Text`
  padding: 16px;
  font-size: 14px;
`;

export default class FeedItem extends React.PureComponent {
  static propTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    image: PropTypes.string,
  };

  static defaultProps = {
    author: '',
    title: '',
    created: '',
    image: null,
  };

  render() {
    const { author, title, created, image } = this.props;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: `https://steemitimages.com/u/${author}/avatar` }} />
          <HeaderText>
            <Text>{author}</Text>
            <Date>{moment(created).fromNow()}</Date>
          </HeaderText>
        </Header>
        {image && <PostImage source={{ uri: image }} />}
        <Title narrow={!image} numberOfLines={3}>
          {title}
        </Title>
        <Body>
          These blocks can be organized to promote different types of content. For example, numbers
          may be emphasized by increasing their typographic scale.
        </Body>
      </Container>
    );
  }
}
