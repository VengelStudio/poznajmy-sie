import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Switch, StyleSheet} from 'react-native';
import {
  withNavigation,
  NavigationInjectedProps,
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import RNNumberPickerLibrary from 'react-native-number-picker-ultra';
import {IGlobalState} from './Context/context';
import withContext from './Context/ContextConsumerHOC';
import CustomButton from './Shared/CustomButton';
import Separator from './Shared/Separator';

interface Props {
  context: IGlobalState;
}

class OptionsPage extends Component<Props> {
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
        maxValue: 15,
        selectedValue: this.state.numberOfPeople,
        doneText: 'Wybierz',
        doneTextColor: '#000000', // only for Android
        cancelText: 'Anuluj',
        cancelTextColor: '#000000', // only for Android
      },
      // done click
      (error: any, data: any) => {
        if (!error) {
          this.setState({numberOfPeople: parseInt(data) - 1});
        }
      },
      // cancel click
      (error: any, data: any) => {},
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
      <View style={styles.optionsPageWrapper}>
        <View style={styles.optionsWrapper}>
          <View style={styles.options}>
            <View style={styles.optionsLabel}>
              <Text style={styles.optionsText}>Pytania tabu?</Text>
              <Switch
                thumbColor="#fff"
                trackColor={{false: '#930856', true: '#D30C7B'}}
                onValueChange={this.toggleTabu}
                value={this.state.tabu}
              />
              <View
                style={[
                  styles.ageWarning,
                  !this.state.tabu && styles.ageWarningDisabled,
                ]}>
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
          <Separator />
          <CustomButton
            onClick={() =>
              navigate('SpinPage', {
                numberOfPeople: this.state.numberOfPeople,
                tabu: this.state.tabu,
              })
            }
            text="ROZPOCZNIJ"
          />
        </View>
      </View>
    );
  }
}

export default withContext(OptionsPage);

const styles = StyleSheet.create({
  optionsPageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  optionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  ageWarningText: {
    fontFamily: 'Simplifica',
    fontSize: 12,
  },
  options: {
    paddingTop: 50,
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
  },
  ageWarningDisabled: {
    color: '#808808',
    borderColor: '#555555',
    backgroundColor: '#efefef',
    opacity: 0.5,
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
});
