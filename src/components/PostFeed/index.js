import React from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback } from 'react-native';

import Container from '../Container';
import Header from './components/Header';
import ImagePreview from './components/ImagePreview';
import Title from './components/Title';
import Body from './components/Body';

export default class PostFeed extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    author: PropTypes.string,
    title: PropTypes.string,
    created: PropTypes.string,
    image: PropTypes.string,
    onNavigate: PropTypes.func,
  };

  static defaultProps = {
    author: '',
    title: '',
    created: '',
    image: null,
    onNavigate: () => {},
  };

  handleTitlePress = () => {
    const { id } = this.props;
    this.props.onNavigate(id);
  };

  render() {
    const { author, title, created, image } = this.props;

    return (
      <TouchableNativeFeedback onPress={this.handleTitlePress}>
        <Container>
          <Header author={author} created={created} />
          {image && <ImagePreview source={{ uri: image }} />}
          <Title narrow={!image} numberOfLines={3}>
            {title}
          </Title>
          <Body>
            These blocks can be organized to promote different types of content. For example,
            numbers may be emphasized by increasing their typographic scale.
          </Body>
        </Container>
      </TouchableNativeFeedback>
    );
  }
}
