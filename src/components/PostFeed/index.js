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
    upvoteCount: PropTypes.number,
    commentCount: PropTypes.number,
    payout: PropTypes.number,
    upvoted: PropTypes.bool,
    image: PropTypes.string,
    onPostNavigate: PropTypes.func,
    onUserNavigate: PropTypes.func,
  };

  static defaultProps = {
    author: '',
    title: '',
    created: '',
    upvoteCount: 0,
    commentCount: 0,
    payout: 0,
    upvoted: false,
    image: null,
    onPostNavigate: () => {},
    onUserNavigate: () => {},
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
      upvoteCount,
      commentCount,
      image,
      payout,
      upvoted,
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
            <Body>
              These blocks can be organized to promote different types of content. For example,
              numbers may be emphasized by increasing their typographic scale.
            </Body>
            <Footer
              upvoted={upvoted}
              upvoteCount={upvoteCount}
              commentCount={commentCount}
              payout={payout}
            />
          </View>
        </CrossTouchable>
      </Container>
    );
  }
}
