import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {transformAsync} from '@babel/core';
import Separator from './Shared/Separator';
import CustomButton from './Shared/CustomButton';

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
        <Separator />
        <Separator />
        <Separator />
        <View style={[styles.btnWrapper, s.actionButtonBottomMargin]}>
          <CustomButton onClick={() => navigate('OptionsPage')} text="DALEJ" />
          <Separator />
          <CustomButton
            onClick={() => navigate('CreditsPage')}
            text="CREDITS"
            secondary
          />
        </View>
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
  ditsButtonText: {
    fontSize: 18,
    fontFamily: 'Simplifica',
    color: '#222222',
    paddingVertical: 50,
    paddingHorizontal: 100,
    paddingTop: 20,
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
