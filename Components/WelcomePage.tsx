import React, {Component} from 'react';
import {Text, TouchableOpacity, Image, View, StyleSheet} from 'react-native';

export default class WelcomePage extends Component {
  render() {
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>POZNAJMY SIĘ</Text>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>ROZPOCZNIJ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 250,
    fontSize: 40,
  },
  welcomePageWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButton: {
    display: 'flex',
    height: '10%',
    width: '50%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4392F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 160,
  },
  startButtonText: {
    fontSize: 20,
    color: '#4392F1',
  },
});
