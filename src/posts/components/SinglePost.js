import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components';
import HTML from 'react-native-render-html';
import Container from '../../components/Container';
import Header from '../../components/Post/Header';
import Tags from '../../components/Post/Tags';
import Footer from '../../components/Post/Footer';

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

class SinglePost extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    author: PropTypes.string,
    created: PropTypes.string,
    title: PropTypes.string,
    htmlBody: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    upvoted: PropTypes.bool,
    pendingVote: PropTypes.bool,
    upvoteCount: PropTypes.number,
    commentCount: PropTypes.number,
    payout: PropTypes.number,
    votePost: PropTypes.func,
    onUserNavigate: PropTypes.func,
    onTagNavigate: PropTypes.func,
    onCommentsNavigate: PropTypes.func,
  };

  static defaultProps = {
    author: '',
    created: '',
    title: '',
    htmlBody: '',
    tags: [],
    upvoted: false,
    pendingVote: false,
    upvoteCount: 0,
    commentCount: 0,
    payout: 0,
    votePost: () => {},
    onUserNavigate: () => {},
    onTagNavigate: () => {},
    onCommentsNavigate: () => {},
  };

  constructor(props) {
    super(props);

    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  handleLikeClick() {
    const { id, pendingVote, upvoted } = this.props;

    if (pendingVote) return;

    const weight = upvoted ? 0 : 10000;
    this.props.votePost(id, weight);
  }

  render() {
    const {
      author,
      created,
      title,
      htmlBody,
      tags,
      upvoted,
      pendingVote,
      upvoteCount,
      commentCount,
      payout,
      onUserNavigate,
      onTagNavigate,
      onCommentsNavigate,
    } = this.props;

    return (
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
            pendingVote={pendingVote}
            upvoteCount={upvoteCount}
            commentCount={commentCount}
            payout={payout}
            onLikeClick={this.handleLikeClick}
            onCommentsClick={onCommentsNavigate}
          />
        </ScrollView>
      </Container>
    );
  }
}

export default SinglePost;
