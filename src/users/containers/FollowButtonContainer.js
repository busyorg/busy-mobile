// @flow

import React from 'react';
import { connect } from 'react-redux';
import { followUser } from '../actions';
import BButton from '../../components/BButton';

type Props = {
  username: string,
  followUser: (username: string) => void,
};

class FollowButtonContainer extends React.Component<Props> {
  static defaultProps = {
    followUser: () => {},
  };

  handlePress = () => {
    this.props.followUser(this.props.username);
  };

  render() {
    return <BButton onPress={this.handlePress} {...this.props} />;
  }
}

const mapStateToProps = () => ({
  title: 'Follow',
});

export default connect(mapStateToProps, { followUser })(FollowButtonContainer);
