import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {Question} from './Utilities/data.interface';
import CustomButton from './Shared/CustomButton';
import Separator from './Shared/Separator';
import {IWheelPie} from './Utilities/models.interface';
import {getEmojiImage} from './Utilities/methods';

const deviceWidth = Dimensions.get('screen').width;

class QuestionPage extends Component<NavigationInjectedProps> {
  get questionText() {
    const question: Question = (this.props.navigation.state.params as any)
      .question;
    return question.text;
  }

  get winner() {
    return (this.props.navigation.state.params as any).winner as IWheelPie;
  }

  get index() {
    return (this.props.navigation.state.params as any).index;
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
          <Image style={styles.emojiStyle} source={getEmojiImage(this.index)} />
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
  emojiStyle: {},
  closeButton: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 30,
  },
});
