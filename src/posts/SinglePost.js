import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components';
import HTML from 'react-native-render-html';
import Container from '../components/Container';
import Header from '../components/PostFeed/components/Header';
import Tags from '../components/Tags';
import Footer from '../components/PostFeed/components/Footer';

const Body = styled.View`
  padding: 16px;
`;

const Title = styled.Text`
  padding: 16px;
  font-size: 20px;
  font-weight: 500;
`;

const TagsContainer = styled.View`
  padding-bottom: 8px;
`;

const SinglePost = ({
  author,
  created,
  title,
  htmlBody,
  tags,
  upvoted,
  upvoteCount,
  commentCount,
  payout,
  onUserNavigate,
  onTagNavigate,
}) => (
  <Container full>
    <ScrollView>
      <Header author={author} created={created} onPress={onUserNavigate} />
      <Title>{title}</Title>
      <Body>
        <HTML html={htmlBody} imagesMaxWidth={Dimensions.get('window').width - 32} />
      </Body>
      <TagsContainer>
        <Tags tags={tags} onSelect={onTagNavigate} />
      </TagsContainer>
      <Footer
        upvoted={upvoted}
        upvoteCount={upvoteCount}
        commentCount={commentCount}
        payout={payout}
      />
    </ScrollView>
  </Container>
);
SinglePost.propTypes = {
  author: PropTypes.string,
  created: PropTypes.string,
  title: PropTypes.string,
  htmlBody: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  upvoted: PropTypes.bool,
  upvoteCount: PropTypes.number,
  commentCount: PropTypes.number,
  payout: PropTypes.number,
  onUserNavigate: PropTypes.func,
  onTagNavigate: PropTypes.func,
};
SinglePost.defaultProps = {
  author: '',
  created: '',
  title: '',
  htmlBody: '',
  tags: [],
  upvoted: false,
  upvoteCount: 0,
  commentCount: 0,
  payout: 0,
  onUserNavigate: () => {},
  onTagNavigate: () => {},
};

export default SinglePost;
