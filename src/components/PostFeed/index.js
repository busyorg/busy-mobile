import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import CrossTouchable from '../CrossTouchable';
import Container from '../Container';
import Header from './components/Header';
import ImagePreview from './components/ImagePreview';
import Title from './components/Title';
import Body from './components/Body';
import Footer from './components/Footer';

export default class PostFeed extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    author: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    excerpt: PropTypes.string,
    upvoteCount: PropTypes.number,
    commentCount: PropTypes.number,
    payout: PropTypes.number,
    upvoted: PropTypes.bool,
    pendingVote: PropTypes.bool,
    image: PropTypes.string,
    votePost: PropTypes.func,
    onPostNavigate: PropTypes.func,
    onUserNavigate: PropTypes.func,
  };

  static defaultProps = {
    author: '',
    title: '',
    created: '',
    excerpt: '',
    upvoteCount: 0,
    commentCount: 0,
    payout: 0,
    upvoted: false,
    pendingVote: false,
    image: null,
    votePost: () => {},
    onPostNavigate: () => {},
    onUserNavigate: () => {},
  };

  handleLikeClick = () => {
    const { id, pendingVote, upvoted } = this.props;

    if (pendingVote) return;

    const weight = upvoted ? 0 : 10000;
    this.props.votePost(id, weight);
  };

  handleUserPress = () => {
    const { author } = this.props;
    this.props.onUserNavigate(author);
  };

  handlePostPress = () => {
    const { id } = this.props;
    this.props.onPostNavigate(id);
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
        <Header author={author} created={created} onPress={this.handleUserPress} />
        <CrossTouchable onPress={this.handlePostPress}>
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
            />
          </View>
        </CrossTouchable>
      </Container>
    );
  }
}
