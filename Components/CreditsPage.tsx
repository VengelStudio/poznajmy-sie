import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

let s = require('./Shared/Styles');

const data = [
  {
    name: 'Bartosz Kępka',
    task: 'Developer',
  },
  {
    name: 'Łukasz Blachnicki',
    task: 'Developer',
  },
];

function Item({name, task}: any) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{`${name}`}</Text>
      <Text style={styles.task}>{`${task}`}</Text>
    </View>
  );
}

class CreditsPage extends Component<NavigationInjectedProps> {
  static navigationOptions = {
    title: 'Credits page',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.backEntryBg}></View>
        <TouchableOpacity
          onPress={() => navigate('WelcomePage')}
          style={[s.Button, styles.backEntryButton]}>
          <Text style={[s.ButtonText]}>Powrót</Text>
        </TouchableOpacity>
        <FlatList
          data={data}
          renderItem={({item}) => <Item name={item.name} task={item.task} />}
          keyExtractor={item => item.name}
        />
      </SafeAreaView>
    );
  }
}

export default withNavigation(CreditsPage);

const styles = StyleSheet.create({
  backEntryBg: {
    height: 60,
    width: Dimensions.get('window').width,
    elevation: 4,
    backgroundColor: '#ffff',
  },
  backEntryButton: {
    height: 46,
    top: 6,
    zIndex: 20,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryText: {
    fontSize: 42,
    textAlign: 'center',
  },
  container: {
    paddingBottom: 60,
  },
  item: {
    backgroundColor: '#ffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
  name: {
    fontSize: 32,
    textAlign: 'center',
  },
  task: {
    fontSize: 18,
    textAlign: 'center',
  },
});
