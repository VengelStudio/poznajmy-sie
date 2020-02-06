import React, {Component} from 'react';
import {Text, Button, View, StyleSheet, Alert} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

class QuestionPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Question page',
  };

  componentDidMount() {
    Alert.alert(
      'Alerte',
      'My Alert Msg',
      [
        {
          text: `Question of id ${
            (this.props.navigation.state.params as any).id
          }`,
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: true},
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>blah blah</Text>
        <Button
          title="Zamknij"
          onPress={() => navigate('SpinPage', {name: 'Jane'})}></Button>
      </View>
    );
  }
}

export default withNavigation(QuestionPage);

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
