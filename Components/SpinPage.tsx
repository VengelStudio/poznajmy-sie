import React, {Component} from 'react';
import {
  ART,
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import withContext from './Context/ContextConsumerHOC';
import {IGlobalState} from './Context/context';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import {PieArcDatum} from 'd3-shape';
import {Question} from './Utilities/data.interface';
import {
  getRandomColor,
  getRandomQuestion,
  generateRandomColors,
  getEmoji,
} from './Utilities/methods';
import ArrowDown from './Shared/ArrowDown';
import CustomButton from './Shared/CustomButton';

let s = require('./Shared/Styles');

// @ts-ignore
const {Surface, Group, Shape, Text: ARTText, Transform} = ART;

const d3 = {
  scale,
  shape,
};

const pieSize = Dimensions.get('window').width;

interface SpinPageProps {
  context: IGlobalState;
}

export interface IWheelPie {
  paths: string;
  color: string;
  startAngle: number;
  endAngle: number;
  emoji: string;
}

interface State {
  currentQuestion: null | Question;
  spinValue: Animated.Value;
  wheelData: IWheelPie[];
  isAnimationFinished: boolean;
  isInstructionOpen: boolean;
}

const getRandomSpinValue = () => {
  const val = Math.random() * (1 - 0.25) + 0.25;
  return val;
};

const getWinnerColor = (value: number, wheelData: IWheelPie[]) => {
  const rawAngle = value * 6 * Math.PI;
  const cleanAngle = rawAngle % (2 * Math.PI);

  for (let i = wheelData.length - 1; i >= 0; i--) {
    if (2 * Math.PI - cleanAngle >= wheelData[i].startAngle) {
      return wheelData[i];
    }
  }
};

const getWinnerIndex = (angle: number, wheelData: IWheelPie[]) => {
  const rawAngle = angle * 6 * Math.PI;
  const cleanAngle = rawAngle % (2 * Math.PI);

  for (let i = wheelData.length - 1; i >= 0; i--) {
    if (2 * Math.PI - cleanAngle >= wheelData[i].startAngle) {
      return i;
    }
  }
  return -1;
};

class SpinPage extends Component<NavigationInjectedProps & SpinPageProps> {
  static navigationOptions = {
    title: 'Spin',
  };

  state = {
    currentQuestion: null,
    spinValue: new Animated.Value(0),
    wheelData: [],
    isAnimationFinished: true,
    isInstructionOpen: true,
  } as State;

  constructor(props: any) {
    super(props);
    const numberOfPeople = this.props.navigation.state.params.numberOfPeople;
    const tabu = this.props.navigation.state.params.tabu;
    const data = new Array(numberOfPeople).fill(1); //This 5 is number of people which user choosed in options

    const pieChart = d3.shape.pie()(data);

    const generatedColors = generateRandomColors(numberOfPeople);

    this.state.wheelData = pieChart.map((pie, i) => {
      const paths = d3.shape
        .arc<PieArcDatum<any>>()
        .outerRadius(pieSize / 2 - 75)
        .padAngle(0)
        .innerRadius(20)(pie);

      return {
        paths,
        color: generatedColors[i],
        startAngle: pie.startAngle,
        endAngle: pie.endAngle,
        emoji: getEmoji(i),
      } as IWheelPie;
    });
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
              emoji: this.state.wheelData[
                getWinnerIndex(toValue, this.state.wheelData)
              ].emoji,
            });
          });
        }
      });
    }
  };

  dynamicStyles() {
    const styles = StyleSheet.create({
      pieShadowSize: {
        width: pieSize / 2 + 102,
        height: pieSize / 2 + 102,
      },
    });
    return styles;
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1080deg'],
    });

    const x = pieSize / 2;
    const y = pieSize / 2;

    const isNumberOfPeopleEven = () => {
      return this.state.wheelData.length % 2 === 0;
    };

    return (
      <View style={styles.welcomePageWrapper}>
        <View style={[styles.spinnerArrow]}>
          <ArrowDown />
        </View>
        <View style={styles.spinner}>
          <Animated.View
            style={[{transform: [{rotate: spin}]}, styles.wheelLabels]}>
            <Surface width={pieSize} height={pieSize}>
              <Group x={x} y={y} transform={new Transform().rotate(180)}>
                {this.state.wheelData.map((item: IWheelPie, i: number) => {
                  console.log(i);

                  return (
                    <ARTText
                      transform={new Transform()
                        .rotate(
                          (((item.startAngle + item.endAngle) / 2) * 180) /
                            Math.PI,
                        )
                        .translate(-23, -23)
                        .translate(0, 105)}
                      font={'40px "Helvetica Neue", "Helvetica", Arial'}
                      fill={'#000000'}
                      key={i}>
                      {item.emoji}
                    </ARTText>
                  );
                })}
              </Group>
            </Surface>
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
          <Image
            style={[styles.wheelShadow, this.dynamicStyles().pieShadowSize]}
            source={require('../Assets/wheelShadow.png')}
          />
        </View>
        {!this.state.isInstructionOpen && (
          <CustomButton
            onClick={() => {
              this.pickQuestion();
            }}
            text="LOSUJ PYTANIE"
          />
        )}

        {this.state.isInstructionOpen && (
          <View style={styles.instructionPageWrapper}>
            <View style={styles.upperBar}>
              <Text style={styles.instructionHeader}>INSTRUKCJA</Text>
            </View>
            <View style={styles.instructionDescriptionWrapper}>
              <Text style={styles.instructionDescriptionText}>
                ‣ Niech każdy wybierze swoje emoji i je zapamięta.
              </Text>
              <Text style={styles.instructionDescriptionText}>
                ‣ Wylosowany gracz musi odpowiedzieć na pytanie.
              </Text>
            </View>
            <CustomButton
              onClick={() => this.setState({isInstructionOpen: false})}
              text="START"
            />
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
  },
  spinner: {
    backgroundColor: '#0000', // invisible color
    zIndex: 10,
    elevation: 1,
    marginTop: 26,
  },
  spinnerArrow: {
    position: 'absolute',
    zIndex: 20,
    elevation: 2,
    marginTop: 26,
  },
  wheelShadow: {
    alignSelf: 'center',
    top: 60,
    position: 'absolute',
    zIndex: -10,
  },
  wheelLabels: {
    position: 'absolute',
    zIndex: 200,
  },

  instructionHeader: {
    fontFamily: 'babasNeue',
    fontSize: 60,
    color: 'white',
  },
  upperBar: {
    width: deviceWidth,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D30C7B',
  },
  instructionPageWrapper: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructionDescriptionWrapper: {
    marginTop: pieSize / 2 + 90,
    marginBottom: 15,
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 4,
  },
  instructionDescriptionText: {
    fontSize: 20,
    marginTop: 5,
    color: '#4392F1',
    fontFamily: 'Simplifica',
  },
});
