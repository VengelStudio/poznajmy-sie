import React from 'react';
import {Question} from 'Components/Utilities/data.interface';

export interface IGlobalState {
  questions: Question[];
  filteredQuestions: Question[];
  currentQuestionId: number;
  filterQuestions: (allowTabu: boolean) => void;
  incrementCurrentQuestionId: () => void;
}

export const AppContext = React.createContext({
  questions: [],
  filteredQuestions: [],
  currentQuestionId: 0,
  filterQuestions: () => {},
  incrementCurrentQuestionId: () => {},
} as IGlobalState);
