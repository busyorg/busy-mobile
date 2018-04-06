// @flow

import React from 'react';
import { connect } from 'react-redux';
import { getAuthUser, getIsAuthLoading } from '../../reducers';
import LoadingScreen from '../../components/LoadingScreen';
import Login from '../../auth/Login';
import UserProfileContainer from '../../users/containers/UserProfileContainer';

type Props = {
  loading: boolean,
  user: {
    name: string,
  },
};

const ProfileContainer = ({ loading, user }: Props) => {
  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <UserProfileContainer name={user.name} />;
  }

  return <Login />;
};
ProfileContainer.defaultProps = {
  loading: false,
  user: null,
};

export default connect(state => ({
  loading: getIsAuthLoading(state),
  user: getAuthUser(state),
}))(ProfileContainer);
