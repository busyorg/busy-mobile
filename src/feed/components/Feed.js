import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import FeedPostContainer from '../containers/FeedPostContainer';
import FeedSeparator from './FeedSeparator';
import LoadingScreen from '../../components/LoadingScreen';
import Loading from '../../components/Loading';

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
    refreshing: PropTypes.bool,
    userLoading: PropTypes.bool,
    header: PropTypes.node,
    getFeed: PropTypes.func,
    getMoreFeed: PropTypes.func,
    refreshFeed: PropTypes.func,
  };

  static defaultProps = {
    tag: null,
    list: [],
    loading: false,
    refreshing: false,
    userLoading: false,
    header: null,
    getFeed: () => {},
    getMoreFeed: () => {},
    refreshFeed: () => {},
  };

  componentDidMount() {
    const { sortBy, tag, loading, list, userLoading } = this.props;

    if (!userLoading && !loading && list.length === 0) {
      this.props.getFeed(sortBy, tag);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sortBy, tag } = this.props;

    const changed = sortBy !== nextProps.sortBy || tag !== nextProps.tag;

    if (changed) {
      this.props.getFeed(nextProps.sortBy, nextProps.tag);
    }
  }

  handleEndReached = () => {
    const { sortBy, tag, loading } = this.props;
    if (!loading) {
      this.props.getMoreFeed(sortBy, tag);
    }
  };

  handleRefresh = () => {
    const { sortBy, tag } = this.props;
    this.props.refreshFeed(sortBy, tag);
  };

  handleUserNavigate = name => {
    this.props.navigation.navigate('User', { name });
  };

  handlePostNavigate = id => {
    this.props.navigation.navigate('Post', { id });
  };

  renderItem = ({ item }) => (
    <FeedPostContainer
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
    const { list, loading, refreshing, userLoading, header } = this.props;

    if (userLoading || (loading && list.length === 0)) {
      return <LoadingScreen />;
    }

    return (
      <Container>
        <FlatList
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              colors={[Colors.accent, Colors.primary, Colors.secondary]}
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
          }
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
