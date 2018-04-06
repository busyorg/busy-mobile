// @flow

import * as React from 'react';
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

type Props = {
  title: string,
  options: Array<string>,
  children: React.Node,
  onSelect: (id: number) => void,
};

export default class PopupMenu extends React.Component<Props> {
  static defaultProps = {
    title: '',
    options: [],
    onSelect: () => {},
  };

  onRef = (icon: ?React.Node) => {
    this.icon = icon;
  };

  onPress = () => {
    if (!this.icon) return;
    const { title, options, onSelect } = this.props;

    if (Platform.OS === 'ios') {
      const newOptions = [...options, 'Cancel'];

      ActionSheetIOS.showActionSheetWithOptions(
        {
          title,
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

  icon: ?React.Node;

  render() {
    return (
      <CrossTouchable cricle onPress={this.onPress}>
        <IconContainer ref={this.onRef}>{this.props.children}</IconContainer>
      </CrossTouchable>
    );
  }
}
