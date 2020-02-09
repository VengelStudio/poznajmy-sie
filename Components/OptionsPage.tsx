import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  Switch,
  StyleSheet,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {CustomPicker} from 'react-native-custom-picker';

class OptionsPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Game options',
  };
  state = {
    numberOfPeople: 2,
  };

  render() {
    const {navigate} = this.props.navigation;
    const pickerOptions = [1, 2, 3, 4, 5, 6];
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>OPCJE</Text>
        <View style={styles.options}>
          <View style={styles.optionsLabel}>
            <Text style={styles.optionsText}>Pytania tabu?</Text>
            <Switch></Switch>
          </View>
          <View style={styles.optionsLabel}>
            <Text style={styles.optionsText}>Liczba osób</Text>
            <CustomPicker
              placeholder={'2'}
              options={pickerOptions}
              onValueChange={value => {
                this.setState({numberOfPeople: value});
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SpinPage', {
              numberOfPeople: this.state.numberOfPeople,
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
    alignItems: 'center',
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
    alignContent: 'center',
    marginBottom: 40,
  },
  optionsText: {
    fontSize: 40,
    fontFamily: 'simplifica',
    color: '#4392F1',
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
