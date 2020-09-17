import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {Question} from './Utilities/data.interface';
import Separator from './Shared/Separator';
import {IWheelPie} from './Utilities/models.interface';
import {getEmojiImage} from './Utilities/methods';

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

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.questionWrapperStyles}>
        <View style={styles.questionWrapper}>
          <View style={[styles.question]}>
            <Text style={[styles.questionText, styles.padding, styles.shadow]}>
              {this.questionText}
            </Text>
          </View>

          <Separator />
          <Image style={styles.emojiStyle} source={getEmojiImage(this.index)} />
          <Separator />

          {/* <View style={styles.shadow}>
            <View style={[styles.inverted]}>
              <Text style={[styles.question]}>{this.questionText}</Text>
            </View>
          </View> */}

          <View style={[styles.shadow, styles.question, styles.padding]}>
            <View style={[styles.inverted]}>
              <Text style={styles.questionText}>{this.questionText}</Text>
            </View>
          </View>
        </View>

        <Separator />
        <Separator />
        <View style={styles.closeWrapper}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigate('SpinPage')}
          />
          <Text style={styles.closeInfo}>(kliknij aby zamknąć)</Text>
        </View>
      </View>
    );
  }
}

export default withNavigation(QuestionPage);

const styles = StyleSheet.create({
  questionWrapperStyles: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
  },
  questionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    fontSize: 24,
  },
  question: {
    backgroundColor: '#fafafa',
    marginLeft: 20,
    marginRight: 20,
  },
  padding: {
    padding: 20,
    borderRadius: 10,
  },
  inverted: {
    transform: [{scaleX: -1}, {scaleY: -1}],
  },
  shadow: {
    elevation: 4,
    backgroundColor: '#fafafa',
    position: 'relative',
  },
  emojiStyle: {},
  closeWrapper: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  closeButton: {
    flex: 1,
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeInfo: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    left: 0,
    right: 0,
    bottom: 30,
    color: '#555555',
  },
});
