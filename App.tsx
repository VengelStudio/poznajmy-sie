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

const questions = questionsRaw as Question[];

class App extends React.Component {
  filterQuestions = (allowTabu: boolean) => {
    if (allowTabu) {
      this.setState({filteredQuestions: questions});
    } else {
      const filteredQuestions = questions.filter(question => {
        return question.isTabu === false;
      });
      this.setState({filteredQuestions});
    }
  };

  state = {
    questions,
    filteredQuestions: questions,
    filterQuestions: this.filterQuestions,
  } as IGlobalState;

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <AppContainer />
      </AppContext.Provider>
    );
  }
}

export default App;
