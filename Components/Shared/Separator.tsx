import React from 'react';
import {View, StyleSheet} from 'react-native';

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
});

export default Separator;
