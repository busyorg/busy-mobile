import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { getPostById } from '../ducks';
import Container from '../components/Container';
import Header from '../components/PostFeed/components/Header';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Tags from '../components/Tags';

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

    let metadata = _.attempt(JSON.parse, post.json_metadata);
    if (_.isError(metadata)) metadata = {};

    const tags = _.union(_.get(metadata, 'tags', []), [post.category]);

    return (
      <Container full>
        <ScrollView>
          <Header author={post.author} created={post.created} onPress={this.handleUserNavigate} />
          <Title>{post.title}</Title>
          <Body>
            <MarkdownRenderer body="" />
            {/* <MarkdownRenderer body={post.body} /> */}
          </Body>
          <TagsContainer>
            <Tags tags={tags} onSelect={this.handleTagNavigate} />
          </TagsContainer>
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
