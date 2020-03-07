import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {transformAsync} from '@babel/core';

let s = require('./Shared/Styles');

class WelcomePage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Welcome page',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>KTO {'\n'}TERAZ?</Text>
        <TouchableOpacity
          onPress={() => navigate('OptionsPage')}
          style={s.Button}>
          <Text style={s.ButtonText}>DALEJ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(WelcomePage);

const styles = StyleSheet.create({
  header: {
    fontFamily: 'babasNeue',
    marginTop: 150,
    fontSize: 80,
    color: '#D30C7B',
  },
  welcomePageWrapper: {
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
