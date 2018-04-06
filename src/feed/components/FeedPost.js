// @flow

import React from 'react';
import { View } from 'react-native';
import CrossTouchable from '../../components/CrossTouchable';
import Container from '../../components/Container';
import Header from '../../components/Post/Header';
import ImagePreview from '../../components/Post/ImagePreview';
import Title from '../../components/Post/Title';
import Body from '../../components/Post/Body';
import Footer from '../../components/Post/Footer';

type Props = {
  id: number,
  author: string,
  title: string,
  created: string,
  excerpt: string,
  upvoteCount: number,
  commentCount: number,
  payout: number,
  upvoted: boolean,
  pendingVote: boolean,
  image: string,
  votePost: (postId: number, weight: number) => void,
  onUserNavigate: (username: string) => void,
  onPostNavigate: (postId: number) => void,
  onCommentsNavigate: (postId: number) => void,
};

export default class PostFeed extends React.PureComponent<Props> {
  static defaultProps = {
    upvoteCount: 0,
    commentCount: 0,
    payout: 0,
    upvoted: false,
    pendingVote: false,
    image: null,
    votePost: () => {},
    onPostNavigate: () => {},
    onUserNavigate: () => {},
    onCommentsNavigate: () => {},
  };

  handleLikeClick = () => {
    const { id, pendingVote, upvoted } = this.props;

    if (pendingVote) return;

    const weight = upvoted ? 0 : 10000;
    this.props.votePost(id, weight);
  };

  handleUserClick = () => {
    const { author } = this.props;
    this.props.onUserNavigate(author);
  };

  handlePostClick = () => {
    const { id } = this.props;
    this.props.onPostNavigate(id);
  };

  handleCommentsClick = () => {
    const { id } = this.props;
    this.props.onCommentsNavigate(id);
  };

  render() {
    const {
      author,
      title,
      created,
      excerpt,
      upvoteCount,
      commentCount,
      image,
      payout,
      upvoted,
      pendingVote,
    } = this.props;

    return (
      <Container>
        <Header author={author} created={created} onPress={this.handleUserClick} />
        <CrossTouchable onPress={this.handlePostClick}>
          <View>
            {image && (
              <ImagePreview source={{ uri: `https://steemitimages.com/400x400/${image}` }} />
            )}
            <Title narrow={!image} numberOfLines={3}>
              {title}
            </Title>
            <Body numberOfLines={3}>{excerpt}</Body>
            <Footer
              upvoted={upvoted}
              pendingVote={pendingVote}
              upvoteCount={upvoteCount}
              commentCount={commentCount}
              payout={payout}
              onLikeClick={this.handleLikeClick}
              onCommentsClick={this.handleCommentsClick}
            />
          </View>
        </CrossTouchable>
      </Container>
    );
  }
}
