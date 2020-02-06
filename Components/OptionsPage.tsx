import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

class OptionsPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Game options',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>Opcje</Text>
        <Button
          title="Rozpocznij"
          onPress={() => navigate('SpinPage', {name: 'Jane'})}></Button>
      </View>
    );
  }
}

export default withNavigation(OptionsPage);

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
