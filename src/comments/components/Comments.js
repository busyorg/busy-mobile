import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen';
import CommentContainer from '../containers/CommentContainer';

export default class Comments extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    comments: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    loading: false,
    comments: [],
  };

  static renderItem({ item }) {
    return <CommentContainer id={item} />;
  }

  static extractKey(item) {
    return item;
  }

  render() {
    const { loading, comments } = this.props;
    if (loading) return <LoadingScreen />;

    return (
      <FlatList
        data={comments}
        keyExtractor={Comments.extractKey}
        renderItem={Comments.renderItem}
      />
    );
  }
}
