// @flow

import React from 'react';
import { TouchableNativeFeedback, TouchableWithoutFeedback, Platform } from 'react-native';

type Props = {
  circle: boolean,
};

const CrossTouchable = ({ circle, ...props }: Props) => {
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
CrossTouchable.defaultProps = {
  circle: false,
};

export default CrossTouchable;
