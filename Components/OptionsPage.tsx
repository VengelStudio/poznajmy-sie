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
        doneText: 'Done',
        doneTextColor: '#000000', // only for Android
        cancelText: 'Cancel',
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
              onValueChange={this.toggleTabu}
              value={this.state.tabu}></Switch>
          </View>
          <View style={styles.optionsLabel}>
            <Text style={styles.optionsText}>Liczba osób</Text>
            <TouchableOpacity onPress={this.onPickerPeoplePress}>
              <Text style={styles.optionsTextNumber}>
                {this.state.numberOfPeople}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigate('SpinPage', {
              numberOfPeople: this.state.numberOfPeople,
              tabu: this.state.tabu,
            })
          }
          style={s.Button}>
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
  options: {
    marginTop: 70,
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    marginBottom: 40,
  },
  optionsText: {
    fontSize: 40,
    fontFamily: 'simplifica',
    color: '#4392F1',
    marginRight: 70,
  },
  optionsTextNumber: {
    fontSize: 40,
    fontFamily: 'simplifica',
    marginLeft: 20,
  },
  welcomePageWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
