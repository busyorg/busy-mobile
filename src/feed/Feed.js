import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';
import PostFeedContainer from '../feed/PostFeedContainer';
import FeedSeparator from '../components/FeedSeparator';
import LoadingScreen from '../components/LoadingScreen';
import Loading from '../components/Loading';

const Container = styled.View`
  flex: 1;
`;

class Feed extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    sortBy: PropTypes.string.isRequired,
    tag: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.number),
    loading: PropTypes.bool,
    header: PropTypes.node,
    getFeed: PropTypes.func,
    getMoreFeed: PropTypes.func,
  };

  static defaultProps = {
    tag: null,
    list: [],
    loading: false,
    header: null,
    getFeed: () => {},
    getMoreFeed: () => {},
  };

  componentDidMount() {
    const { sortBy, tag, loading, list } = this.props;

    if (!loading && list.length === 0) {
      this.props.getFeed(sortBy, tag);
    }
  }

  handleEndReached = () => {
    const { sortBy, tag, loading } = this.props;
    if (!loading) {
      this.props.getMoreFeed(sortBy, tag);
    }
  };

  handleUserNavigate = name => {
    this.props.navigation.navigate('User', { name });
  };

  handlePostNavigate = id => {
    this.props.navigation.navigate('Post', { id });
  };

  renderItem = ({ item }) => (
    <PostFeedContainer
      id={item}
      onUserNavigate={this.handleUserNavigate}
      onPostNavigate={this.handlePostNavigate}
    />
  );

  renderLoading = () => {
    const { loading } = this.props;

    if (loading) return <Loading />;

    return null;
  };

  render() {
    const { list, loading, header } = this.props;

    if (loading && list.length === 0) {
      return <LoadingScreen />;
    }

    return (
      <Container>
        <FlatList
          removeClippedSubviews
          data={list}
          renderItem={this.renderItem}
          keyExtractor={item => item}
          onEndReached={this.handleEndReached}
          ItemSeparatorComponent={FeedSeparator}
          ListHeaderComponent={header}
          ListFooterComponent={this.renderLoading()}
        />
      </Container>
    );
  }
}

export default withNavigation(Feed);
