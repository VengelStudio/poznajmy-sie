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
import {
  getRandomColor,
  getRandomQuestion,
  generateRandomColors,
} from './Utilities/methods';
import ArrowDown from './Shared/ArrowDown';

let s = require('./Shared/Styles');

const {Surface, Group, Shape} = ART;

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
}

interface State {
  currentQuestion: null | Question;
  spinValue: Animated.Value;
  wheelData: IWheelPie[];
  isAnimationFinished: boolean;
}

class InstructionPage extends Component<
  NavigationInjectedProps & SpinPageProps
> {
  static navigationOptions = {
    title: 'Spin',
  };

  state = {
    currentQuestion: null,
    spinValue: new Animated.Value(0),
    wheelData: [],
    isAnimationFinished: true,
  } as State;

  constructor(props: any) {
    super(props);
    const data = new Array(5).fill(1); //This 5 is number of people which user choosed in options

    const pieChart = d3.shape.pie()(data);

    const generatedColors = generateRandomColors(5);

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
      } as IWheelPie;
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1080deg'],
    });

    const x = pieSize / 2;
    const y = pieSize / 2;

    return (
      <View style={styles.welcomePageWrapper}>
        <View style={styles.upperBar}>
          <Text style={styles.header}>OPCJE</Text>
        </View>
        <View style={[styles.spinnerArrow]}>
          <ArrowDown />
        </View>
        <View style={styles.spinner}>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Surface width={pieSize} height={pieSize}>
              <Group x={x} y={y}>
                {this.state.wheelData.map((item: IWheelPie) => {
                  return <Shape fill={item.color} d={item.paths} />;
                })}
              </Group>
            </Surface>
          </Animated.View>
        </View>
        <View style={styles.optionsWrapper}>
          <Text style={styles.optionsText}>
            1. Gra polega na odpowiadaniu na losowe pytania.
          </Text>
          <Text style={styles.optionsText}>
            2. Każdy z graczy powinien wybrać kolor i odpowiadającą mu cyfrę.
          </Text>
          <Text style={styles.optionsText}>3. Miłej gry. :)</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigate('SpinPage', {
              numberOfPeople: this.props.navigation.state.params.numberOfPeople,
              tabu: this.props.navigation.state.params.tabu,
            })
          }
          style={[s.Button, s.actionButtonBottomMargin]}>
          <Text style={s.ButtonText}>START</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withContext(withNavigation(InstructionPage));

const styles = StyleSheet.create({
  header: {
    fontFamily: 'babasNeue',
    fontSize: 60,
    color: 'white',
  },
  upperBar: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D30C7B',
  },
  welcomePageWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spinner: {
    backgroundColor: '#0000', // invisible color
    zIndex: 10,
    elevation: 1,
    marginTop: -45,
  },
  spinnerArrow: {
    position: 'absolute',
    top: 90,
    zIndex: 20,
    elevation: 2,
  },
  optionsWrapper: {
    width: '80%',
    marginBottom: 30,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginTop: -65,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 4,
  },
  optionsText: {
    fontSize: 20,
    marginTop: 5,
    color: 'blue',
    fontFamily: 'Simplifica',
  },
});
