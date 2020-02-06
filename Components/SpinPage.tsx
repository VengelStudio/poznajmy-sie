import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

class SpinPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Spin',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>[spinner]</Text>
        <Button
          title="Losuj pytanie"
          onPress={() => navigate('QuestionPage', {id: 10})}></Button>
      </View>
    );
  }
}

export default withNavigation(SpinPage);

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
