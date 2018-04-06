// @flow

import * as React from 'react';
import { FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';
import BRefreshControl from '../../components/BRefreshControl';
import FeedPostContainer from '../containers/FeedPostContainer';
import FeedSeparator from './FeedSeparator';
import LoadingScreen from '../../components/LoadingScreen';
import Loading from '../../components/Loading';

import type { SortBy } from '../../types';

const Container = styled.View`
  flex: 1;
`;

type Props = {
  navigation: Object,
  sortBy: SortBy,
  tag: string,
  list: Array<number>,
  loading: boolean,
  refreshing: boolean,
  userLoading: boolean,
  header: React.Node,
  getFeed: (sortBy: SortBy, tag: string) => void,
  getMoreFeed: (sortBy: SortBy, tag: string) => void,
  refreshFeed: (sortBy: SortBy, tag: string) => void,
};

class Feed extends React.Component<Props> {
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

  handleUserNavigate = (name: string) => {
    this.props.navigation.navigate('User', { name });
  };

  handlePostNavigate = (id: number) => {
    this.props.navigation.navigate('Post', { id });
  };

  handleCommentsNavigate = (id: number) => {
    this.props.navigation.navigate('Comments', { id });
  };

  renderItem = ({ item }) => (
    <FeedPostContainer
      id={item}
      onUserNavigate={this.handleUserNavigate}
      onPostNavigate={this.handlePostNavigate}
      onCommentsNavigate={this.handleCommentsNavigate}
    />
  );

  renderLoading() {
    const { loading } = this.props;

    if (loading) return <Loading />;

    return null;
  }

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
            <BRefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />
          }
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item: any) => item}
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
