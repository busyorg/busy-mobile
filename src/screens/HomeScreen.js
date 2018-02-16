import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import _ from 'lodash';
import styled from 'styled-components';
import FeedItem from '../components/FeedItem';
import FeedSeparator from '../components/FeedSeparator';
import LoadingScreen from '../components/LoadingScreen';
import Loading from '../components/Loading';
import { getFeed, getMoreFeed } from '../feed/feedActions';

const Container = styled.View`
  flex: 1;
`;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Busy',
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape()),
    loading: PropTypes.bool,
    getFeed: PropTypes.func,
    getMoreFeed: PropTypes.func,
  };

  static defaultProps = {
    posts: [],
    loading: false,
    getFeed: () => {},
    getMoreFeed: () => {},
  };

  componentDidMount() {
    this.props.getFeed();
  }

  handleEndReached = () => {
    const { posts, loading } = this.props;
    if (loading) return;
    const lastPost = posts[posts.length - 1];
    this.props.getMoreFeed({ startAuthor: lastPost.author, startPermlink: lastPost.permlink });
  };

  handleNavigate = id => {
    this.props.navigation.navigate('Post', { id });
  };

  renderItem = ({ item }) => {
    const metadata = _.attempt(JSON.parse, item.json_metadata);

    let image = null;
    if (!_.isError(metadata)) {
      image = _.get(metadata, 'image[0]', null);
    }

    return (
      <FeedItem
        id={item.id}
        author={item.author}
        title={item.title}
        created={item.created}
        image={image}
        onNavigate={this.handleNavigate}
      />
    );
  };

  renderLoading = () => {
    const { loading } = this.props;

    if (loading) return <Loading />;

    return null;
  };

  render() {
    const { posts, loading } = this.props;

    if (loading && posts.length === 0) {
      return <LoadingScreen />;
    }

    return (
      <Container>
        <FlatList
          removeClippedSubviews
          data={posts}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          onEndReached={this.handleEndReached}
          ItemSeparatorComponent={FeedSeparator}
          ListFooterComponent={this.renderLoading()}
        />
      </Container>
    );
  }
}

export default connect(
  ({ posts, loading }) => ({
    posts,
    loading,
  }),
  { getFeed, getMoreFeed },
)(HomeScreen);
