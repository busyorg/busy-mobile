import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import BusyRefreshControl from '../../components/BusyRefreshControl';
import LoadingScreen from '../../components/LoadingScreen';
import CommentContainer from '../containers/CommentContainer';

export default class Comments extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.number),
    refreshComments: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    comments: [],
    refreshComments: () => {},
  };

  static renderItem({ item }) {
    return <CommentContainer id={item} />;
  }

  static extractKey(item) {
    return item;
  }

  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    this.props.refreshComments(this.props.id);
  }

  render() {
    const { loading, comments } = this.props;
    if (loading && comments.length === 0) return <LoadingScreen />;

    return (
      <FlatList
        refreshControl={<BusyRefreshControl refreshing={loading} onRefresh={this.handleRefresh} />}
        data={comments}
        keyExtractor={Comments.extractKey}
        renderItem={Comments.renderItem}
      />
    );
  }
}
