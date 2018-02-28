import React from 'react';
import PropTypes from 'prop-types';
import { Platform, UIManager, findNodeHandle, ActionSheetIOS } from 'react-native';
import styled from 'styled-components';
import CrossTouchable from './CrossTouchable';

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

    if (Platform.OS === 'ios') {
      const newOptions = [...options, 'Cancel'];

      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Sort by',
          options: newOptions,
          destructiveButtonIndex: newOptions.length - 1,
        },
        onSelect,
      );
    } else {
      UIManager.showPopupMenu(
        findNodeHandle(this.icon),
        options,
        () => {},
        (type, id) => onSelect(id),
      );
    }
  };

  render() {
    return (
      <CrossTouchable cricle onPress={this.onPress}>
        <IconContainer ref={this.onRef}>{this.props.children}</IconContainer>
      </CrossTouchable>
    );
  }
}
