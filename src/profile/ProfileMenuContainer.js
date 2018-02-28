import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SecureStore } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import sc2 from '../services/sc2';
import { logout } from '../auth/actions';
import ToolbarMenu from '../components/ToolbarMenu';

class ProfileMenu extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
  };

  static defaultProps = {
    logout: () => {},
  };

  handleSelect = async id => {
    if (id === 1) {
      await SecureStore.deleteItemAsync('accessToken');
      sc2.setAccessToken(null);
      this.props.logout();
    }
  };

  render() {
    return (
      <ToolbarMenu options={['Settings', 'Logout']} onSelect={this.handleSelect}>
        <Ionicons name="md-more" size={28} color="white" />
      </ToolbarMenu>
    );
  }
}

export default connect(null, { logout })(ProfileMenu);
