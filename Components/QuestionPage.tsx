import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {Question} from './Utilities/data.interface';
import {IWheelPie} from './SpinPage';
import CustomButton from './Shared/CustomButton';
import Separator from './Shared/Separator';

let s = require('./Shared/Styles');

class QuestionPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Pytanie',
    headerShown: false,
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
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
        <Separator />
        <Separator />
        <View style={styles.questionWrapper}>
          <Text style={styles.question}>{this.questionText}</Text>
        </View>
        <Separator />
        <Separator />
        <View style={styles.closeButton}>
          <CustomButton onClick={() => navigate('SpinPage')} text="ZAMKNIJ" />
        </View>
      </View>
    );
  }
}

export default withNavigation(QuestionPage);

const styles = StyleSheet.create({
  questionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontFamily: 'Raleway-Regular',
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
  closeButton: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 30,
  },
});
