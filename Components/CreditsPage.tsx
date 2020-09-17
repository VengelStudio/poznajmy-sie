import React, {Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

const data = [
  {
    name: 'Bartosz Kępka',
    task: 'Developer',
  },
  {
    name: 'Łukasz Blachnicki',
    task: 'Developer',
  },
  {
    name: 'Wiktoria Góralczyk',
    task: 'Tester',
  },
  {
    name: 'Monika Łodzińska',
    task: 'Tester',
  },
  {
    name: 'Sebastian Kula',
    task: 'Tester',
  },
  {
    name: 'Zuzanna Olasek',
    task: 'Tester',
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
    title: 'Twórcy',
    headerShown: true,
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView>
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
  entryText: {
    fontSize: 42,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#ffff',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
  },
  task: {
    fontSize: 18,
    textAlign: 'center',
  },
});
