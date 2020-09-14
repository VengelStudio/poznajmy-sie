import React, {Component} from 'react';
import {
  ART,
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import withContext from './Context/ContextConsumerHOC';
import {IGlobalState} from './Context/context';
import {Question} from './Utilities/data.interface';
import {
  getRandomQuestion,
  getRandomSpinValue,
  getWinnerColor,
  getWinnerIndex,
  generatePieChart,
  getEmojiImage,
} from './Utilities/methods';
import ArrowDown from './Shared/ArrowDown';
import WheelShadowImg from '../Assets/wheelShadow.png';
import CustomButton from './Shared/CustomButton';
import Separator from './Shared/Separator';
import {IWheelPie} from './Utilities/models.interface';

// @ts-ignore
const {Surface, Group, Shape} = ART;

const pieSize = Dimensions.get('screen').width;

interface SpinPageProps {
  context: IGlobalState;
}

interface State {
  currentQuestion: null | Question;
  spinValue: Animated.Value;
  wheelData: IWheelPie[];
  isAnimationFinished: boolean;
  isInstructionOpen: boolean;
}

class SpinPage extends Component<NavigationInjectedProps & SpinPageProps> {
  state = {
    currentQuestion: null,
    spinValue: new Animated.Value(0),
    wheelData: [],
    isAnimationFinished: true,
    isInstructionOpen: true,
  } as State;

  constructor(props: any) {
    super(props);

    const numberOfPeople = (this.props.navigation.state.params as any)
      .numberOfPeople;

    this.state.wheelData = generatePieChart(numberOfPeople, pieSize);
  }

  pickQuestion = () => {
    if (this.state.isAnimationFinished) {
      this.setState({isAnimationFinished: false});

      Animated.decay(this.state.spinValue, {velocity: 3, deceleration: 0.5});

      const toValue = getRandomSpinValue();

      Animated.timing(this.state.spinValue, {
        toValue,
        duration: 4000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        this.setState({isAnimationFinished: true});

        const {
          filteredQuestions,
          incrementCurrentQuestionIndex,
        } = this.props.context;

        if (filteredQuestions.length > 0) {
          const currentQuestion = getRandomQuestion(this.props.context);
          incrementCurrentQuestionIndex();

          this.setState({currentQuestion}, () => {
            this.setState({spinValue: new Animated.Value(0)});
            this.props.navigation.navigate('QuestionPage', {
              question: this.state.currentQuestion,
              winner: getWinnerColor(toValue, this.state.wheelData),
              index: this.state.wheelData[
                getWinnerIndex(toValue, this.state.wheelData)
              ].index,
            });
          });
        }
      });
    }
  };

  getEmojiStyle(item: IWheelPie) {
    const styles = StyleSheet.create({
      emoji: {
        position: 'absolute',
        transform: [
          {
            rotate: `${((item.startAngle + item.endAngle) * 0.5 * 180) /
              Math.PI +
              180}deg`,
          },
          {translateY: deviceWidth / 2 - 45},
          {scale: 0.8 + 0.2 * (1 / this.state.wheelData.length)},
        ],
      },
    });

    return styles;
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '1080deg'],
    });

    const x = pieSize / 2;
    const y = pieSize / 2;

    return (
      <View style={styles.welcomePageWrapper}>
        <View style={styles.spinner}>
          <View style={[styles.spinnerArrow]}>
            <ArrowDown />
          </View>
          <Image style={styles.spinnerShadow} source={WheelShadowImg} />
          <Animated.View
            style={[{transform: [{rotate: spin}]}, styles.wheelLabels]}>
            {this.state.wheelData.map((item: IWheelPie, i: number) => {
              return (
                <Image
                  style={this.getEmojiStyle(item).emoji}
                  source={getEmojiImage(i)}
                  key={i}
                />
              );
            })}
          </Animated.View>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Surface width={pieSize} height={pieSize}>
              <Group x={x} y={y}>
                {this.state.wheelData.map((item: IWheelPie, i: number) => {
                  return <Shape fill={item.color} d={item.paths} key={i} />;
                })}
              </Group>
            </Surface>
          </Animated.View>
        </View>
        <View
          style={[
            styles.spinButton,
            {opacity: this.state.isInstructionOpen ? 0 : 1},
          ]}>
          <CustomButton
            onClick={() => {
              this.pickQuestion();
            }}
            text="LOSUJ PYTANIE"
          />
        </View>

        {this.state.isInstructionOpen && (
          <View style={styles.instructionPageWrapper}>
            <Separator />
            <View style={styles.instructionDescriptionWrapper}>
              <View>
                <Text style={styles.instructionDescriptionText}>
                  ‣ Każdy wybiera swoje pole.
                </Text>
                <Text style={styles.instructionDescriptionText}>
                  ‣ Wylosowany gracz odpowiada na pytanie.
                </Text>
              </View>
              <View style={styles.closeInstructionButton}>
                <CustomButton
                  onClick={() => {
                    this.setState({isInstructionOpen: false});
                    this.pickQuestion();
                  }}
                  text="START"
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const deviceWidth = Dimensions.get('window').width;
export default withContext(withNavigation(SpinPage));

const styles = StyleSheet.create({
  welcomePageWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  spinner: {
    backgroundColor: '#0000', // invisible color
    elevation: 1,
    marginTop: 0,
    position: 'relative',
  },
  spinnerArrow: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 20,
    elevation: 2,
    top: 0,
    left: 0,
    right: 0,
  },
  spinnerShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  wheelLabels: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
    height: deviceWidth,
  },
  spinButton: {},
  instructionHeader: {
    fontFamily: 'babasNeue',
    fontSize: 60,
    color: 'white',
  },
  instructionPageWrapper: {
    position: 'absolute',
    flex: 1,
    bottom: 10,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionDescriptionWrapper: {
    backgroundColor: '#fafafa',
    opacity: 0.8,
    borderRadius: 10,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
    elevation: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  instructionDescriptionText: {
    fontSize: 18,
    marginTop: 5,
    color: '#4392F1',
    fontFamily: 'Simplifica',
  },
  closeInstructionButton: {
    marginTop: 10,
    marginBottom: -10,
    flex: 1,
    alignItems: 'center',
  },
});
