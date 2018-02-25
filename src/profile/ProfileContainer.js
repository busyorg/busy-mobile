import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthUser, getIsAuthLoading } from '../reducers';
import LoadingScreen from '../components/LoadingScreen';
import Login from '../auth/Login';
import UserProfileContainer from '../users/UserProfileContainer';

const ProfileContainer = ({ loading, user }) => {
  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <UserProfileContainer name={user.name} />;
  }

  return <Login />;
};
ProfileContainer.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.shape(),
};
ProfileContainer.defaultProps = {
  loading: false,
  user: null,
};

export default connect(state => ({
  loading: getIsAuthLoading(state),
  user: getAuthUser(state),
}))(ProfileContainer);
