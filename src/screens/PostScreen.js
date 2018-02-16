import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { getPostById } from '../ducks';
import Container from '../components/Container';
import Header from '../components/PostFeed/components/Header';
import Body from '../components/PostFeed/components/Body';

const Title = styled.Text`
  padding: 16px;
  font-size: 20px;
  font-weight: 500;
`;

class PostScreen extends React.Component {
  static navigationOptions = {
    title: 'Post',
  };

  static propTypes = {
    post: PropTypes.shape().isRequired,
  };

  render() {
    const { post } = this.props;
    return (
      <Container>
        <ScrollView>
          <Header author={post.author} created={post.created} />
          <Title>{post.title}</Title>
          <Body>{post.body}</Body>
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
