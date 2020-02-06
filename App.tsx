import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import WelcomePage from './Components/WelcomePage';

declare var global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <WelcomePage />
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
