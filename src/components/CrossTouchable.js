import React from 'react';
import { TouchableNativeFeedback, TouchableWithoutFeedback, Platform } from 'react-native';

const CrossTouchable = ({ circle, ...props }) => {
  if (Platform.OS === 'ios') return <TouchableWithoutFeedback {...props} />;
  if (circle)
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#AAF', true)}
        {...props}
      />
    );
  return <TouchableNativeFeedback {...props} />;
};

export default CrossTouchable;
