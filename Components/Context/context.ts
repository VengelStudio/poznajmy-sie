import React from 'react';
import {Question} from 'Components/Utilities/data.interface';

export interface IGlobalState {
  questions: Question[];
  filteredQuestions: Question[];
  currentQuestionIndex: number;
  filterQuestions: (allowTabu: boolean) => void;
  incrementCurrentQuestionIndex: () => void;
}

export const AppContext = React.createContext({
  questions: [],
  filteredQuestions: [],
  currentQuestionIndex: 0,
  filterQuestions: () => {},
  incrementCurrentQuestionIndex: () => {},
} as IGlobalState);
