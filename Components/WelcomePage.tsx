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
          style={[s.Button, s.actionButtonBottomMargin]}>
          <Text style={s.ButtonText}>DALEJ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('CreditsPage')}
          style={styles.creditsButton}>
          <Text style={styles.creditsButtonText}>CREDITS</Text>
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
  creditsButton: {
    position: 'absolute',

    right: -110,
    bottom: -20,
    backgroundColor: '#ffd700',
    overflow: 'visible',
    transform: [{rotate: '-45deg'}],
  },
  creditsButtonText: {
    fontSize: 18,
    fontFamily: 'Simplifica',
    color: '#222222',
    paddingVertical: 50,
    paddingHorizontal: 100,
    paddingTop: 20,
  },
});
