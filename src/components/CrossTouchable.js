import React from 'react';
import { TouchableNativeFeedback, TouchableWithoutFeedback, Platform } from 'react-native';

const CrossTouchable = props => {
  if (Platform.OS === 'ios') return <TouchableWithoutFeedback {...props} />;
  return <TouchableNativeFeedback {...props} />;
};

export default CrossTouchable;
