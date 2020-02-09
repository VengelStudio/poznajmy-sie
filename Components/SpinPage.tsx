import React, {Component} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import withContext from './Context/ContextConsumerHOC';
import {IGlobalState} from './Context/context';

interface SpinPageProps {
  context: IGlobalState;
}

class SpinPage extends Component<NavigationInjectedProps & SpinPageProps> {
  static navigationOptions = {
    title: 'Spin',
  };

  state = {
    currentQuestion: null,
  };

  pickQuestion = () => {
    if (this.props.context.questions.length > 0) {
      const randomQuestion = this.props.context.questions[
        Math.floor(Math.random() * this.props.context.questions.length)
      ];

      this.setState({currentQuestion: randomQuestion}, () => {
        this.props.navigation.navigate('QuestionPage', {
          question: this.state.currentQuestion,
        });
      });
    }
  };

  render() {
    return (
      <View style={styles.welcomePageWrapper}>
        <Text style={styles.header}>[spinner]</Text>
        <Button
          title="Losuj pytanie"
          onPress={() => {
            this.pickQuestion();
          }}></Button>
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
});
