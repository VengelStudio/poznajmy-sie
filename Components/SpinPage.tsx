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
} from 'react-native';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import withContext from './Context/ContextConsumerHOC';
import {IGlobalState} from './Context/context';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import {PieArcDatum} from 'd3-shape';
import {Question} from './Utilities/data.interface';
import {getRandomColor, getRandomQuestion} from './Utilities/methods';
import ArrowDown from './Shared/ArrowDown';

const {Surface, Group, Shape} = ART;

const d3 = {
  scale,
  shape,
};

const pieSize = Dimensions.get('window').width;

interface SpinPageProps {
  context: IGlobalState;
}

interface IWheelPie {
  paths: string;
  color: string;
  startAngle: number;
}

interface State {
  currentQuestion: null | Question;
  spinValue: Animated.Value;
  wheelData: IWheelPie[];
}

class SpinPage extends Component<NavigationInjectedProps & SpinPageProps> {
  static navigationOptions = {
    title: 'Spin',
  };

  state = {
    currentQuestion: null,
    spinValue: new Animated.Value(0),
    wheelData: [],
  } as State;

  constructor(props: any) {
    super(props);
    const data = new Array(5).fill(1); //This 5 is number of peoptle which user choosed in options

    const pieChart = d3.shape.pie()(data);

    this.state.wheelData = pieChart.map(pie => {
      const paths = d3.shape
        .arc<PieArcDatum<any>>()
        .outerRadius(pieSize / 2 - 25)
        .padAngle(0)
        .innerRadius(0)(pie);

      return {
        paths,
        color: getRandomColor(),
        startAngle: pie.startAngle,
      } as IWheelPie;
    });
  }

  pickQuestion = () => {
    Animated.decay(this.state.spinValue, {velocity: 2, deceleration: 0.5});

    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 5000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      if (this.props.context.questions.length > 0) {
        const currentQuestion = getRandomQuestion(this.props.context.questions);

        this.setState({currentQuestion}, () => {
          this.props.navigation.navigate('QuestionPage', {
            question: this.state.currentQuestion,
          });
        });
      }
    }, 5000);
  };

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const x = pieSize / 2;
    const y = pieSize / 2;

    return (
      <View style={styles.welcomePageWrapper}>
        <View style={[styles.spinnerArrow]}>
          <ArrowDown />
        </View>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Surface width={pieSize} height={pieSize}>
            <Group x={x} y={y}>
              {this.state.wheelData.map((item: IWheelPie, index: any) => (
                <Shape key={index} fill={item.color} d={item.paths} />
              ))}
            </Group>
          </Surface>
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            this.pickQuestion();
          }}
          style={styles.playButton}>
          <Text style={styles.playButtonText}>Losuj pytanie</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withContext(withNavigation(SpinPage));

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
  playButton: {
    display: 'flex',
    height: '8%',
    width: '50%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4392F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 140,
  },
  playButtonText: {
    fontFamily: 'simplifica',
    fontSize: 30,
    color: '#4392F1',
  },
  spinnerArrow: {
    position: 'absolute',
    top: 10,
    zIndex: 10,
  },
});
