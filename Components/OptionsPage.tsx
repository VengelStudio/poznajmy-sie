import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Switch, StyleSheet} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import RNNumberPickerLibrary from 'react-native-number-picker-ultra';
import {IGlobalState} from './Context/context';
import withContext from './Context/ContextConsumerHOC';

let s = require('./Shared/Styles');

interface OptionsPageProps {
  context: IGlobalState;
}

class OptionsPage extends Component<
  NavigationInjectedProps & OptionsPageProps
> {
  static navigationOptions = {
    title: 'Game options',
  };
  state = {
    numberOfPeople: 2,
    tabu: false,
  };

  UNSAFE_componentWillMount() {
    this.props.context.filterQuestions(false);
  }

  onPickerPeoplePress = () => {
    RNNumberPickerLibrary.createDialog(
      {
        minValue: 2,
        maxValue: 20,
        selectedValue: this.state.numberOfPeople,
        doneText: 'Wybierz',
        doneTextColor: '#000000', // only for Android
        cancelText: 'Anuluj',
        cancelTextColor: '#000000', // only for Android
      },
      // done click
      (error: any, data: any) => {
        if (error) {
          console.error(error);
        } else {
          console.log(data);
          this.setState({numberOfPeople: parseInt(data) - 1});
        }
      },
      // cancel click
      (error: any, data: any) => {
        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }
      },
    );
  };

  toggleTabu = () => {
    !this.state.tabu
      ? this.setState({tabu: true})
      : this.setState({tabu: false});

    this.props.context.filterQuestions(!this.state.tabu);
  };

  dynamicStyles() {
    const styles = StyleSheet.create({
      ageWarning: {
        position: 'absolute',
        right: -36,
        backgroundColor: '#fffe',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#db3c45',
        borderRadius: 100,
        color: '#333',
        padding: 2,
        width: 30,
        height: 30,
        opacity: this.state.tabu ? 1 : 0,
      },
    });

    return styles;
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <View style={styles.upperBar}>
          <Text style={styles.header}>OPCJE</Text>
        </View>
        <View style={styles.options}>
          <View style={styles.optionsLabel}>
            <Text style={styles.optionsText}>Pytania tabu?</Text>
            <Switch
              thumbColor="#fff"
              trackColor={{false: '#930856', true: '#D30C7B'}}
              onValueChange={this.toggleTabu}
              value={this.state.tabu}></Switch>
            <View style={this.dynamicStyles().ageWarning}>
              <Text style={styles.ageWarningText}>18+</Text>
            </View>
          </View>
          <View style={styles.optionsLabel}>
            <Text style={styles.optionsText}>Liczba osób:</Text>
            <TouchableOpacity onPress={this.onPickerPeoplePress}>
              <Text style={styles.optionsTextNumber}>
                {this.state.numberOfPeople}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigate('InstructionPage', {
              numberOfPeople: this.state.numberOfPeople,
              tabu: this.state.tabu,
            })
          }
          style={[s.Button, s.actionButtonBottomMargin]}>
          <Text style={s.ButtonText}>ROZPOCZNIJ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withContext(OptionsPage);

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
  ageWarningText: {
    fontFamily: 'Simplifica',
    fontSize: 12,
  },
  options: {
    paddingTop: 50,
    marginTop: 70,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 50,
    backgroundColor: '#fafafa',
    elevation: 4,
    borderRadius: 10,
  },
  numberPicker: {
    fontSize: 30,
    width: 90,
    padding: 0,
    margin: 0,
  },

  optionsLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionsText: {
    fontSize: 40,
    fontFamily: 'simplifica',
    color: '#4392F1',
    marginRight: 30,
  },
  optionsTextNumber: {
    fontSize: 30,
    fontFamily: 'Simplifica',
    marginLeft: 15,
    paddingLeft: 10,
    color: '#D30C7B',
    textDecorationColor: '#222',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  welcomePageWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
