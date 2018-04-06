// @flow

import React from 'react';
import { FlatList } from 'react-native';
import BRefreshControl from '../../components/BRefreshControl';
import LoadingScreen from '../../components/LoadingScreen';
import CommentContainer from '../containers/CommentContainer';

type Props = {
  id: number,
  loading: boolean,
  comments: Array<number>,
  refreshComments: (postId: number) => void,
};

export default class Comments extends React.Component<Props> {
  static defaultProps = {
    loading: false,
    comments: [],
    refreshComments: () => {},
  };

  static renderItem(item: { item: number }) {
    return <CommentContainer id={item.item} />;
  }

  static extractKey(item: any) {
    return item;
  }

  handleRefresh = () => {
    this.props.refreshComments(this.props.id);
  };

  render() {
    const { loading, comments } = this.props;
    if (loading && comments.length === 0) return <LoadingScreen />;

    return (
      <FlatList
        refreshControl={<BRefreshControl refreshing={loading} onRefresh={this.handleRefresh} />}
        data={comments}
        keyExtractor={Comments.extractKey}
        renderItem={Comments.renderItem}
      />
    );
  }
}
