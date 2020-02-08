import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

class WelcomePage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Welcome page',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <Image
          style={{
            flex: 1,
            margin: 0,
            width: '100%',
            position: 'absolute',
          }}
          resizeMode="contain"
          source={require('../Assets/sash.png')}
        />
        <Text style={styles.header}>POZNAJMY SIĘ</Text>
        <TouchableOpacity
          onPress={() => navigate('OptionsPage')}
          style={styles.startButton}>
          <Text style={styles.startButtonText}>ROZPOCZNIJ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(WelcomePage);

const styles = StyleSheet.create({
  header: {
    fontFamily: 'babasNeue',
    marginTop: 200,
    fontSize: 60,
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
  startButton: {
    display: 'flex',
    height: '8%',
    width: '50%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4392F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 140,
  },
  startButtonText: {
    fontFamily: 'simplifica',
    fontSize: 30,
    color: '#4392F1',
  },
});
