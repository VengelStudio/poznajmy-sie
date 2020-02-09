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

const App = createAppContainer(MainNavigator);

let initialState = {
  questions: questionsRaw as Question[],
} as IGlobalState;

const wrappedApp = () => {
  return (
    <AppContext.Provider value={initialState}>
      <App />
    </AppContext.Provider>
  );
};

export default wrappedApp;
