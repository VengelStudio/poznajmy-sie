import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import WelcomePage from './Components/WelcomePage';
import OptionsPage from './Components/OptionsPage';
import SpinPage from './Components/SpinPage';
import QuestionPage from './Components/QuestionPage';
import CreditsPage from './Components/CreditsPage';
import InstructionPage from './Components/InstructionPage';
import {Question} from './Components/Utilities/data.interface';
import questionsRaw from './Assets/Data/questions.json';
import {AppContext, IGlobalState} from './Components/Context/context';

const MainNavigator = createStackNavigator(
  {
    WelcomePage: {screen: WelcomePage},
    OptionsPage: {screen: OptionsPage},
    SpinPage: {screen: SpinPage},
    QuestionPage: {screen: QuestionPage},
    CreditsPage: {screen: CreditsPage},
    InstructionPage: {screen: InstructionPage},
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

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

class App extends React.Component {
  filterQuestions = (allowTabu: boolean) => {
    let filteredQuestions = shuffle(questions);

    if (!allowTabu) {
      filteredQuestions = filteredQuestions.filter(question => {
        return question.isTabu === false;
      });
    }

    this.setState({filteredQuestions});
  };

  incrementCurrentQuestionIndex = () => {
    if (
      this.state.currentQuestionIndex ===
      this.state.filteredQuestions.length - 1
    ) {
      // we reached the end, jump over to the beginning
      this.setState({currentQuestionIndex: 0});
    } else {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
      });
    }
  };

  state: IGlobalState = {
    questions,
    filteredQuestions: questions,
    currentQuestionIndex: 0,
    filterQuestions: this.filterQuestions,
    incrementCurrentQuestionIndex: this.incrementCurrentQuestionIndex,
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
