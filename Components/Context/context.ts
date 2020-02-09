import React from 'react';
import {Question} from 'Components/Utilities/data.interface';

export interface IGlobalState {
  questions: Question[];
}

export const AppContext = React.createContext({
  questions: [],
} as IGlobalState);
