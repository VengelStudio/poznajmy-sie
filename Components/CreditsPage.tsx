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
    title: 'Autorzy',
    headerShown: true,
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => <Item name={item.name} task={item.task} />}
          keyExtractor={(item) => item.name}
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
