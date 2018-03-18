import React from 'react';
import { RefreshControl } from 'react-native';
import Colors from '../constants/Colors';

const BusyRefreshControl = props => (
  <RefreshControl colors={[Colors.accent, Colors.primary, Colors.secondary]} {...props} />
);

export default BusyRefreshControl;
