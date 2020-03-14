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

  get emoji() {
    return (this.props.navigation.state.params as any).emoji;
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
        <View>
          <Text style={styles.emoji}>{this.emoji}</Text>
        </View>
        <View style={styles.questionWrapper}>
          <Text style={styles.question}>{this.questionText}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigate('SpinPage')}
          style={[s.Button, s.actionButtonBottomMargin]}>
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
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: '#fafafa',
    elevation: 4,
    borderRadius: 10,
  },
  emoji: {fontSize: 72},
});
