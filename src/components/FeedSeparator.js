import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E0E0E0',
    width: '100%',
    height: 1,
  },
});

const FeedSeparator = () => <View style={styles.separator} />;

export default FeedSeparator;
