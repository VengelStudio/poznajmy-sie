import React from 'react';
import {Question} from 'Components/Utilities/data.interface';

export interface IGlobalState {
  questions: Question[];
  filteredQuestions: Question[];
  filterQuestions: (allowTabu: boolean) => void;
}

export const AppContext = React.createContext({
  questions: [],
  filteredQuestions: [],
  filterQuestions: () => {},
} as IGlobalState);
