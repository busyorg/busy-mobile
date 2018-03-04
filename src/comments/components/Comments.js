import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen';
import CommentContainer from '../containers/CommentContainer';

const Comments = ({ loading, comments }) => {
  if (loading) return <LoadingScreen />;
  return (
    <ScrollView>
      {comments.map(comment => <CommentContainer key={comment} id={comment} />)}
    </ScrollView>
  );
};
Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.number),
};
Comments.defaultProps = {
  comments: [],
};

export default Comments;
