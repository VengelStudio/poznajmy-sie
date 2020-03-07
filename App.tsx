import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import WelcomePage from './Components/WelcomePage';
import OptionsPage from './Components/OptionsPage';
import SpinPage from './Components/SpinPage';
import QuestionPage from './Components/QuestionPage';
import {Question} from './Components/Utilities/data.interface';
import questionsRaw from './Assets/Data/questions.json';
import {AppContext, IGlobalState} from './Components/Context/context';
const MainNavigator = createStackNavigator(
  {
    WelcomePage: {screen: WelcomePage},
    OptionsPage: {screen: OptionsPage},
    SpinPage: {screen: SpinPage},
    QuestionPage: {screen: QuestionPage},
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(MainNavigator);

const questions = questionsRaw.map((questionRaw, i) => {
  return {id: i, ...questionRaw};
}) as Question[];

function shuffle(array: Array<any>) {
  let counter = array.length;

  // While there are elements in the array
  console.log(array);
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  console.log(array);
  return;
}

class App extends React.Component {
  filterQuestions = (allowTabu: boolean) => {
    if (allowTabu) {
      this.setState({filteredQuestions: shuffle(questions)});
    } else {
      const filteredQuestions = shuffle(questions).filter(question => {
        return question.isTabu === false;
      });
      this.setState({filteredQuestions});
    }
  };

  incrementCurrentQuestionId = () => {
    if (
      this.state.currentQuestionId ===
      this.state.filteredQuestions.length - 1
    ) {
      // we reached the end, jump over to the beginning
      this.setState({currentQuestionId: 0});
    } else {
      this.setState({currentQuestionId: this.state.currentQuestionId + 1});
    }
  };

  state: IGlobalState = {
    questions,
    filteredQuestions: questions,
    currentQuestionId: 0,
    filterQuestions: this.filterQuestions,
    incrementCurrentQuestionId: this.incrementCurrentQuestionId,
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <AppContainer />
      </AppContext.Provider>
    );
  }
}

export default App;
