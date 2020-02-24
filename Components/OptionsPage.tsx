import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Switch, StyleSheet} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import RNNumberPickerLibrary from 'react-native-number-picker-ultra';

class OptionsPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Game options',
  };
  state = {
    numberOfPeople: 2,
    tabu: false,
  };

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

  turnOnTabuQuestions = () => {
    !this.state.tabu
      ? this.setState({tabu: true})
      : this.setState({tabu: false});
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>OPCJE</Text>
        <View style={styles.options}>
          <View style={styles.optionsLabel}>
            <Text style={styles.optionsText}>Pytania tabu?</Text>
            <Switch
              onValueChange={this.turnOnTabuQuestions}
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
          style={styles.startButton}>
          <Text style={styles.startButtonText}>ROZPOCZNIJ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(OptionsPage);

const styles = StyleSheet.create({
  header: {
    fontFamily: 'babasNeue',
    marginTop: 60,
    fontSize: 60,
    color: '#D30C7B',
  },
  options: {
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
  startButton: {
    display: 'flex',
    height: '8%',
    width: '50%',
    backgroundColor: '#4392F1',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  startButtonText: {
    fontFamily: 'simplifica',
    fontSize: 30,
    color: 'white',
  },
});
