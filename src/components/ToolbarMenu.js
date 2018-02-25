import React from 'react';
import PropTypes from 'prop-types';
import { UIManager, findNodeHandle, TouchableNativeFeedback } from 'react-native';
import styled from 'styled-components';

const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 28px;
  margin: 16px;
`;

export default class PopupMenu extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    options: [],
    onSelect: () => {},
  };

  onRef = icon => {
    this.icon = icon;
  };

  onPress = () => {
    if (!this.icon) return;
    const { options, onSelect } = this.props;

    UIManager.showPopupMenu(findNodeHandle(this.icon), options, () => {}, onSelect);
  };

  render() {
    return (
      <TouchableNativeFeedback
        ref={this.onRef}
        background={TouchableNativeFeedback.Ripple('#AAF', true)}
        onPress={this.onPress}
      >
        <IconContainer>{this.props.children}</IconContainer>
      </TouchableNativeFeedback>
    );
  }
}
