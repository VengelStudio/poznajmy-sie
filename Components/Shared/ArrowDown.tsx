import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const ArrowDown = () => {
  return (
    <View>
      <Image
        style={styles.arrowShadow}
        source={require('../../Assets/arrowShadow.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  arrowShadow: {
    top: -11,
    width: 75,
    height: 75,
    resizeMode: 'contain',
    tintColor: '#2f2f2f',
  },
});

export default ArrowDown;
