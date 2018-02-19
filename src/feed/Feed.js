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
    list: PropTypes.arrayOf(PropTypes.number),
    loading: PropTypes.bool,
    getFeed: PropTypes.func,
    getMoreFeed: PropTypes.func,
  };

  static defaultProps = {
    list: [],
    loading: false,
    getFeed: () => {},
    getMoreFeed: () => {},
  };

  componentDidMount() {
    this.props.getFeed();
  }

  handleEndReached = () => {
    const { loading } = this.props;
    if (loading) return;
    this.props.getMoreFeed();
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
    const { list, loading } = this.props;

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
          ListFooterComponent={this.renderLoading()}
        />
      </Container>
    );
  }
}

export default withNavigation(Feed);
