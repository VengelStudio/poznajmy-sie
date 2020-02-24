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
import {Question} from './Utilities/data.interface';
import {IWheelPie} from './SpinPage';

class QuestionPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Question page',
  };

  get questionText() {
    const question: Question = (this.props.navigation.state.params as any)
      .question;
    return question.text;
  }

  get winner() {
    return (this.props.navigation.state.params as any).winner as IWheelPie;
  }

  welcomeWrapperStyles() {
    return {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: this.winner.color,
      borderWidth: 6,
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={this.welcomeWrapperStyles()}>
        <Image
          style={{width: 100, height: 100, marginTop: 80}}
          source={require('../Assets/questionMark.png')}
        />
        <View style={styles.questionWrapper}>
          <Text style={styles.questionHeader}>
            Pytanie dla:{' '}
            <View
              style={{
                backgroundColor: this.winner.color,
                width: 80,
                height: 40,
              }}></View>
          </Text>
          <Text style={styles.question}>{this.questionText}</Text>
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
    borderStyle: 'solid',
    borderWidth: 4,
  },
  questionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  question: {
    fontFamily: 'arial',
    marginTop: 50,
    padding: 3,
    textAlign: 'center',
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
