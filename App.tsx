import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import WelcomePage from './Components/WelcomePage';
import OptionsPage from './Components/OptionsPage';
import SpinPage from './Components/SpinPage';
import QuestionPage from './Components/QuestionPage';

const MainNavigator = createStackNavigator({
  WelcomePage: {screen: WelcomePage},
  OptionsPage: {screen: OptionsPage},
  SpinPage: {screen: SpinPage},
  QuestionPage: {screen: QuestionPage},
});

const App = createAppContainer(MainNavigator);

export default App;
