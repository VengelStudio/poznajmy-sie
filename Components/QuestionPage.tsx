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

let s = require('./Shared/Styles');

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

  dynamicStyles() {
    const styles = StyleSheet.create({
      questionWrapperStyles: {
        paddingTop: 80,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
      },
      questionMarkColorStyle: {
        tintColor: this.winner.color,
      },
    });

    return styles;
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={this.dynamicStyles().questionWrapperStyles}>
        <View style={styles.questionMarkWrapper}>
          <Image
            style={this.dynamicStyles().questionMarkColorStyle}
            source={require('../Assets/questionMark.png')}
          />
        </View>
        <View style={styles.questionWrapper}>
          <Text style={styles.question}>{this.questionText}</Text>
        </View>
        <TouchableOpacity onPress={() => navigate('SpinPage')} style={s.Button}>
          <Text style={s.ButtonText}>ZAMKNIJ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(QuestionPage);

const styles = StyleSheet.create({
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
    fontFamily: 'Raleway-Regular',
    marginTop: 40,
    padding: 3,
    textAlign: 'center',
    fontSize: 30,
  },
  questionMarkWrapper: {
    borderColor: '#64666a',
    borderRadius: 50,
    borderWidth: 3,
    backgroundColor: '#333',
  },
  questionMark: {width: 100, height: 100},
});
