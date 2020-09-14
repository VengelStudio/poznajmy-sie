import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import Separator from './Shared/Separator';
import CustomButton from './Shared/CustomButton';

class WelcomePage extends Component<NavigationInjectedProps> {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <View>
          <Text style={styles.header}>KTO</Text>
          <Text style={styles.header}>TERAZ?</Text>
        </View>
        <Separator />
        <Separator />
        <View>
          <CustomButton onClick={() => navigate('OptionsPage')} text="GRAJ" />
          <Separator />
          <CustomButton
            onClick={() => navigate('CreditsPage')}
            text="TWÓRCY"
            secondary
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(WelcomePage);

const styles = StyleSheet.create({
  welcomePageWrapper: {
    paddingTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'babasNeue',
    fontSize: 80,
    paddingTop: 80,
    lineHeight: 0.1,
    textAlign: 'left',
    color: '#D30C7B',
  },
});
