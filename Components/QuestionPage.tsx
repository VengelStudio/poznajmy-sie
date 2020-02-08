import React, {Component} from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

class QuestionPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Question page',
  };

  componentDidMount() {
    // Alert.alert(
    //   'Alerte',
    //   'My Alert Msg',
    //   [
    //     {
    //       text: `Question of id ${
    //         (this.props.navigation.state.params as any).id
    //       }`,
    //       onPress: () => console.log('OK Pressed'),
    //     },
    //   ],
    //   {cancelable: true},
    // );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <Image
          style={{width: 100, height: 100, marginTop: 80}}
          source={require('../Assets/questionMark.png')}
        />
        <View style={styles.questionWrapper}>
          <Text style={styles.questionHeader}>Pytanie dla: $kolor</Text>
          <Text style={styles.question}>Dupa dupa dupa dupa dupa</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigate('SpinPage')}
          style={styles.startButton}>
          <Text style={styles.startButtonText}>ZAMKNIJ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(QuestionPage);

const styles = StyleSheet.create({
  questionHeader: {
    fontFamily: 'simplifica',
    marginBottom: 20,
    fontSize: 60,
  },
  welcomePageWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  question: {
    fontFamily: 'simplifica',
    fontSize: 30,
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
    marginBottom: 100,
  },
  startButtonText: {
    fontFamily: 'simplifica',
    fontSize: 30,
    color: '#4392F1',
  },
});
