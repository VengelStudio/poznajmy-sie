import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';

export default class WelcomePage extends Component {
  render() {
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>POZNAJMY SIĘ</Text>
        <Button title="ROZPOCZNIJ" style={styles.button}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
  },
  welcomePageWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
