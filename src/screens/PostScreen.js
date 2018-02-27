import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components';
import Remarkable from 'remarkable';
import HTML from 'react-native-render-html';
import { getPostById } from '../reducers';
import Container from '../components/Container';
import Header from '../components/PostFeed/components/Header';
import Tags from '../components/Tags';
import Footer from '../components/PostFeed/components/Footer';

const md = new Remarkable({
  html: true, // remarkable renders first then sanitize runs...
  breaks: true,
  linkify: false, // linkify is done locally
  typographer: false, // https://github.com/jonschlinkert/remarkable/issues/142#issuecomment-221546793
  quotes: '“”‘’',
});

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

class PostScreen extends React.Component {
  static navigationOptions = {
    title: 'Post',
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    post: PropTypes.shape().isRequired,
  };

  handleUserNavigate = () => {
    const { author: name } = this.props.post;
    this.props.navigation.navigate('User', { name });
  };

  handleTagNavigate = tag => {
    this.props.navigation.navigate('Tag', { tag });
  };

  render() {
    const { post } = this.props;

    const tags = _.union(_.get(post.metadata, 'tags', []), [post.category]);

    const htmlContent = md.render(post.body);

    return (
      <Container full>
        <ScrollView>
          <Header author={post.author} created={post.created} onPress={this.handleUserNavigate} />
          <Title>{post.title}</Title>
          <Body>
            <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width - 32} />
          </Body>
          <TagsContainer>
            <Tags tags={tags} onSelect={this.handleTagNavigate} />
          </TagsContainer>
          <Footer
            upvoteCount={post.upvoteCount}
            commentCount={post.commentCount}
            payout={post.payout}
          />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.navigation.state.params;

  return {
    post: getPostById(state, id),
  };
};

export default connect(mapStateToProps)(PostScreen);
