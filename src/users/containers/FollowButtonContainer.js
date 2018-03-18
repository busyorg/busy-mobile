import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followUser } from '../actions';
import BButton from '../../components/BButton';

class FollowButtonContainer extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    followUser: PropTypes.func,
  };

  static defaultProps = {
    followUser: () => {},
  };

  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    this.props.followUser(this.props.username);
  }

  render() {
    return <BButton onPress={this.handlePress} {...this.props} />;
  }
}

const mapStateToProps = () => ({
  title: 'Follow',
});

export default connect(mapStateToProps, { followUser })(FollowButtonContainer);
