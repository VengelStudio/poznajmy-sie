import React from 'react';
import {View, StyleSheet} from 'react-native';

const ArrowDown = () => {
  return <View style={[styles.arrowDown]} />;
};

const styles = StyleSheet.create({
  arrowDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#D30C7B',
    transform: [{rotate: '180deg'}],
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 100,
    shadowRadius: 5,
  },
});

export default ArrowDown;
